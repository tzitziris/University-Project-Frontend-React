import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { studentService, teacherService, courseService, enrollmentService } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    enrollments: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [students, teachers, courses, enrollments] = await Promise.all([
        studentService.getAll(),
        teacherService.getAll(),
        courseService.getAll(),
        enrollmentService.getAll(),
      ]);

      setStats({
        students: students.data.length,
        teachers: teachers.data.length,
        courses: courses.data.length,
        enrollments: enrollments.data.length,
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)', py: 4 }}>
      <Card sx={{ maxWidth: 1200, mx: 'auto', p: 3, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={700} color="primary.dark" gutterBottom>
            Dashboard
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: 3,
                  background: '#e3f2fd',
                }}
              >
                <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Students</Typography>
                <Typography variant="h4">{stats.students}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: 3,
                  background: '#e3f2fd',
                }}
              >
                <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Teachers</Typography>
                <Typography variant="h4">{stats.teachers}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: 3,
                  background: '#e3f2fd',
                }}
              >
                <MenuBookIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Courses</Typography>
                <Typography variant="h4">{stats.courses}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3,
                  boxShadow: 3,
                  background: '#e3f2fd',
                }}
              >
                <AssignmentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6">Enrollments</Typography>
                <Typography variant="h4">{stats.enrollments}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Dashboard; 