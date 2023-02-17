import BottomSheet from '../BottomSheet';
import NoticeContainer from './NoticeContainer';

interface Props {
  onClose: () => void;
}

const NoticeBottomSheet = ({ onClose }: Props) => {
  return (
    <BottomSheet onClose={onClose}>
      <NoticeContainer />
    </BottomSheet>
  );
};

export default NoticeBottomSheet;
