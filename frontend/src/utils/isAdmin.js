export function isAdmin() {
    localStorage.getItem("token")
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/isAdmin',
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