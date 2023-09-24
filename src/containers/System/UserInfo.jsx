import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { pathSystem } from '../../utils/constant';
import { useForm } from 'react-hook-form';
import { apiUploadImages } from '../../services/post';
import { ColorRing } from 'react-loader-spinner';
import { apiUpdateUserByID } from '../../services/user';
import { toast } from 'react-toastify';
import { getUserDataByID } from '../../redux/action/userAction';

const UserInfo = () => {
  const { userDataByID } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    document.title = 'Thông tin cá nhân';
  }, []);

  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    phone: '',
    zalo: '',
    fbUrl: '',
    avatar: '',
    // email: '',
  });

  const [fieldError, setFieldError] = useState({
    nameError: '',
    zaloError: '',
    fbUrlError: '',
    // emailError: '',
  });

  const { id, name, phone, zalo, fbUrl, avatar } = userInfo;
  const { nameError, zaloError, fbUrlError } = fieldError;

  useEffect(() => {
    setUserInfo({
      id: userDataByID?.id || '',
      name: userDataByID?.name || '',
      phone: userDataByID?.phone || '',
      zalo: userDataByID?.zalo || '',
      fbUrl: userDataByID?.fbUrl || '',
      avatar: userDataByID?.avatar || '',
      email: userDataByID?.email || '',
    });
  }, [userDataByID]);

  const handleInputChange = (e, field) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFieldError((prev) => ({
      ...prev,
      nameError: errors?.userName,
      zaloError: errors?.userZalo,
      fbUrlError: errors?.userFacebook,
      emailError: errors?.userEmail,
    }));
  }, [errors?.userEmail, errors?.userFacebook, errors?.userName, errors?.userZalo]);

  const handleFocus = (fieldName) => {
    setButtonVisible(true);
    setFieldError((prev) => ({
      ...prev,
      [fieldName]: '',
    }));
  };

  const handleUploadFile = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME);
    const response = await apiUploadImages(formData);
    console.log(response);
    if (response.status === 200) {
      setUserInfo((prev) => ({
        ...prev,
        avatar: response?.data?.secure_url,
      }));
    }
    setIsLoading(false);
  };

  const onSubmit = async () => {
    try {
      console.log({ name, zalo, fbUrl, avatar });
      const response = await apiUpdateUserByID({ name, zalo, fbUrl, avatar });
      if (response?.status === 200) {
        dispatch(getUserDataByID());
        toast.success('Cập nhật thông tin thành công');
        navigate('/');
      }
    } catch (error) {
      console.log('Update info error: ', error);
      toast.error('Cập nhật thông tin Thất bại');
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-medium py-4 border-b border-gray-200">Chỉnh sửa thông tin cá nhân</h2>
      <div className="max-w-[600px] min-h-[1000px] w-full my-0 mx-auto flex flex-col gap-5 mt-5">
        <Input
          type="text"
          inputStyle="py-2 bg-gray-200 focus:border focus:border-blue-400"
          readOnly
          label="Mã thành viên"
          id="userId"
          labelStyle="font-semibold"
          name="userId"
          value={id || ''}
        />

        <Input
          type="text"
          inputStyle="py-2 bg-gray-200 focus:border focus:border-blue-400"
          readOnly
          label="Số điện thoại"
          id="userPhone"
          labelStyle="font-semibold"
          name="userPhone"
          value={phone || ''}
          decs2="Đổi số điện thoại *(coming soon)"
          decs2Style="text-blue-800 cursor-pointer"
        />
        <Button
          fullWidth
          text="Đổi mật khẩu"
          className={'bg-orange-500 focus:ring-orange-300 hover:bg-orange-400'}
          textStyle={'text-white'}
          onClick={() => {
            navigate(`/quan-ly/${pathSystem.CHANGE_PASSWORD}`);
          }}
        />
        <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('userName', {
              required: 'Bạn cần phải nhập trường này !',
            })}
            errors={nameError}
            type="text"
            inputStyle="py-2 focus:border focus:border-blue-400"
            label="Tên hiển thị"
            id="userName"
            labelStyle="font-semibold"
            name="userName"
            value={name || '.'}
            onChange={(e) => handleInputChange(e, 'name')}
            onFocus={() => handleFocus('nameError')}
          />
          {/* <Input
            {...register('userEmail', {
              required: 'Bạn cần phải nhập trường này !',
              pattern: {
                value: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g,
                message: 'Nhập đúng định dang email !',
              },
            })}
            errors={emailError}
            type="text"
            inputStyle="py-2 focus:border focus:border-blue-400"
            label="Email"
            id="userEmail"
            labelStyle="font-semibold"
            name="userEmail"
            value={email || ''}
            onChange={(e) => handleInputChange(e, 'email')}
            onFocus={() => handleFocus('emailError')}
          /> */}
          <Input
            {...register('userZalo', {
              pattern: {
                value: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/,
                message: 'Bạn phải nhập đúng định đạng số Zalo',
              },
            })}
            errors={zaloError}
            type="text"
            inputStyle="py-2 focus:border focus:border-blue-400"
            label="Zalo"
            id="userZalo"
            labelStyle="font-semibold"
            name="userZalo"
            value={zalo || ''}
            onChange={(e) => handleInputChange(e, 'zalo')}
            onFocus={() => handleFocus('zaloError')}
          />
          <Input
            {...register('userFacebook', {
              pattern: {
                value: /https?:\/\/(?:www\.)?facebook\.com\/[A-Za-z0-9_.-]+\//g,
                message: 'Bạn phải nhập đúng định đạng Facebook url',
              },
            })}
            errors={fbUrlError}
            type="text"
            inputStyle="py-2 focus:border focus:border-blue-400"
            label="Facebook url"
            id="userFacebook"
            labelStyle="font-semibold"
            name="userFacebook"
            value={fbUrl || ''}
            onChange={(e) => handleInputChange(e, 'fbUrl')}
            onFocus={() => handleFocus('fbUrlError')}
          />
          <div className="w-full flex flex-col gap-6">
            <label className="text-base block font-semibold text-gray-900 cursor-pointer">Ảnh đại diện</label>
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperClass="blocks-wrapper"
                  colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
                />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3 items-center justify-center py-4">
                <img
                  src={
                    avatar ||
                    'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='
                  }
                  alt="avatar"
                  className="w-[120px] h-[120px] object-contain shadow-md rounded-full border border-gray-400"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer bg-slate-200 p-2 rounded-md text-sm shadow-md hover:bg-slate-100"
                >
                  Chọn ảnh mới
                </label>
                <input type="file" id="avatar" hidden onChange={handleUploadFile} />
              </div>
            )}
          </div>
          {isButtonVisible ? (
            <Button
              fullWidth
              text="Lưu & Cập nhật"
              className={'bg-blue-600 focus:ring-blue-300 hover:bg-blue-500'}
              textStyle={'text-white'}
            />
          ) : (
            <Button
              fullWidth
              text="Lưu & Cập nhật"
              className={'bg-gray-600 cursor-default'}
              textStyle={'text-white'}
              disabled
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
