# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

# University Management - Frontend

This is the frontend of the University Management application, built with Next.js.  
It serves as the user interface where users can manage students, teachers, courses, and enrollments.

---

## Technologies

- Next.js (React framework)  
- Axios for communication with the backend REST API  
- JavaScript / TypeScript (depending on implementation)

---

## Features

The application allows users to:

- View lists of students, teachers, courses, and enrollments  
- Create, update, and delete students, teachers, courses, and enrollments  
- Search and view details for each entity

---

## API Calls Structure

All API calls to the backend are made using Axios with the following services:

- **studentService:** CRUD operations for students  
- **teacherService:** CRUD operations for teachers  
- **courseService:** CRUD operations for courses  
- **enrollmentService:** CRUD operations for enrollments

---

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/tzitziris/University-Project-Frontend-React.git
