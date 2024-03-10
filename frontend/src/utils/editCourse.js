export const editCourse = (courseId, title) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/edit-course/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify({ title })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to edit course');
          }
          return response.json();
        })
        .then(data => {
          resolve(data.message);
        })
        .catch(error => {
          reject(error.message || 'Failed to edit course');
        });
    });
  };