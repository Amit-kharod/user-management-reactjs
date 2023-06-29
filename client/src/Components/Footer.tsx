import { Github } from 'lucide-react';
import { Button } from './UI/button';

export const Footer = () => {
  return (
    <div className="border-2 fixed flex-col sm:flex-row bottom-0 flex w-full justify-center items-center gap-5 p-3 bg-white">
      <a>
        <Button asChild>
          <a
            href="https://github.com/Amit-kharod/user-management-reactjs"
            target="_blank"
          >
            <Github />
            <span className="text-[12px] sm:text-base">Source Code</span>
          </a>
        </Button>
      </a>
      <h6 className="text-[12px] sm:text-base">Made with 💙 by Amit Kharod</h6>
    </div>
  );
};
