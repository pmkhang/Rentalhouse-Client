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
import { register, login } from '../../redux/action/authAction';
import { getUsersData } from '../../redux/action/userAction';

const SignUpLogin = ({ flag }) => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidField, setInvalidField] = useState([]);
  const [payload, setPayload] = useState({
    phone: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, message, update } = useSelector((state) => state.auth);
  const { usersData } = useSelector((state) => state.user);
  useEffect(() => {
    if (usersData) {
      dispatch(getUsersData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegister, location?.pathname]);

  useEffect(() => {
    flag ? setIsRegister(flag) : setIsRegister(location.state?.flag);
  }, [location.state?.flag, flag]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
      toast.success('Đăng nhập thành công !');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    message && Swal.fire('Oops !', message, 'error');
  }, [message, update]);

  const handleSubmit = async () => {
    const isRegistration = isRegister;
    const { phone, password } = payload;
    const invalids = validate({ phone, password });
    if (invalids > 0) {
      return;
    }
    const userExists = usersData.find((user) => user.phone === phone);
    if (isRegistration) {
      if (userExists?.phone === payload?.phone) {
        Swal.fire('Oops!', 'Số điện thoại này đã tồn tại!', 'error');
      } else {
        dispatch(register(payload));
        navigate('/dang-nhap');
        setIsRegister(false);
        setPayload({
          phone: '',
          password: '',
          name: '',
        });
        toast.success('Đăng ký thành công!');
        dispatch(getUsersData());
      }
    } else {
      if (userExists?.phone === payload?.phone) {
        dispatch(login(payload));
      } else {
        Swal.fire('Oops!', 'Bạn nhập sai số điện thoại hoặc mật khẩu', 'error');
      }
    }
  };

  const validate = (payload) => {
    const fields = Object.entries(payload);
    let invalidsCount = 0;
    fields.forEach((field) => {
      if (field[1] === '') {
        setInvalidField((prev) => [
          ...prev,
          {
            name: field[0],
            message: 'Bạn không được bỏ trống trường này !',
          },
        ]);
        invalidsCount++;
      }
    });
    fields.forEach((field) => {
      switch (field[0]) {
        case 'password':
          if (field[1].length < 6) {
            setInvalidField((prev) => [
              ...prev,
              {
                name: field[0],
                message: 'Mật khẩu tối thiểu 8 ký tự!',
              },
            ]);
            invalidsCount++;
          }
          break;
        case 'passwordConfirm':
          if (field[1] !== payload.password) {
            setInvalidField((prev) => [
              ...prev,
              {
                name: field[0],
                message: 'Xác nhận mật khẩu không khớp !',
              },
            ]);
            invalidsCount++;
          }
          break;
        case 'phone':
          if (!+field[1]) {
            setInvalidField((prev) => [
              ...prev,
              {
                name: field[0],
                message: 'Số điện thoại không hợp lệ',
              },
            ]);
            invalidsCount++;
          }
        default:
          break;
      }
    });

    return invalidsCount;
  };

  return (
    <div className="flex flex-col w-[600px] mx-auto my-0 mt-5  items-center justify-center bg-white p-[30px] pb-[60px] rounded-md shadow-sm">
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
            invalidField={invalidField}
            onFocus={() => setInvalidField([])}
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
          invalidField={invalidField}
          onFocus={() => setInvalidField([])}
        />
        <Input
          type={'password'}
          label={'Mật khẩu'}
          id={'password'}
          name={'password'}
          placeholder={'Nhập mật khẩu'}
          value={payload.password}
          onChange={(e) => setPayload((prev) => ({ ...prev, password: e.target.value }))}
          invalidField={invalidField}
          onFocus={() => setInvalidField([])}
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
            type={'password'}
            label={'Xác nhận mật khẩu'}
            id={'passwordConfirm'}
            name={'passwordConfirm'}
            placeholder={'Xác nhận mật khẩu'}
            value={payload.passwordConfirm}
            onChange={(e) => setPayload((prev) => ({ ...prev, passwordConfirm: e.target.value }))}
            invalidField={invalidField}
            onFocus={() => setInvalidField([])}
          />
        )}
        <Button
          className={'text-white bg-blue-700 hover:bg-blue-600 focus:ring-blue-300'}
          text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
          fullWidth
          onClick={handleSubmit}
        />
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
                setPayload({
                  phone: '',
                  password: '',
                  name: '',
                });
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
              setPayload({
                phone: '',
                password: '',
                name: '',
              });
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
