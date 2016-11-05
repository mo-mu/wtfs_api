import { User } from './../models';

// POST /users
const createUser = (req, res) => {
  User.build({
    uuid: req.swagger.body.uuid,
    email: req.swagger.body.email || null,
    password: req.swagger.body.password || null,
  })
  .save()
  .then(user => res.json({
    user,
  }));
};

const updateUser = (req, res) => {
  const body = req.swagger.params.body;
  User.find({
    uuid: body.uuid,
  })
  .then((user) => {
    if (!('email' in body) || !('password' in body)) {
      return res.json({
        message: 'error',
      });
    }
    user.email = body.email;
    user.password = body.password;
    user.save();

    return user;
  })
  .then(user => res.json({
    user,
  }));
};

export {
  createUser,
  updateUser,
};
