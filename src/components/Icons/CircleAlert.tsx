import React, { SVGProps } from 'react';

const CircleAlertIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z'
      fill='currentColor'
    />
    <path
      d='M12 13C11.4 13 11 12.6 11 12V8C11 7.4 11.4 7 12 7C12.6 7 13 7.4 13 8V12C13 12.6 12.6 13 12 13Z'
      fill='currentColor'
    />
    <path
      d='M12 17C11.7 17 11.5 16.9 11.3 16.7C11.1 16.5 11 16.3 11 16C11 15.9 11 15.7 11.1 15.6C11.2 15.5 11.2 15.4 11.3 15.3C11.6 15 12 14.9 12.4 15.1C12.5 15.1 12.5 15.1 12.6 15.2C12.6 15.2 12.7 15.3 12.8 15.3C12.9 15.4 13 15.5 13 15.6C13 15.7 13 15.9 13 16C13 16.1 13 16.3 12.9 16.4C12.8 16.5 12.8 16.6 12.7 16.7C12.5 16.9 12.3 17 12 17Z'
      fill='currentColor'
    />
  </svg>
);

export default CircleAlertIcon;
