import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './confirmModal.css';
import { colors } from '../themes/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: colors.LIGHT_GREY,
      contrastText: colors.BLACK_COLOR,
    },
  },
});

const ConfirmAction = ({
  show,
  handleClose,
  onConfirm,
  title,
  buttonLabel,
  firstButtonLabel,
}) => {
  const { t } = useTranslation('translations');
  const dialogTitle = title || t('SURE_DELETE'); // Use the provided title or the default one
  const buttonTitle = buttonLabel || t('Delete');
  const firstButtonTitle = firstButtonLabel || t('Cancel');
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}?</DialogTitle>
        <DialogActions className="confirm-modal-buttons-con">
          <Button
            variant="contained"
            color="neutral"
            onClick={handleClose}
            className="confirm-modal-cancel-btn"
          >
            {firstButtonTitle}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            className="confirm-modal-delete-btn"
          >
            {buttonTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ConfirmAction;
