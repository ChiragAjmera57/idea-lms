export function createLecture(name,startTime,endTime,meetLink,courseId) {
    return new Promise((resolve, reject) => {
      fetch('https://idea-lms.onrender.com/add-lecture', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":localStorage.getItem("token")

        },
        body: JSON.stringify({ name,startTime,endTime,meetLink,courseId }),
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
  