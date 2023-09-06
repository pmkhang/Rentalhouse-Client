/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { apiRegister } from '../../services/auth';
import * as action from '../../store/actions';
import { useDispatch } from 'react-redux';

const Login = () => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [payload, setPayload] = useState({
    phone: '',
    password: '',
    name: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  const handleSubmit = async () => {
    dispatch(action.register(payload));
    console.log('payload: ', payload);
  };

  return (
    <div className="bg-white w-[600px] p-[30px] pb-[60px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h3>
      <div className="w-full flex flex-col gap-5">
        {isRegister && (
          <Input
            type={'text'}
            label={'Họ tên'}
            id={'name'}
            name={'name'}
            placeholder={'Nhập họ tên'}
            value={payload.name}
            onChange={(e) => setPayload((prev) => ({ ...prev, name: e.target.value }))}
          />
        )}
        <Input
          type={'tel'}
          label={'Số điện thoại'}
          id={'phone'}
          name={'phone'}
          placeholder={'Nhập số điện thoại'}
          value={payload.phone}
          onChange={(e) => setPayload((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <Input
          type={'password'}
          label={'Mật khẩu'}
          id={'password'}
          name={'password'}
          placeholder={'Nhập mật khẩu'}
          value={payload.password}
          onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
        />
        <Button
          className={'mt-2'}
          text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
          textColor={'text-white'}
          bgColor={'bg-secondary1'}
          fullWidth
          onClick={handleSubmit}
        />
      </div>
      {isRegister ? (
        <div className="mt-7 flex flex-col gap-3">
          <p className="text-sm">
            Bấm vào nút đăng ký tức là bạn đã đồng ý với
            <span className="text-blue-700 hover:text-[red] cursor-pointer">quy định sử dụng </span>
            của chúng tôi
          </p>
          <p className="text-sm">
            Bạn đã có tài khoản?
            <span className="text-blue-700 hover:text-[red] cursor-pointer" onClick={() => setIsRegister(false)}>
              Đăng nhập ngay
            </span>
          </p>
        </div>
      ) : (
        <div className="mt-7 flex items-center justify-between">
          <small className="text-[blue] hover:text-[red] cursor-pointer">Bạn quên mật khẩu</small>
          <small className="text-[blue] hover:text-[red] cursor-pointer" onClick={() => setIsRegister(true)}>
            Tạo tài khoản mới
          </small>
        </div>
      )}
    </div>
  );
};

export default Login;
