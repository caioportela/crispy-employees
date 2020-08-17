const { Op } = require('sequelize');
const logger = require('../loaders/logger');
const { Company, User } = require('../models');

const UserController = {
  /**
    * @endpoint: POST /users
    * @description: Create an user
  **/
  async create(req, res) {
    const body = req.body.user;

    try {
      // Check if user was sent
      if(!body) { throw 'Object "user" must be sent'; }

      // Check if all attributes were sent
      if(!body.name) { throw 'Missing name attribute'; }
      if(!body.password) { throw 'Missing password attribute'; }
      if(!body.username) { throw 'Missing username attribute'; }

      let user = await User.create({
        ...body,
        company: req.user.company,
      });

      user = user.get({ plain: true });
      delete user.password;

      return res.created({ user });
    } catch(e) {
      logger.error(`UserController :: create\n${e}`);
      return res.badRequest(e);
    }
  },

  /**
    * @endpoint: GET /users
    * @description: Return all users in a company
  **/
  async find(req, res) {
    const term = req.query.term;
    let where = { company: req.user.company };

    try {
      if(term) {
        where.name = { [Op.like]: `%${term}%` };
      }

      const users = await User.findAll({ where });

      return res.ok({ users });
    } catch(e) {
      logger.error(`UserController :: find\n${e}`);
      return res.badRequest(e);
    }
  },

  /**
    * @endpoint: GET /users/:id
    * @description: Return a single user be id
  **/
  async findOne(req, res) {
    const company = req.user.company;

    try {
      const user = await User.findOne({
        where: { company, id: req.params.id },
      });

      if(!user) {
        return res.notFound('User not found');
      }

      return res.ok({ user });
    } catch(e) {
      logger.error(`UserController :: findOne\n${e}`);
      return res.badRequest(e);
    }
  },

  /**
    * @endpoint: POST /users/signin
    * @description: Sign in session
  **/
  async signin(req, res) {
    const { username, password } = req.body;

    try {
      if(!username) { throw 'Missing username attribute'; }
      if(!password) { throw 'Missing password attribute'; }

      let user = await User.findOne({
        attributes: {
          include: ['password']
        },
        where: { username }
      });

      const message = 'Invalid username or password';
      if(!user) { throw message; }

      const token = user.generateToken(password);
      if(!token) { throw message; }

      user = user.get({ plain: true });
      delete user.password;

      const company = await Company.findOne({
        where: { id: user.company },
      });

      return res.ok({ company, token, user });
    } catch(e) {
      logger.error(`UserController :: signin\n${e}`);
      return res.unauthorized(e);
    }
  },

  /**
    * @endpoint: PUT /users/:id
    * @description: Update user attributes
  **/
  async update(req, res) {
    const sessionUser = req.user;
    const body = req.body.user;

    if(!sessionUser.admin && sessionUser.id !== parseInt(req.params.id)){
      return res.forbidden('Permission denied');
    }

    try {
      // Check if user was sent
      if(!body) { throw 'Object "user" must be sent'; }

      // Check if all attributes were sent
      if(!body.name) { throw 'Missing name attribute'; }
      if(!body.username) { throw 'Missing username attribute'; }

      const user = await User.findOne({
        where: {
          company: sessionUser.company,
          id: req.params.id
        }
      });

      if(!user) {
        return res.notFound('User not found');
      }

      await user.update(req.body.user);

      return res.ok({ user });
    } catch (e) {
      logger.error(`UserController :: update\n${e}`);
      return res.badRequest(e);
    }
  }
};

module.exports = UserController;
