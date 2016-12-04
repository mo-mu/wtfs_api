import { Question } from './../models';

const getAllQuestions = (req, res) => {
  Question.findAll()
  .then(questions => res.json(questions));
};

const getSingleQuestion = (req, res) => {
  console.log(req.swagger.params.question_id.value);
  Question.find({
    where: {
      id: req.swagger.params.question_id.value,
    }
  })
  .then(question => res.json(question));
};

export {
  getAllQuestions,
  getSingleQuestion,
};
