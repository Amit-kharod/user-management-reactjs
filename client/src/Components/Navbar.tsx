import { Dispatch, SetStateAction } from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { Button } from './UI/button';
1;

export const Navbar = ({
  setNewUserModel,
  refillHandler,
}: {
  setNewUserModel: Dispatch<SetStateAction<boolean>>;
  refillHandler: () => void;
}) => {
  return (
    <nav className="flex justify-end p-5 items-center gap-1 sm:gap-5 text-xs sm:text-base">
      <h2 className="select-none text-xs md:text-lg mr-auto bg-slate-200 px-3 py-2 rounded-sm">
        REACT USERS
      </h2>
      <Button className="flex gap-1 p-3 sm:p-5" onClick={() => refillHandler()}>
        <RotateCcw size={20}/>
        <span className='text-xs sm:text-base'> Refill Users</span>
      </Button>
      <button
        className="flex items-center"
        onClick={() => {
          setNewUserModel(true);
        }}
      >
        <Plus/>
        <span>New User</span>
      </button>
    </nav>
  );
};
