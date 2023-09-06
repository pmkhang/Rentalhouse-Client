import React from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = () => {
   return (
      <div className="bg-white w-[600px] p-[30px] pb-[80px] rounded-md shadow-sm">
         <h3 className="font-semibold text-2xl mb-3">Đăng nhập</h3>
         <div className="w-full flex flex-col gap-5">
            <Input
               type={'tel'}
               label={'Số điện thoại'}
               id={'phone'}
               name={'phone'}
               placeholder={'Nhập số điện thoại'}
            />
            <Input
               type={'password'}
               label={'Mật khẩu'}
               id={'password'}
               name={'password'}
               placeholder={'Nhập mật khẩu'}
            />
            <Button className={'mt-2'} text={'Đăng nhập'} textColor={'text-white'} bgColor={'bg-secondary1'} fullWidth />
         </div>
         <div className='mt-7 flex items-center justify-between'>
            <small className='text-[blue] hover:text-[red] cursor-pointer'>Bạn quên mật khẩu</small>
            <small className='text-[blue] hover:text-[red] cursor-pointer'>Tạo tài khoản mới</small>
         </div>
      </div>
   );
};

export default Login;
