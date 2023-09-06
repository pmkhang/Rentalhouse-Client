import React, { memo } from 'react';

const Input = ({ label, id, type, name, onChange, placeholder }) => {
   return (
      <div className="">
         {type === 'checkbox' || type === 'radio' ? (
            <>
               <input
                  type={type}
                  id={id}
                  name={name}
                  onChange={onChange}
                  placeholder={placeholder}
                  className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
               />
               <label htmlFor={id} className="text-xs">
                  {label}
               </label>
            </>
         ) : (
            <>
               <label htmlFor={id} className="text-xs">
                  {label}
               </label>
               <input
                  type={type}
                  id={id}
                  name={name}
                  onChange={onChange}
                  placeholder={placeholder}
                  className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
               />
            </>
         )}
      </div>
   );
};

export default memo(Input);
