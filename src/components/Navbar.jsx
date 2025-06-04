import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

function Navbar() {
  return (
    <AppBar position="static" elevation={0} sx={{ boxShadow: 'none' }}>
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          University Management System
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/students">
            Students
          </Button>
          <Button color="inherit" component={RouterLink} to="/teachers">
            Teachers
          </Button>
          <Button color="inherit" component={RouterLink} to="/courses">
            Courses
          </Button>
          <Button color="inherit" component={RouterLink} to="/enrollments">
            Enrollments
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 