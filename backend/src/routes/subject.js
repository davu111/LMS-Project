const express = require("express");
const router = express.Router();
const subjectController = require("../app/controllers/subject.controller");

router.get("/getSubjectsByTeacher/:teacher_id", subjectController.getSubjectsByTeacherId);
module.exports = router;