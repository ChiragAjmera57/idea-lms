const express = require("express");
const { connectToDb } = require("./config/mongo.connect");
const cors = require("cors");
const { User } = require("./modal/user.modal");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Course } = require("./modal/course.modal");
const authenticateUser = require("./midddleware/user.auth.middleware");
const authenticateAdmin = require("./midddleware/admin.auth.middleware");
const { Lecture } = require("./modal/lecture.modal");

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("hiii");
});

app.post("/signup", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin,
    }).save();

    res.status(201).json({ msg: `user registerd succesfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});
app.post("/studentsign", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin,
    }).save();
    const token = jwt.sign({ userId: newUser._id }, "CHIRAG57", {
      expiresIn: "20d",
    });
    res.status(200).json({ token, isAdmin: newUser.isAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, "CHIRAG57", {
      expiresIn: "20d",
    });
    console.log(user);
    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});
app.post("/student-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    if(user.isAdmin==true){
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, "CHIRAG57", {
      expiresIn: "20d",
    });
    console.log(user);
    res.status(200).json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.get("/all-courses", authenticateUser ,async (req, res) => {
  try {
    const coursesFound = await Course.find();
    res.status(200).json({ courses: coursesFound });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/create-course',authenticateAdmin,async(req,res)=>{
    const{title} = req.body
    try {
        const newCourse =new  Course({
            title:title
        })
        await newCourse.save()
        res.status(201).json({message:"Course Created"})
    } catch (error) {
        console.error(error); 
        
        res.status(500).json({ error: 'Server error' });
    }
    
})
app.put('/edit-course/:id', authenticateAdmin, async (req, res) => {
  const { title } = req.body;
  const courseId = req.params.id;
  try {
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({ error: 'Course not found' });
      }
      course.title = title;
      await course.save();
      res.json({ message: 'Course updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/delete-course/:id', authenticateAdmin, async (req, res) => {
  const courseId = req.params.id;
  try {
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({ error: 'Course not found' });
      }
      // await course.remove(); // This line might be causing the issue

      // Alternatively, you can use:
      await Course.findByIdAndDelete(courseId);

      res.json({ message: 'Course deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});
app.patch('/student-add-course',authenticateUser,async(req,res)=>{
    const {coursesArray} = req.body
    const user = req.user.user
    try {
     const Updated =  await  User.findOneAndUpdate(
            { _id: user._id }, 
            { $push: { courses: { $each: coursesArray } } }, 
            
        )
     res.status(201).json(Updated)
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})
app.patch('/student-add-course-by-admin',authenticateUser,async(req,res)=>{
    const {coursesArray,userId} = req.body
    try {
     const Updated =  await  User.findOneAndUpdate(
            { _id: userId }, 
            { $push: { courses: { $each: coursesArray } } }, 
            
        )
     res.status(201).json(Updated)
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})
app.put('/users/:id/update-admin',authenticateAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      user.isAdmin = true
      await user.save()
      res.json({ message: 'User isAdmin status updated successfully', user: user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/student-link-course',authenticateUser,async(req,res)=>{
    const user = req.user.user;
    const courseIds = user.courses
    try {
        const linkedCourses = await Course.find({ _id: { $in: courseIds } })
        res.status(200).json(linkedCourses)
    } catch (error) {
        res.status(500).json({error:"server error"})
    }
})
app.get('/isAdmin',authenticateAdmin,async(req,res)=>{
    res.send("ok")
})
app.get('/student-profile',authenticateUser,async(req,res)=>{
    const user = req.user.user
    res.status(200).send(user)
})
app.get('/courses/:courseId',authenticateUser,async(req,res)=>{
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId)
        res.json({course})
    } catch (error) {
        res.status(500).json({error:"server error"})
    }
})
app.get('/lecture/:lectureId',authenticateUser,async(req,res)=>{
    const lectureId = req.params.lectureId;
    try {
        const lecture = await Lecture.findById(lectureId)
        res.json({lecture})
    } catch (error) {
        res.status(500).json({error:"server error"})
    }
})
app.patch('/add-lecture', authenticateAdmin, async (req, res) => {
    const { name, startTime, endTime, meetLink, courseId } = req.body;

    try {
        if (!courseId || courseId === undefined) {
            return res.status(400).json({ error: "courseId is required" });
        }

        const newLecture = new Lecture({
            name: name,
            startTime: startTime,
            endTime: endTime,
            meetLink: meetLink
        });

        await newLecture.save();

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push: { lectures: newLecture }
        }, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(201).json({
            message: "Lecture added successfully",
            data: { updatedCourse, newLecture }
        });
    } catch (error) {
        console.error("Error adding lecture:", error);
        return res.status(500).json({ error: "Server error" }); // Use return to avoid sending multiple responses
    }
});
app.put('/edit-lecture/:id', authenticateAdmin, async (req, res) => {
  const lectureId = req.params.id;
  const { name, startTime, endTime, meetLink } = req.body;

  try {
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) {
          return res.status(404).json({ error: 'Lecture not found' });
      }

      lecture.name = name;
      lecture.startTime = startTime;
      lecture.endTime = endTime;
      lecture.meetLink = meetLink;

      await lecture.save();

      res.json({ message: 'Lecture updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});
app.delete('/delete-lecture/:id', authenticateAdmin, async (req, res) => {
    const lectureId = req.params.id;

    try {
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ error: 'Lecture not found' });
        }

        await Course.findByIdAndDelete(lectureId);

        res.json({ message: 'Lecture deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/non-admin-users', authenticateAdmin, async (req, res) => {
  try {
      const nonAdminUsers = await User.find({ isAdmin: false });
      res.json(nonAdminUsers);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});
app.get('/userDetails/:id',authenticateAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
app.listen("8080", () => {
  try {
    connectToDb();
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("listining on 8080");
});
