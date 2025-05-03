const Student = require("../models/Student");

class StudentController {
    // [GET] /students/:id
    getStudentById(req, res, next) {
        Student.findById(req.params.id)
            .then(student => res.json(student))
            .catch(next);
    }

    // [GET] /studentsByCourse/:course_id
    getStudentsByCourse(req, res, next) {
        Student.find({ course_id: req.params.course_id })
            .then(students => res.json(students))
            .catch(next);
    }
}

module.exports = new StudentController();