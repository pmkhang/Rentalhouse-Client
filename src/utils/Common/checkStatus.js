import moment from 'moment';

const checkStatus = (dateTime) => {
  return moment(dateTime, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(moment(), 'day')
    ? 'Đang hoạt động'
    : 'Đã hết hạn';
};

export default checkStatus;
