import { User } from './../models';

// POST /users
const createUser = (req, res) => {
  User.build({
    uuid: req.swagger.body.uuid,
  })
  .save()
  .then(user => res.json({
    uuid: user.uuid,
  }))
  .catch(e => res.status(400).json({ 
    message: e,
  }));
};

export {
  createUser,
};
