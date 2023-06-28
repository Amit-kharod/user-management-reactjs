import { useEffect, useState } from 'react';
import { User } from './Components/User';
import IUser from './Interfaces/IUser';
import axios from 'axios';
import { UsersLoading } from './Components/UI/UsersLoading';

export const Users = () => {
  const [allUsers, setAllUsers] = useState<IUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/users`);
      setAllUsers(data);
      setIsLoading(false);
    };
    try {
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="grid w-[90vw] grid-cols-12 gap-5 mx-auto my-20 text-xs sm:text-base">
      {isLoading && <UsersLoading />}
      {allUsers?.map((data) => {
        return <User key={data._id} data={data} />;
      })}
    </div>
  );
};
