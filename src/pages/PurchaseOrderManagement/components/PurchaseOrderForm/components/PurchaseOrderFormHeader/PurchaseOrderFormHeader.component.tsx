import {
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { ClassNameMap } from '@material-ui/styles';
import { t } from 'i18next';
import styles from './PurchaseOrderFormHeader.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  errorFeedback: string | null;
  newPurchaseOrder;
  setNewPurchaseOrder;
  handlePurchaseOrderFormClose: () => void;
}

const PurchaseOrderFormHeaderComponent: React.FC<Props> = (props): JSX.Element => {
  const {
    classes,
    newPurchaseOrder,
    setNewPurchaseOrder,
    errorFeedback,
    handlePurchaseOrderFormClose,
  } = props;

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item>
        <Grid container direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
          <Grid item>
            <IconButton
              aria-label={'go-back'}
              component="span"
              onClick={() => handlePurchaseOrderFormClose()}
            >
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h4" aria-label={'title-new'}>
              {t('new.what', { what: t('purchase.order') })}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.formGroup}>
        <TextField
          required
          aria-label="name"
          variant="outlined"
          label={t('purchase.order')}
          value={newPurchaseOrder.name}
          onChange={(event) =>
            setNewPurchaseOrder((prevNewPurchaseOrder) => ({
              ...prevNewPurchaseOrder,
              name: event.target.value,
            }))
          }
          error={!newPurchaseOrder.name}
          helperText={
            newPurchaseOrder.name
              ? null
              : t('what.required', {
                what: t('name'),
              })
          }
          InputLabelProps={{ shrink: true }}
          inputProps={{ 'aria-label': 'name' }}
        />

        <TextField
          required
          aria-label="vendor"
          variant="outlined"
          label={t('vendor')}
          value={newPurchaseOrder.vendor}
          onChange={(event) =>
            setNewPurchaseOrder((prevNewPurchaseOrder) => ({
              ...prevNewPurchaseOrder,
              vendor: event.target.value,
            }))
          }
          error={!newPurchaseOrder.vendor}
          helperText={
            newPurchaseOrder.vendor
              ? null
              : t('what.required', {
                what: t('vendor'),
              })
          }
          InputLabelProps={{ shrink: true }}
          inputProps={{ 'aria-label': 'vendor' }}
        />
        {errorFeedback ? <FormHelperText error>{errorFeedback}</FormHelperText> : null}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(PurchaseOrderFormHeaderComponent);
