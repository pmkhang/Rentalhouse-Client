import React from 'react';
import { dataContact } from '../../utils/dataContact';
import Button from '../Button';


const Contact = () => {
  return (
    <div className="min-h-[200px] w-full flex flex-col items-center justify-center p-12 gap-8 mb:gap-4 mb:p-4 bg-white rounded-lg shadow-lg border-[7px] border-[#e8eefc] border-dashed">
      <img src={dataContact.image} alt="thumbal" className="w-full h-[250px] object-contain" />
      <h3 className="text-[20px] font-bold text-center">{dataContact.content}</h3>
      <div className="w-[90%] flex items-center justify-between tl:flex-col tl:gap-5">
        {dataContact.contact.map((i, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-center text-red-500 uppercase font-semibold">{i.title}</span>
            <span className="text-center font-semibold text-[18px] text-[#233762]">{i.phone}</span>
            <span className="text-center font-semibold text-[18px] text-[#233762]">{i.zalo}</span>
          </div>
        ))}
      </div>
      <Button
        text={'Giửi liên hệ'}
        className={'bg-blue-600 hover:bg-blue-500 focus:ring-blue-300'}
        textStyle={'font-bold text-white text-sm'}
      />
    </div>
  );
};

export default Contact;
