const express = require('express');

const {ensureAuthenticated} = require('../middlewares/AuthSMS');
const {handleGetallStudents,handleCreateNewStudent,handleDeleteStudentByID,handleUpdateStudentsByID} = require('../controller/Students');





const router = express.Router();

// Get all students & create a new student
router.get('/', ensureAuthenticated, handleGetallStudents);
router.post('/', ensureAuthenticated, handleCreateNewStudent);

// Update and delete a student by ID
router.put('/:id', ensureAuthenticated, handleUpdateStudentsByID);
router.delete('/:id', ensureAuthenticated, handleDeleteStudentByID);



// Get all students&& create students 
// router.route('/', ensureAuthenticated)
//       .get( handleGetallStudents)
//       .post(handleCreateNewStudent);


// Update a student && // Delete a student
// router.route('/:id', ensureAuthenticated)
//       .put(handleUpdateStudentsByID)
//       .delete(handleDeleteStudentByID);


module.exports = router;
