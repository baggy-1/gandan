import BottomSheet from '../BottomSheet';
import DownloadContainer from './DownloadContainer';

interface Props {
  onClose: () => void;
}

const DownloadBottomSheet = ({ onClose }: Props) => {
  return (
    <BottomSheet onClose={onClose}>
      <DownloadContainer />
    </BottomSheet>
  );
};

export default DownloadBottomSheet;
