import { User } from './../models';

// POST /users
const createUser = (req, res) => {
  console.log(req.body.uuid);

  User.build({
    uuid: req.body.uuid,
  })
  .save()
  .then(user => res.json(user))
  .catch(e => res.status(400).json({ 
    message: e,
  }));
};

export {
  createUser,
};
