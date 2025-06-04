import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const studentService = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  create: (student) => api.post('/students', student),
  update: (student) => api.put('/students', student),
  delete: (id) => api.delete(`/students/${id}`),
};

export const teacherService = {
  getAll: () => api.get('/teachers'),
  getById: (id) => api.get(`/teachers/${id}`),
  create: (teacher) => api.post('/teachers', teacher),
  update: (teacher) => api.put('/teachers', teacher),
  delete: (id) => api.delete(`/teachers/${id}`),
};

export const courseService = {
  getAll: () => api.get('/courses'),
  getAllDto: () => api.get('/courses/dto'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (course) => api.post('/courses', course),
  update: (course) => api.put('/courses', course),
  delete: (id) => api.delete(`/courses/${id}`),
};

export const enrollmentService = {
  getAll: () => api.get('/enrollments'),
  getAllDto: () => api.get('/enrollments/dto'),
  getById: (id) => api.get(`/enrollments/${id}`),
  create: (enrollment) => api.post('/enrollments', enrollment),
  update: (enrollment) => api.put('/enrollments', enrollment),
  delete: (id) => api.delete(`/enrollments/${id}`),
};

export default api; 