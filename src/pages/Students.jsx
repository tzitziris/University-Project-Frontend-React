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
import { studentService } from '../services/api';

function Students() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await studentService.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const handleOpen = (student = null) => {
    if (student) {
      setSelectedStudent(student);
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      });
    } else {
      setSelectedStudent(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedStudent) {
        await studentService.update({ ...selectedStudent, ...formData });
      } else {
        await studentService.create(formData);
      }
      handleClose();
      loadStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.delete(id);
        loadStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)', py: 4 }}>
      <Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight={700} color="primary.dark">Students</Typography>
            <Button variant="contained" color="primary" size="large" onClick={() => handleOpen()} sx={{ borderRadius: 3, boxShadow: 2 }}>
              Add Student
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
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, idx) => (
                  <TableRow key={student.id} sx={{ backgroundColor: idx % 2 === 0 ? '#e3f2fd' : '#bbdefb', transition: 'background 0.2s' }}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(student)} color="primary" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(student.id)} color="error">
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
        <DialogTitle>{selectedStudent ? 'Edit Student' : 'Add Student'}</DialogTitle>
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedStudent ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Students; 