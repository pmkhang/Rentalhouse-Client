/* eslint-disable no-fallthrough */
/* eslint-disable jsx-a11y/anchor-is-valid */
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { login, registerUser } from '../../redux/action/authAction';
import { setUpdate } from '../../redux/Slice/AuthSlice';
import { useForm } from 'react-hook-form';

const SignUpLogin = ({ flag }) => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  useEffect(() => {
    isRegister ? (document.title = 'Đăng ký') : (document.title = 'Đăng nhập');
  }, [isRegister]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, message, update, error } = useSelector((state) => state.auth);

  useEffect(() => {
    flag ? setIsRegister(flag) : setIsRegister(location.state?.flag);
  }, [location.state?.flag, flag]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
      toast.success('Đăng nhập thành công !');
    }
  }, [isLoggedIn, navigate]);
  console.log({ error, update, isLoggedIn });

  // useEffect(() => {
  //   message && Swal.fire('Oops !', 'Bạn đã sai mật khẩu hoặc số điện thoại', 'error');
  // }, [message]);

  const onSubmit = ({ name, phone, password }) => {
    if (isRegister) {
      dispatch(registerUser({ name, phone, password }));
      if (update === false) {
        Swal.fire('Oops !', message, 'error');
        return;
      } else {
        navigate('/dang-nhap');
        setIsRegister(false);
        toast.success('Đăng ký thành công!');
        reset();
      }
    } else {
      dispatch(login({ phone, password }));
      if (isLoggedIn) {
        dispatch(setUpdate(true));
        navigate('/');
        toast.success('Đăng nhập thành công!');
        reset();
      } else if (message === 'saimk&sdt') {
        Swal.fire('Oops !', 'Bạn đã sai mật khẩu hoặc số điện thoại', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col w-[600px] mx-auto my-0 mt-5  items-center justify-center bg-white p-[30px] pb-[60px] rounded-md shadow-lg">
      <h3 className="font-semibold text-2xl mb-3">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h3>
      <div className="w-full flex flex-col gap-5">
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {isRegister && (
            <Input
              {...register('name', {
                required: 'Bạn cần phải nhập trường này !',
              })}
              type={'text'}
              label={'Họ tên'}
              id={'name'}
              name={'name'}
              placeholder={'Nhập họ tên'}
              errors={errors?.name}
            />
          )}
          <Input
            {...register('phone', {
              required: 'Bạn cần phải nhập trường này !',
              pattern: {
                value: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/,
                message: 'Bạn phải nhập đúng định đạng số điện thoại',
              },
            })}
            type={'text'}
            label={'Số điện thoại'}
            id={'phone'}
            name={'phone'}
            placeholder={'Nhập số điện thoại'}
            errors={errors?.phone}
          />
          <Input
            {...register('password', {
              required: 'Bạn cần phải nhập trường này !',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
                message: 'Nhập tối thiễu 8 ký tự, chữ thường, chữ in hoa, số và ký tự đặt biệt',
              },
            })}
            type={'password'}
            label={'Mật khẩu'}
            id={'password'}
            name={'password'}
            placeholder={'Nhập mật khẩu'}
            errors={errors?.password}
          />
          {!isRegister && <Input type="checkbox" id="remember" label="Rememmber me" />}

          {isRegister && (
            <div className="hidden gap-5 items-center justify-start">
              <Input type={'radio'} label={'Nữ'} id={'female'} name={'gender'} value={'female'} />
              <Input type={'radio'} label={'Nam'} id={'male'} name={'gender'} value={'male'} />
              <Input type={'radio'} label={'Khác'} id={'orther'} name={'gender'} value={'orther'} />
            </div>
          )}

          {isRegister && (
            <Input
              {...register('confirmPassword', {
                required: 'Bạn cần phải nhập trường này !',
                validate: (value) => {
                  if (watch('password') !== value) {
                    return 'Xác nhận mật khẩu không khớp';
                  }
                },
              })}
              type={'password'}
              label={'Xác nhận mật khẩu'}
              id={'confirmPassword'}
              name={'confirmPassword'}
              placeholder={'Xác nhận mật khẩu'}
              errors={errors?.confirmPassword}
            />
          )}
          <Button
            className={'text-white bg-blue-700 hover:bg-blue-600 focus:ring-blue-300'}
            text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
            fullWidth
          />
        </form>
      </div>
      {isRegister ? (
        <div className="mt-7 flex flex-col w-full gap-3 ">
          <p className="text-sm">
            Bấm vào nút đăng ký tức là bạn đã đồng ý với{' '}
            <span className="text-blue-700 hover:text-[red] cursor-pointer">Quy định sử dụng </span>
            của chúng tôi
          </p>
          <p className="text-sm">
            Bạn đã có tài khoản?{' '}
            <span
              className="text-blue-700 hover:text-[red] cursor-pointer"
              onClick={() => {
                navigate('/dang-nhap');
                reset();
              }}
            >
              Đăng nhập ngay
            </span>
          </p>
        </div>
      ) : (
        <div className="mt-7 flex w-full items-center justify-between">
          <small className="text-[blue] hover:text-[red] cursor-pointer">Bạn quên mật khẩu</small>
          <small
            className="text-[blue] hover:text-[red] cursor-pointer"
            onClick={() => {
              navigate('/dang-ky');
              reset();
            }}
          >
            Tạo tài khoản mới
          </small>
        </div>
      )}
    </div>
  );
};

export default memo(SignUpLogin);
