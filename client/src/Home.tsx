import { useEffect, useState } from 'react';
import { Navbar } from './Components/Navbar';
import { Users } from './Users';
import IUser from './Interfaces/IUser';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './Components/UI/dialog';
import { AddUserForm } from './Components/Forms/AddUserForm';
import { EditUserForm } from './Components/Forms/EditUserForm';
import { Button } from './Components/UI/button';
import axios from 'axios';
import { Footer } from './Components/Footer';

function App() {
  const [editUserModel, setEditUserModel] = useState(false);
  const [deleteUserModel, setDeleteUserModel] = useState(false);
  const [newUserModel, setNewUserModel] = useState(false);
  const [currentSelectedUser, setCurrentSelectedUser] = useState<IUser>({
    _id: '',
    userName: '',
    email: '',
    phoneNumber: 0,
    avatar: '',
  });
  const [reloadUsers, setReloadUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<IUser[] | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/users`);
      setAllUsers(data);
      setIsLoading(false);
    };
    try {
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }, [reloadUsers]);

  const addUserHandler = () => {
    setNewUserModel(false);
    setReloadUsers(!reloadUsers);
  };

  const editUserHandler = () => {
    setEditUserModel(false);
    setReloadUsers(!reloadUsers);
  };

  const deleteButtonHandler = (data: IUser) => {
    setCurrentSelectedUser(data);
    setDeleteUserModel(true);
  };

  const editButtonHandler = (data: IUser) => {
    setCurrentSelectedUser(data);
    setEditUserModel(true);
  };

  const deleteUserHandler = async (id: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`${import.meta.env.VITE_API}/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          _id: id,
        },
      });
      setAllUsers(data);
      setDeleteUserModel(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  const addUser = (
    <Dialog open={newUserModel} onOpenChange={setNewUserModel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add New User</DialogTitle>
          <AddUserForm addUserHandler={addUserHandler} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  const editUser = (
    <Dialog open={editUserModel} onOpenChange={setEditUserModel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit User</DialogTitle>
          <EditUserForm
            userData={currentSelectedUser}
            editUserHandler={editUserHandler}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  const deleteUser = (
    <Dialog open={deleteUserModel} onOpenChange={setDeleteUserModel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Are you sure?</DialogTitle>
        </DialogHeader>
        <Button onClick={() => deleteUserHandler(currentSelectedUser._id)}>
          Yes
        </Button>
        <Button variant="secondary" onClick={() => setDeleteUserModel(false)}>
          No
        </Button>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <Navbar setNewUserModel={setNewUserModel} />
      <Users
        isLoading={isLoading}
        allUsers={allUsers}
        deleteButtonHandler={deleteButtonHandler}
        editButtonHandler={editButtonHandler}
      />
      <Footer/>
      {addUser}
      {editUser}
      {deleteUser}
    </>
  );
}

export default App;
