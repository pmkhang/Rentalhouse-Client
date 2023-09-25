import React from 'react';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import { toast } from 'react-toastify';

const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Gửi liên hệ thành công, chúng tôi sẽ liên lạc với bạn sớm nhất có thể');
    reset();
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold my-2">Liên hệ với chúng tôi</h2>
      <div className="w-full flex gap-5  tl:flex-col">
        <div className="flex flex-col flex-1 h-fit gap-3 p-5 bg-gradient-to-tl from-cyan-400 to-blue-800 text-white rounded-2xl">
          <h3 className="font-semibold text-lg">Thông tin liên hệ</h3>
          <p>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn RentalHouse</p>
          <p>
            <span className="font-semibold">Điện thoại:</span> 0917 6xxxxx
          </p>
          <p>
            <span className="font-semibold">Email:</span> cskh.rentalhouse@gmail.com
          </p>
          <p>
            <span className="font-semibold">Zalo:</span> 0917 6xxxxx
          </p>
          <p>
            <span className="font-semibold">Viber:</span> 0917 6xxxxx
          </p>
          <p>
            <span className="font-semibold">Địa chỉ:</span> LD - 02.06, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ,
            Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
          </p>
        </div>
        <form
          className="flex-1 flex flex-col bg-white border border-gray-300 rounded-lg gap-3 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-semibold text-lg">Liên hệ trực tuyến</h3>
          <Input
            label="Họ và tên của bạn"
            id="fullname"
            {...register('fullname', { required: 'Bạn cần phải nhập trường này !' })}
            errors={errors?.fullname}
          />
          <Input
            label="Số điện thoại"
            id="phone"
            {...register('phone', {
              required: 'Bạn cần phải nhập trường này !',
              pattern: {
                value: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/,
                message: 'Bạn phải nhập đúng định đạng số điện thoại',
              },
            })}
            errors={errors?.phone}
          />

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="content" className="cursor-pointer">
              Nội dung
            </label>
            <textarea
              id="content"
              className="outline-none min-h-[100px] border border-gray-300 rounded-md p-3"
              {...register('content', { required: 'Bạn cần phải nhập trường này !' })}
            />
            {errors?.content && <span className="text-red-500 text-xs">{errors?.content?.message}</span>}
          </div>
          <Button
            fullWidth
            text={'Gửi'}
            className={'bg-blue-600 hover:bg-blue-500 '}
            textStyle={'text-white font-semibold'}
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;
