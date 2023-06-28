import { useState } from 'react';
import { Navbar } from './Components/Navbar';
import { Users } from './Users';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Components/UI/dialog';
import { AddUserForm } from './Components/Forms/AddUserForm';

function App() {
  const [editUserModel, setEditUserModel] = useState(false);
  const [deleteUserModel, setDeleteUserModel] = useState(false);
  const [newUserModel, setNewUserModel] = useState(false);
  const [reloadUsers, setReloadUsers] = useState(false);

  const addUserHandler = () => {
    setNewUserModel(false);
    setReloadUsers(!reloadUsers);
  };

  const userModel = (
    <Dialog open={newUserModel} onOpenChange={setNewUserModel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add New User</DialogTitle>
          <AddUserForm addUserHandler={addUserHandler} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <Navbar setNewUserModel={setNewUserModel} />
      <Users reloadUsers={reloadUsers} setReloadUsers={setReloadUsers} />
      {userModel}
    </>
  );
}

export default App;
