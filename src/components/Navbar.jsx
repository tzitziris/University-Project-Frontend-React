import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" elevation={0} sx={{ boxShadow: 'none' }}>
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          University Management System
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{
              backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/students"
            sx={{
              backgroundColor: isActive('/students') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Students
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/teachers"
            sx={{
              backgroundColor: isActive('/teachers') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Teachers
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/courses"
            sx={{
              backgroundColor: isActive('/courses') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Courses
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/enrollments"
            sx={{
              backgroundColor: isActive('/enrollments') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Enrollments
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 