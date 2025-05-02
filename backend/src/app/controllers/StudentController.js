const Student = require("../models/Student");

class StudentController {
    // [GET] /students/:id
    getStudentById(req, res, next) {
        Student.findById(req.params.id)
            .then(student => res.json(student))
            .catch(next);
    }
}