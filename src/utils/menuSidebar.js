import icons from './icons';

const { BsClipboardPlus, BsClipboardCheck, BiUser, BiHeart, AiOutlineContacts } = icons;

export const menuSidebar = [
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
    text: 'Sửa thông tin cá nhân',
    path: '/quan-ly/cap-nhat-thong-tin-ca-nhan',
    icon: <BiUser />,
  },
  {
    id: 4,
    text: 'Tin đã lưu',
    path: '/quan-ly/tin-da-luu',
    icon: <BiHeart />,
  },
  {
    id: 5,
    text: 'Liên hệ',
    path: '/lien-he',
    icon: <AiOutlineContacts />,
  },
];
