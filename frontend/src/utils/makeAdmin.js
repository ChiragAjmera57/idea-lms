export const makeAdmin = (userId) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8080/users/${userId}/update-admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to edit course');
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error.message || 'Failed to edit course');
        });
    });
  };