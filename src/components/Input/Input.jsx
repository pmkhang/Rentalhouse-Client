import React, { memo, forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      id,
      type = 'text',
      max,
      min,
      name,
      step,
      onChange,
      placeholder,
      value,
      onFocus,
      className,
      inputStyle,
      onClick,
      checked,
      readOnly,
      labelStyle,
      decs1,
      decs2,
      onWheel,
      errors,
      invalidField,
      setInvalidField,
      typeName,
      decs2Style,
      ...prop
    },
    ref,
  ) => {
    // console.log(errors);
    return (
      <>
        {type === 'checkbox' || type === 'radio' ? (
          <div className={`inline-flex gap-1 items-center mb-2 ml-1 ${className}`} onClick={onClick}>
            <input
              type={type}
              id={id}
              name={name}
              onChange={onChange}
              value={value}
              defaultChecked={checked}
              {...prop}
              ref={ref}
              className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 ${inputStyle}`}
            />
            <label htmlFor={id} className="w-full text-base ml-2 font-medium text-gray-900  cursor-pointer">
              {label}
            </label>
          </div>
        ) : (
          <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={id} className={`text-base block font-medium text-gray-900 cursor-pointer  ${labelStyle} `}>
              {label}
            </label>
            <div className={'flex items-center'}>
              <input
                type={type}
                id={id}
                name={name}
                onChange={onChange}
                onFocus={onFocus}
                placeholder={placeholder}
                value={value}
                max={max}
                min={min}
                step={step}
                onWheel={onWheel}
                readOnly={readOnly}
                ref={ref}
                {...prop}
                className={`outline-none bg-[#f9fbff] p-3 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ${inputStyle}`}
              />
              {decs1 && <span className="p-2 text-sm border border-gray-300 bg-slate-100 rounded-r-md">{decs1}</span>}
            </div>
            {errors && <span className="text-red-500 text-xs">{errors?.message}</span>}
            {invalidField && invalidField?.some((i) => i?.name === typeName) ? (
              <span className="text-red-500 text-xs">{invalidField?.find((i) => i?.name === typeName)?.message}</span>
            ) : (
              ''
            )}
            {decs2 && <span className={`p-2 text-xs mt-[-6px] text-gray-400 ${decs2Style}`}>{decs2}</span>}
          </div>
        )}
      </>
    );
  },
);

export default memo(Input);
