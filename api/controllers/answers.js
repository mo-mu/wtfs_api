import { Answer } from './../models';

const createAnswer = (req, res) => {
  Answer.build({
    question_id: req.body.question_id,
    user_uuid: req.body.user_uuid,
    a: req.body.a,
  })
  .save()
  .then(answer => res.json(answer));
};

const getAnswers = (req, res) => {
  Answer.findAll({
    user_uuid: req.user_uuid,
  })
  .then(answers => res.json(answers));
};

export {
  createAnswer,
  getAnswers,
};
