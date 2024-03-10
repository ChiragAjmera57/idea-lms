import React, { useState } from 'react';
import { Modal, TextField, Button, IconButton, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const EditLectureModal = ({ isOpen, onClose, lecture, onEdit, onDelete }) => {
  const [editedLecture, setEditedLecture] = useState({ ...lecture });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLecture({ ...editedLecture, [name]: value });
  };

  const handleEdit = () => {
    onEdit(editedLecture);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <Typography variant="h5" gutterBottom>Edit Lecture</Typography>
        <form>
          <TextField
            label="Lecture Name"
            name="name"
            value={editedLecture.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          {/* Add other fields for editing lecture details here */}
          <Button onClick={handleEdit} variant="contained" color="primary" style={{ marginRight: '10px' }}>Edit</Button>
          <IconButton onClick={() => onDelete(lecture._id)} aria-label="delete">
            <Delete />
          </IconButton>
        </form>
      </div>
    </Modal>
  );
};

export default EditLectureModal;
