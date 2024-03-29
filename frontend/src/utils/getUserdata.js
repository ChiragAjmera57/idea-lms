const getUserData = () => {
    return new Promise((resolve, reject) => {
        fetch('https://idea-lms.onrender.com/student-profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch student profile');
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
};

export { getUserData };
