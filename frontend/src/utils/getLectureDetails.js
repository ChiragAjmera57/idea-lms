export function getLectureDetails(id) {
    localStorage.getItem("token")
    return new Promise((resolve, reject) => {
      fetch(`https://idea-lms.onrender.com/lecture/${id}`,
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
          resolve(data.lecture);
        })
        .catch(error => {
          reject(error);
        });
    });
  }