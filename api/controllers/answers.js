import { Answer } from './../models';

const createAnswer = (req, res) => {
  Answer.build({
    question_id: req.swagger.params.body.question_id,
    user_id: req.swagger.params.body.user_id,
    a: req.swagger.params.body.a,
  })
  .save()
  .then(answer => res.json({
    answer,
  }));
};

const getAnswers = (req, res) => {
  Answer.findAll({
    user_id: req.swagger.params.user_id,
  })
  .then(answers => res.json({
    answers,
  }));
};

export {
  createAnswer,
  getAnswers,
};
