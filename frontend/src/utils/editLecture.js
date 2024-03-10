export const editLecture = (lectureId, newData) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/edit-lecture/${lectureId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(newData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to edit lecture');
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