import React, { useState, useEffect } from 'react';
import { studentService, courseService, enrollmentService } from '../services/api';

const EnrollmentForm = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, coursesResponse] = await Promise.all([
          studentService.getAll(),
          courseService.getAll()
        ]);
        setStudents(studentsResponse.data);
        setCourses(coursesResponse.data);
      } catch (err) {
        setError('Failed to fetch students and courses');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const student = students.find(s => s.name === selectedStudent);
      const course = courses.find(c => c.name === selectedCourse);

      if (!student || !course) {
        throw new Error('Please select both a student and a course');
      }

      const enrollmentData = {
        student: {
          id: student.id
        },
        course: {
          id: course.id
        },
        enrollmentDate: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      };

      const response = await enrollmentService.create(enrollmentData);
      if (response.data) {
        setSuccess(true);
        setSelectedStudent('');
        setSelectedCourse('');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create enrollment');
      console.error('Enrollment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Enrollment</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Enrollment created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Student
          </label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating...' : 'Create Enrollment'}
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm; 