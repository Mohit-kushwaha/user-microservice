const router = require('express').Router()
const userController = require('../controllers/userController')
//define routes
router.post('/users', userController.addUser); 
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getUsers);
router.put('/users/:id', userController.updateUserById); 
router.delete('/users/:id', userController.deleteUserById); 

module.exports = router