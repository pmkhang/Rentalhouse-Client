export const validate = (payload, setInvalidField) => {
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
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }
  });

  return invalidsCount;
};
