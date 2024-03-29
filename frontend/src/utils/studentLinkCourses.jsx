export function getStudentCourses() {
    localStorage.getItem("token")
    return new Promise((resolve, reject) => {
      fetch('https://idea-lms.onrender.com/student-link-course',
      {
        method:'GET',
        headers:{
            "Authorization":localStorage.getItem("token")
        }
      }
      
      )
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }