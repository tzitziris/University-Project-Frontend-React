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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { courseService, teacherService } from '../services/api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    teacherId: '',
  });

  useEffect(() => {
    loadCourses();
    loadTeachers();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await courseService.getAllDto();
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadTeachers = async () => {
    try {
      const response = await teacherService.getAll();
      setTeachers(response.data);
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  const handleOpen = (course = null) => {
    if (course) {
      setSelectedCourse(course);
      setFormData({
        title: course.title,
        description: course.description || '',
        teacherId: course.teacherId || '',
      });
    } else {
      setSelectedCourse(null);
      setFormData({
        title: '',
        description: '',
        teacherId: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
    setFormData({
      title: '',
      description: '',
      teacherId: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCourse) {
        await courseService.update({
          id: selectedCourse.id,
          title: formData.title,
          description: formData.description,
          teacher: formData.teacherId ? { id: formData.teacherId } : null
        });
      } else {
        await courseService.create({
          title: formData.title,
          description: formData.description,
          teacher: formData.teacherId ? { id: formData.teacherId } : null
        });
      }
      handleClose();
      loadCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.delete(id);
        loadCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)', py: 4 }}>
      <Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight={700} color="primary.dark">Courses</Typography>
            <Button variant="contained" color="primary" size="large" onClick={() => handleOpen()} sx={{ borderRadius: 3, boxShadow: 2 }}>
              Add Course
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.light' }}>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Teacher</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course, idx) => (
                  <TableRow key={course.id} sx={{ backgroundColor: idx % 2 === 0 ? '#e3f2fd' : '#bbdefb', transition: 'background 0.2s' }}>
                    <TableCell>{course.id}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.teacherFullName || 'Not Assigned'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(course)} color="primary" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(course.id)} color="error">
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
        <DialogTitle>{selectedCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, minWidth: 350 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Teacher</InputLabel>
              <Select
                value={formData.teacherId}
                label="Teacher"
                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedCourse ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Courses; 