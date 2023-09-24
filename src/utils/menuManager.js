import icons from './icons';

const { BsClipboardPlus, BsClipboardCheck, BiUser } = icons;

export const menuManager = [
  {
    id: 1,
    text: 'Đăng tin cho thuê',
    path: '/quan-ly/dang-tin-cho-thue',
    icon: <BsClipboardPlus />,
  },
  {
    id: 2,
    text: 'Quản lý tin đăng',
    path: '/quan-ly/tin-dang',
    icon: <BsClipboardCheck />,
  },
  {
    id: 3,
    text: 'Thông tin cá nhân',
    path: '/quan-ly/cap-nhat-thong-tin-ca-nhan',
    icon: <BiUser />,
  },
];
