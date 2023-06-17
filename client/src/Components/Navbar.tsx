import React from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './UI/dialog';
import { AddUserForm } from './Forms/AddUserForm';

export const Navbar = () => {
  const userModel = (
    <Dialog>
      <DialogTrigger>
        <button className="flex ">
          <Plus />
          <span>New User</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center'>Add New User</DialogTitle>
          <AddUserForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  return (
    <nav className="flex justify-between p-5 items-center">
      <h2 className="text-xs md:text-lg">User Management Application</h2>
      {userModel}
    </nav>
  );
};
