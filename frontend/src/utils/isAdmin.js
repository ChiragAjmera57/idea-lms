export function isAdmin() {
    localStorage.getItem("token")
    return new Promise((resolve, reject) => {
      fetch('https://idea-lms.onrender.com/isAdmin',
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
          resolve(data.courses);
        })
        .catch(error => {
          reject(error);
        });
    });
  }