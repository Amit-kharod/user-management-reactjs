import express from 'express';
import mongoose from 'mongoose';
import User from '../../models/User';
import { check, validationResult } from 'express-validator';
import gravatar from 'gravatar';
import { dummyData } from '../../data/dummyData';

const router = express.Router();

// @route  GET api/users
// @desc   get all users
// @access  Public
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @route  POST api/users
// @desc   add new user
// @access  Public
router.post(
  '/',
  [
    check('userName', 'Invalid Name').not().isEmpty().isString(),
    check('email', 'Invalid email').isEmail(),
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
      const { userName, phoneNumber, email } = req.body;
      // generating avatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'retro',
      });

      const user = new User({ ...req.body, avatar: avatar });
      await user.save();
      const users = await User.find();
      res.json(users);
    } catch (error) {
      if (error.code === 11000) {
        if (error.keyValue.email)
          return res
            .status(500)
            .json({ type: 'email', message: 'Email already registered' });
        return res.status(500).json({
          type: 'phoneNumber',
          message: 'Phone number already registered',
        });
      }
      res.status(500).json({ message: error });
    }
  }
);

// @route  POST api/users/refill
// @desc   refill demo users
// @access  Public
router.post('/refill', async (req: express.Request, res: express.Response) => {
  try {
    await User.deleteMany();
    await Promise.all(
      dummyData.map(async (data) => {
        const newUser = new User(data);
        await newUser.save();
      })
    );
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// @route  DELETE api/users
// @desc   delete a user
// @access  Public
router.delete('/', async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.find({ _id: req.body._id });
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.deleteOne({ _id: req.body._id });
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
