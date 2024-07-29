const express = require('express');
const { createUser, getUserDetails, getAllUsers } = require('../controllers/userController'); // Corrected import
const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUserDetails);
router.get('/users', getAllUsers); // Correct route

module.exports = router;
