const Subject = require("../models/Subject.model");

class SubjectController {
    // [GET] /subjects/:teacher_id
    getSubjectsByTeacherId(req, res) {
        Subject.find({ teacher: req.params.teacher_id })
            .then((subjects) => {
                res.json(subjects);
            })
            .catch((err) => {
                res.json(err);
            });
    }

    // [POST] /subjects/createSubject
    createSubject(req, res, next) {
        Subject.create(req.body)
            .then(subject => res.json(subject))
            .catch(next);
    }
}

module.exports = new SubjectController();