import { Backdrop } from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';
import { colors } from '../../theme/styles';

function BackdropLoader({ loading, handleClose, children }) {
  if (!loading) return null;
  return (
    <Backdrop
      sx={{
        color: colors.WHITE_COLOR,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={loading}
      onClick={handleClose}
    >
      <InfinitySpin width="200" color={colors.PRIMARY_COLOR} />
    </Backdrop>
  );
}

export default BackdropLoader;
