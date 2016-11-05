import { Question } from './../models';

const getAllQuestions = (req, res) => {
  console.log(Question);
  Question.findAll()
  .then(questions => res.json({
    questions,
  }));
};

const getSingleQuestion = (req, res) => {
  Question.find({
    id: req.swagger.params.question_id,
  })
  .then(question => res.json({
    question,
  }));
};

export {
  getAllQuestions,
  getSingleQuestion,
};
