import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
} from '@material-ui/core';
import { t } from 'i18next';

interface Props {
  title: string;
  loading: boolean;
  errorFeedback: string | null;
  openDeleteDialog: boolean;
  handleDelete: () => void;
  handleDeleteDialogClose: (event?: any, reason?: string) => void;
}

const DeleteDialogComponent: React.FC<Props> = (props): JSX.Element => {
  const { title, loading, errorFeedback, openDeleteDialog, handleDelete, handleDeleteDialogClose } =
    props;

  return (
    <Dialog
      open={openDeleteDialog}
      onClose={handleDeleteDialogClose}
      aria-label="delete-confirmation-modal"
    >
      <DialogTitle aria-label="delete-dialog-title">
        {t('delete.what', {
          what: title,
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText aria-label="delete-dialog-description">
          {t('delete.message.what', { what: title.toLowerCase() })}

          {errorFeedback ? <FormHelperText error>{errorFeedback}</FormHelperText> : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button aria-label="cancel" variant="contained" onClick={() => handleDeleteDialogClose()}>
          {t('cancel')}
        </Button>
        <Button
          aria-label="confirm-delete"
          variant="contained"
          color="primary"
          onClick={() => handleDelete()}
        >
          {!loading ? t('delete') : <CircularProgress color="secondary" aria-label="loading" />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialogComponent;
