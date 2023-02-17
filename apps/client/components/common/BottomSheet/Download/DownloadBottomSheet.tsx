import BottomSheet from '../BottomSheet';
import DownloadContainer from './DownloadContainer';

interface Props {
  onClose: () => void;
  installable: boolean;
  openInstallPrompt: () => void;
}

const DownloadBottomSheet = ({ onClose, ...rest }: Props) => {
  return (
    <BottomSheet onClose={onClose}>
      <DownloadContainer {...rest} />
    </BottomSheet>
  );
};

export default DownloadBottomSheet;
