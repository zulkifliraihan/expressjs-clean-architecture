const express = require('express');

require('express-group-routes');
require('../config/multipleMethodApi')();


const router = express.Router();
const UserController = require('../app/controllers/UserController');
const RoleController = require('../app/controllers/RoleController');
const AuthController = require('../app/controllers/AuthController');
const EducationController = require('../app/controllers/EducationController');
const EmploymentTypeController = require('../app/controllers/EmploymentTypeController');
const ExperienceController = require('../app/controllers/ExperienceController');
const JWTMiddleware = require('../app/middlewares/JWTMiddleware');

router.group("/users", (route) => {
    route.use(JWTMiddleware)
    
    route.get('/', UserController.getUsers)
    route.post('/', UserController.createUser)
    route.get('/:id', UserController.getUserById)
    route.route("/:id").allOf(["put", "patch"], UserController.updateUser)
    route.delete('/:id', UserController.deleteUser)
});

router.group("/roles", (route) => {
    route.use(JWTMiddleware)

    route.get('/', RoleController.getRoles)
    route.post('/', RoleController.createRole)
    route.get('/:id', RoleController.getRoleById)
    route.route("/:id").allOf(["put", "patch"], RoleController.updateRole)
    route.delete('/:id', RoleController.deleteRole)
});

router.group("/education", (route) => {
    route.use(JWTMiddleware)

    route.get('/', EducationController.getEducations)
    route.post('/', EducationController.createEducation)
    route.get('/:id', EducationController.getEducationById)
    route.route("/:id").allOf(["put", "patch"], EducationController.updateEducation)
    route.delete('/:id', EducationController.deleteEducation)
});

router.group("/employment-type", (route) => {
    route.use(JWTMiddleware)

    route.get('/', EmploymentTypeController.getEmploymentTypes)
    route.post('/', EmploymentTypeController.createEmploymentType)
    route.get('/:id', EmploymentTypeController.getEmploymentTypeById)
    route.route("/:id").allOf(["put", "patch"], EmploymentTypeController.updateEmploymentType)
    route.delete('/:id', EmploymentTypeController.deleteEmploymentType)
});

router.group("/experience", (route) => {
    route.use(JWTMiddleware)

    route.get('/', ExperienceController.getExperiences)
    route.post('/', ExperienceController.createExperience)
    route.get('/:id', ExperienceController.getExperienceById)
    route.route("/:id").allOf(["put", "patch"], ExperienceController.updateExperience)
    route.delete('/:id', ExperienceController.deleteExperience)
});

router.group("/auth", (route) => {
    route.post('/register', AuthController.register)
    route.post('/login', AuthController.login)
});


module.exports = router;