import React, { CSSProperties } from 'react';

interface WrapperProps {
  style: CSSProperties;
}

export const Wrapper: React.FC<WrapperProps> = (props) => {
  return (
    <div className='md:container md:mx-auto' style={props.style}>
      {props.children}
    </div>
  );
};
