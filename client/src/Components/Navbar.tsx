import React, { Dispatch, SetStateAction, useState } from 'react';
import { Plus } from 'lucide-react';

export const Navbar = ({
  setNewUserModel,
}: {
  setNewUserModel: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav className="flex justify-between p-5 items-center">
      <h2 className="text-xs md:text-lg">User Management Application</h2>
      <button
        className="flex "
        onClick={() => {
          setNewUserModel(true);
        }}
      >
        <Plus />
        <span>New User</span>
      </button>
    </nav>
  );
};
