import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import { enrollmentService, studentService, courseService } from '../services/api';

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadEnrollments();
    loadStudents();
    loadCourses();
  }, []);

  const loadEnrollments = async () => {
    try {
      const response = await enrollmentService.getAllDto();
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error loading enrollments:', error);
    }
  };

  const loadStudents = async () => {
    try {
      const response = await studentService.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const loadCourses = async () => {
    try {
      const response = await courseService.getAllDto();
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const handleOpen = (enrollment = null) => {
    if (enrollment) {
      setSelectedEnrollment(enrollment);
      setFormData({
        studentId: enrollment.studentId || '',
        courseId: enrollment.courseId || '',
        enrollmentDate: enrollment.enrollmentDate || new Date().toISOString().split('T')[0],
      });
    } else {
      setSelectedEnrollment(null);
      setFormData({
        studentId: '',
        courseId: '',
        enrollmentDate: new Date().toISOString().split('T')[0],
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEnrollment(null);
    setFormData({
      studentId: '',
      courseId: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEnrollment) {
        await enrollmentService.update({ ...selectedEnrollment, ...formData });
      } else {
        await enrollmentService.create(formData);
      }
      handleClose();
      loadEnrollments();
    } catch (error) {
      console.error('Error saving enrollment:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enrollment?')) {
      try {
        await enrollmentService.delete(id);
        loadEnrollments();
      } catch (error) {
        console.error('Error deleting enrollment:', error);
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)', py: 4 }}>
      <Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" fontWeight={700} color="primary.dark">Enrollments</Typography>
            <Button variant="contained" color="primary" size="large" onClick={() => handleOpen()} sx={{ borderRadius: 3, boxShadow: 2 }}>
              Add Enrollment
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.light' }}>
                  <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Enrollment Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enrollments.map((enrollment, idx) => (
                  <TableRow key={enrollment.id} sx={{ backgroundColor: idx % 2 === 0 ? '#e3f2fd' : '#bbdefb', transition: 'background 0.2s' }}>
                    <TableCell>{enrollment.id}</TableCell>
                    <TableCell>{enrollment.studentName}</TableCell>
                    <TableCell>{enrollment.courseTitle}</TableCell>
                    <TableCell>{enrollment.enrollmentDate}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(enrollment)} color="primary" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(enrollment.id)} color="error">
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
        <DialogTitle>{selectedEnrollment ? 'Edit Enrollment' : 'Add Enrollment'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, minWidth: 350 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Student</InputLabel>
              <Select
                value={formData.studentId}
                label="Student"
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Course</InputLabel>
              <Select
                value={formData.courseId}
                label="Course"
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedEnrollment ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Enrollments; 