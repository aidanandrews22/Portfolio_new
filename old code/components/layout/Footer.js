import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary fixed bottom-0 w-full">
      <div className="containe text-center">
        <p className="text-sm">
          If you encounter any issues or bugs please report them <button onClick={() => {/* Add reporting logic here */}} className="text-primary hover:underline">here</button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;