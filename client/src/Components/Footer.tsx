import React from 'react';
import { Github } from 'lucide-react';
import { Button } from './UI/button';

export const Footer = () => {
  return (
    <div className="fixed bottom-0 flex w-full justify-center items-center gap-5 p-3 bg-white">
      <h6>Made with ❤️ by Amit Kharod</h6>
      <a>
        <Button asChild>
          <a href="https://github.com/Amit-kharod/user-management-reactjs" target='_blank'>
            <Github />
            <span>Source Code</span>
          </a>
        </Button>
      </a>
    </div>
  );
};
