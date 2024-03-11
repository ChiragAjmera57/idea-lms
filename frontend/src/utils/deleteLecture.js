export const deleteLecture = (lectureId) => {
    return new Promise((resolve, reject) => {
        fetch(`https://idea-lms.onrender.com/delete-lecture/${lectureId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete lecture');
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