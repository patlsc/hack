var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function getData(studentID) {
  return {
    learnt_skills: [
      {id: 1, name: "Skill 1"},
      {id: 2, name: "Skill 2"},
      {id: 3, name: "Skill 3"}
    ],
    wip_skills: [
      {id: 4, name: "Skill 4"},
      {id: 5, name: "Skill 5"},
      {id: 6, name: "Skill 6"}
    ],
    forgotten_skills: [
      {id: 7, name: "Skill 7"},
      {id: 8, name: "Skill 8"},
      {id: 9, name: "Skill 9"}
    ],
    questions: [
      {id: 1, number: 1, desc: "Lorem Ipsum", correctness: 1.0},
      {id: 2, number: 2, desc: "Lorem Ipsum", correctness: 0.0},
      {id: 3, number: 3, desc: "Lorem Ipsum", correctness: 0.5},
      {id: 4, number: 4, desc: "Lorem Ipsum", correctness: 1.0},
      {id: 5, number: 5, desc: "Lorem Ipsum", correctness: 1.0},
      {id: 6, number: 6, desc: "Lorem Ipsum", correctness: 0.0},
      {id: 7, number: 7, desc: "Lorem Ipsum", correctness: 0.5},
      {id: 8, number: 8, desc: "Lorem Ipsum", correctness: 1.0},
      {id: 9, number: 9, desc: "Lorem Ipsum", correctness: 1.0},
      {id: 10, number: 10, desc: "Lorem Ipsum", correctness: 0.0},
      {id: 11, number: 11, desc: "Lorem Ipsum", correctness: 0.5},
      {id: 12, number: 12, desc: "Lorem Ipsum", correctness: 1.0},
      {id: 13, number: 13, desc: "Lorem Ipsum", correctness: 1.0},
      {id: 14, number: 14, desc: "Lorem Ipsum", correctness: 0.0},
      {id: 15, number: 15, desc: "Lorem Ipsum", correctness: 0.5},
      {id: 16, number: 16, desc: "Lorem Ipsum", correctness: 1.0}
    ]
  }
}

router.get('/student_status/:studentId', (req, res) => {
  let studentID = req.params.studentId;
  console.log(studentID);
  res.send(getData(studentID));
});

router.get("/get_courses", (req, res) => {
  let response = [
    {
      "name" : "Math I - 2nd block",
      "on_track" : 26,
      "behind" : 8,
      "ahead" : 5,
      "id": 0
    },
    {
      "name" : "Math II - 4th block",
      "on_track" : 18,
      "behind" : 4,
      "ahead" : 10,
      "id": 1
    },
    {
      "name" : "Math II - 4th block",
      "on_track" : 18,
      "behind" : 4,
      "ahead" : 10,
      "id": 2
    },
    {
      "name" : "Math II - 4th block",
      "on_track" : 18,
      "behind" : 4,
      "ahead" : 10,
      "id": 3
    },
    {
      "name" : "Math II - 3rd block",
      "on_track" : 15,
      "behind" : 9,
      "ahead" : 6,
      "id": 4
    }
  ];
  res.send(response);
});

router.get("/status/:testid", (req, res) => {
  res.render("status");
})

router.get("/student_home", (req, res) => {
  res.render("student")
})

router.get("/test", (req, res) => {
  res.render("test")
})

router.get("/classroom_pulse", (req, res) => {
  res.render("classroom_pulse")
})

router.get("/course_list", (req, res) => {
  res.render("course_list")
})

router.get("/student_stats", (req, res) => {
  res.render("student_stats")
})

module.exports = router;
