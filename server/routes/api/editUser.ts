import express from 'express';
import mongoose from 'mongoose';
import User from '../../models/User';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// @route  POST api/users
// @desc   edit existing user
// @access  Public
router.post(
  '/',
  [
    check('userName', 'Invalid Name').not().isEmpty().isString(),
    check('email', 'Invalid email').isEmail(),
    check('_id', 'Invalid userId').not().isEmpty().isString(),
    check('phoneNumber', 'Invalid Phone Number')
      .not()
      .isEmpty()
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
  ],
  async (req: express.Request, res: express.Response) => {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { _id, userName, phoneNumber, email } = req.body;

      // check if user does not exists
      const oldUser = await User.findOne({ _id: _id });
      if (!oldUser) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      const userFields = {
        userName,
        phoneNumber,
        email,
      };

      await User.findOneAndUpdate({ _id: _id }, userFields);
      const users = await User.find();
      res.json(users);
    } catch (error) {
      if (error.code === 11000) {
        if (error.keyValue.email)
          return res.status(500).json({ message: 'Email already registered' });
        return res
          .status(500)
          .json({ message: 'Phone number already registered' });
      }
      res.status(500).json({ message: error });
    }
  }
);

export default router;
