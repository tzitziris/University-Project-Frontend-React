import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { teacherService } from '../services/api';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialization: '',
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const response = await teacherService.getAll();
      setTeachers(response.data);
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  const handleOpen = (teacher = null) => {
    if (teacher) {
      setSelectedTeacher(teacher);
      setFormData({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        specialization: teacher.specialization,
      });
    } else {
      setSelectedTeacher(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        specialization: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTeacher(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      specialization: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTeacher) {
        await teacherService.update({ ...selectedTeacher, ...formData });
      } else {
        await teacherService.create(formData);
      }
      handleClose();
      loadTeachers();
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await teacherService.delete(id);
        loadTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)', py: 4 }}>
      <Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight={700} color="primary.dark">Teachers</Typography>
            <Button variant="contained" color="primary" size="large" onClick={() => handleOpen()} sx={{ borderRadius: 3, boxShadow: 2 }}>
              Add Teacher
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.light' }}>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Last Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Specialization</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher, idx) => (
                  <TableRow key={teacher.id} sx={{ backgroundColor: idx % 2 === 0 ? '#e3f2fd' : '#bbdefb', transition: 'background 0.2s' }}>
                    <TableCell>{teacher.id}</TableCell>
                    <TableCell>{teacher.firstName}</TableCell>
                    <TableCell>{teacher.lastName}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.specialization}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(teacher)} color="primary" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(teacher.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle>{selectedTeacher ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, minWidth: 350 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Specialization"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedTeacher ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Teachers; 