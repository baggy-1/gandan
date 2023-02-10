import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

const getKoreaDate = (date: Date) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return {
    date: dayjs.tz(date, 'Asia/Seoul').format('YYYY-MM-DD'),
    datetime: dayjs.tz(date, 'Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'),
    dateKorea: dayjs.tz(date, 'Asia/Seoul').format('YYYY년 MM월 DD일'),
  };
};

export default getKoreaDate;
