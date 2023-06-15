import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb';
import users from './routes/api/users';
import editUser from './routes/api/editUser';

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

connectDB();

app.use(express.json());

app.use('/users', users);
app.use('/editUser', editUser);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;
