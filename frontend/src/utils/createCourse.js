export function createCourse(title) {
    return new Promise((resolve, reject) => {
      fetch('https://idea-lms.onrender.com/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":localStorage.getItem("token")

        },
        body: JSON.stringify({ title }),
      })
        .then(response => {
          if (response.ok) {
            resolve('Course created successfully.');
          } else {
            reject('Failed to create course.');
          }
        })
        .catch(error => {
          reject(`Error creating course: ${error}`);
        });
    });
  }
  