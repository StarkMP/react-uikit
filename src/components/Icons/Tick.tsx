import React, { SVGProps } from 'react';

const Tick: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox='0 0 12 9'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.8047 0.528575C12.0651 0.788925 12.0651 1.21103 11.8047 1.47138L4.4714 8.80472C4.21106 9.06507 3.78894 9.06507 3.5286 8.80472L0.195262 5.47138C-0.0650874 5.21103 -0.0650874 4.78892 0.195262 4.52858C0.455612 4.26823 0.877722 4.26823 1.13807 4.52858L4 7.3905L10.8619 0.528575C11.1223 0.268226 11.5444 0.268226 11.8047 0.528575Z'
      fill='currentColor'
    />
  </svg>
);

export default Tick;
