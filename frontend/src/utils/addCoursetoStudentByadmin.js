export function addCoursesToStudentByAdmin( courseArray,StudentId) {
    const url = 'https://idea-lms.onrender.com/student-add-course-by-admin';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token") 
    };
    
    const body = JSON.stringify({ coursesArray: courseArray,userId:StudentId });
  
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: body
      })
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