import express from 'express';
import cors from 'cors';
import connectDB from '../config/mongodb';
import users from '../routes/api/users';
import editUser from '../routes/api/editUser'

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

connectDB();

app.use('/api/users', users)
app.use('/api/editUser', editUser)

app.get('/', (req, res) => {
  res.status(200).send({ msg: 'user api' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
