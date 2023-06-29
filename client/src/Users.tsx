import { Dispatch, useEffect, useState } from 'react';
import { User } from './Components/User';
import IUser from './Interfaces/IUser';
import axios from 'axios';
import { UsersLoading } from './Components/UI/UsersLoading';

interface IUsersProps {
  isLoading: boolean;
  allUsers: IUser[] | null;
  deleteButtonHandler: (data: IUser) => void;
  editButtonHandler: (data: IUser) => void;
}

export const Users = ({
  isLoading,
  allUsers,
  deleteButtonHandler,
  editButtonHandler,
}: IUsersProps) => {
  return (
    <>
      {allUsers && allUsers.length > 0 ? (
        <div className="grid w-[90vw] grid-cols-12 gap-5 mx-auto my-20 text-xs sm:text-base">
          {isLoading ? (
            <UsersLoading />
          ) : (
            allUsers.map((data) => {
              return (
                <User
                  key={data._id}
                  data={data}
                  deleteButtonHandler={deleteButtonHandler}
                  editButtonHandler={editButtonHandler}
                />
              );
            })
          )}
        </div>
      ) : (
        <h2 className="flex h-[80vh] w-[100vw] justify-center items-center text-5xl text-slate-600">No users found...</h2>
      )}
    </>
  );
};
