import Sequelize from 'sequelize';

const sequelize = new Sequelize('wtfs', 'ubuntu', 'ubuntu', {
  host: '52.78.172.143',
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
  },
});

const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
});

const Question = sequelize.define('Question', {
  q: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Answer = sequelize.define('Answer', {
  a: {
    type: Sequelize.STRING,
  },
  user_uuid: {
    type: Sequelize.UUID,
    references: {
      model: User,
      key: 'uuid',
    },
    primaryKey: true,
  },
  question_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Question,
      key: 'id',
    },
    primaryKey: true,
  },
  created_at: {
    type: Sequelize.DATEONLY,
    field: 'created_at',
    primaryKey: true,
  },
}, {
  createdAt: 'created_at',
});


export {
  User,
  Question,
  Answer,
  sequelize,
  Sequelize,
};
