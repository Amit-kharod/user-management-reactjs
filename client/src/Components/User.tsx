import React, { Dispatch } from 'react';
import IUser from '../Interfaces/IUser';
import { Edit, Trash2 } from 'lucide-react';

interface IUserProps {
  data: IUser;
  deleteButtonHandler: (data: IUser) => void;
  editButtonHandler: (data: IUser) => void;
}

export const User = ({
  data,
  deleteButtonHandler,
  editButtonHandler,
}: IUserProps) => {
  return (
    <div className="col-span-12 lg:col-span-6 2xl:col-span-4 gap-2 w-[100%] py-5 border-2 rounded-lg flex justify-center flex-col hover:bg-gray-100">
      <div className="flex gap-5 items-center p-5 sm:mx-3">
        <img
          className="w-14 rounded-full sm:w-24"
          src={data.avatar}
          alt="profile pic"
        />
        <div className="flex w-[80%] flex-col gap-1 flex-wrap">
          <span>{data.userName}</span>
          <span>{data.email}</span>
          <span>{data.phoneNumber}</span>
        </div>
      </div>
      <div className="flex gap-5 self-end mx-5 sm:mx-10">
        <button className="flex gap-1" onClick={() => editButtonHandler(data)}>
          <Edit color="#40a4c2" />
          <span className="hidden sm:block">Edit</span>
        </button>
        <button
          className="flex gap-1"
          onClick={() => deleteButtonHandler(data)}
        >
          <Trash2 color="#c24040" />
          <span className="hidden sm:block">Delete</span>
        </button>
      </div>
    </div>
  );
};
