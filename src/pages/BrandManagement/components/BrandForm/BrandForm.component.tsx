import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';
import styles from './BrandForm.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  openCreateForm: boolean;
  handleCreateFormClose: (event?: any, reason?: string) => void;
  handleBrandFormSubmit: (BrandForm) => void;
  errorFeedback: string | null;
  loading: boolean;
  handleSubmit;
  control;
}

const BrandFormComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    classes,
    openCreateForm,
    handleCreateFormClose,
    handleBrandFormSubmit,
    errorFeedback,
    loading,
    handleSubmit,
    control,
  } = props;
  return (
    <Dialog
      className={classes.root}
      open={openCreateForm}
      onClose={handleCreateFormClose}
      aria-label="create-form-modal"
    >
      <DialogTitle id="create-form-title">{t('new.what', { what: t('brand') })}</DialogTitle>
      <DialogContent>
        <form className={classes.formGroup} autoComplete="off" aria-label="login form">
          <Controller
            name="name"
            control={control}
            rules={{ required: String(t('name.required')) }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                aria-label="name"
                variant="filled"
                label={t('brand')}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 'aria-label': 'name' }}
              />
            )}
          />
          <Controller
            name="external_id"
            control={control}
            rules={{
              required: String(t('external.id.required')),
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                aria-label="external_id"
                variant="filled"
                label={t('external.id')}
                type="number"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 'aria-label': 'external_id' }}
              />
            )}
          />
          {errorFeedback ? <FormHelperText error>{errorFeedback}</FormHelperText> : null}
        </form>
      </DialogContent>
      <DialogActions>
        <Button aria-label="cancel" variant="contained" onClick={() => handleCreateFormClose()}>
          {t('cancel')}
        </Button>

        <Button
          aria-label="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleBrandFormSubmit)}
        >
          {!loading ? t('save') : <CircularProgress color="secondary" aria-label="loading" />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(BrandFormComponent);
