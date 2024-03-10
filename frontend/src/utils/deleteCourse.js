export const deleteCourse = (courseId) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/delete-course/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete course');
          }
          return response.json();
        })
        .then(data => {
          resolve(data.message);
        })
        .catch(error => {
          reject(error.message || 'Failed to delete course');
        });
    });
  };