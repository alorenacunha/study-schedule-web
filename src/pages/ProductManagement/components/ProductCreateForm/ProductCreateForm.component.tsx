import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  MenuItem,
  TextField,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';
import { Brand } from '../../../../models/brand.interface';
import { Category } from '../../../../models/category.interface';
import styles from './ProductCreateForm.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  openCreateForm: boolean;
  handleCreateFormClose: (event?: any, reason?: string) => void;
  handleProductFormSubmit: (ProductForm) => void;
  errorFeedback: string | null;
  loading: boolean;
  categories: Category[];
  brands: Brand[];
  handleSubmit;
  control;
}

const ProductCreateFormComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    classes,
    openCreateForm,
    handleCreateFormClose,
    handleProductFormSubmit,
    errorFeedback,
    loading,
    categories,
    brands,
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
      <DialogTitle id="create-form-title">{t('new.what', { what: t('product') })}</DialogTitle>
      <DialogContent>
        <form className={classes.formGroup} autoComplete="off" aria-label="login form">
          <Controller
            name="name"
            control={control}
            rules={{ required: String(t('what.required', { what: t('name') })) }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                aria-label="name"
                variant="filled"
                label={t('product')}
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
            rules={{ required: String(t('what.required', { what: t('external.id') })) }}
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
          <Controller
            name="price"
            control={control}
            rules={{ required: String(t('what.required', { what: t('price') })) }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                aria-label="price"
                variant="filled"
                label={t('price')}
                type="number"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 'aria-label': 'price' }}
              />
            )}
          />
          <Controller
            name="margin"
            control={control}
            rules={{ required: String(t('what.required', { what: t('margin') })) }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                aria-label="margin"
                variant="filled"
                label={t('margin')}
                value={value}
                onChange={onChange}
                type="number"
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 'aria-label': 'margin' }}
              />
            )}
          />
          <Controller
            name="brand"
            control={control}
            rules={{ required: String(t('what.required', { what: t('brand') })) }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                aria-label="brand"
                variant="filled"
                label={t('brand')}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 'aria-label': 'brand-input' }}
                select
              >
                {brands?.map((brand) => (
                  <MenuItem key={`${brand.id}-${brand.name}`} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: String(t('what.required', { what: t('category') })) }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                aria-label="category"
                variant="filled"
                label={t('category')}
                value={value}
                onChange={onChange}
                select
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 'aria-label': 'category-input' }}
              >
                {categories?.map((category) => (
                  <MenuItem key={`${category.id}-${category.name}`} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
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
          onClick={handleSubmit(handleProductFormSubmit)}
        >
          {!loading ? t('save') : <CircularProgress color="secondary" aria-label="loading" />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(ProductCreateFormComponent);
