import {
  Avatar,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  IconButton,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { t } from 'i18next';
import { Controller } from 'react-hook-form';
import styles from './Settings.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  handleSettingsFormSubmit: (SettingsForm) => void;
  errorFeedback: string | null;
  loading: boolean;
  handleSubmit;
  control;
}

const SettingsComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, handleSettingsFormSubmit, errorFeedback, loading, handleSubmit, control } =
    props;

  return (
    <Grid
      container
      className={classes.content}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <form className={classes.formGroup} autoComplete="off" aria-label="domingo form">
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Controller
            name="dom"
            control={control}
            render={({ field: { onChange, value } }) => (
              <IconButton
                aria-label="domingo"
                onClick={() => {
                  onChange(!value);
                }}
              >
                <Avatar className={value ? classes.active : classes.inactive}>Dom</Avatar>
              </IconButton>
            )}
          />
          <Controller
            name="seg"
            control={control}
            render={({ field: { onChange, value } }) => (
              <IconButton
                aria-label="segunda"
                onClick={() => {
                  onChange(!value);
                }}
              >
                <Avatar className={value ? classes.active : classes.inactive}>Seg</Avatar>
              </IconButton>
            )}
          />
          <Controller
            name="ter"
            control={control}
            render={({ field: { onChange, value } }) => (
              <IconButton
                aria-label="terca"
                onClick={() => {
                  onChange(!value);
                }}
              >
                <Avatar className={value ? classes.active : classes.inactive}>Ter</Avatar>
              </IconButton>
            )}
          />
          <Controller
            name="qua"
            control={control}
            render={({ field: { onChange, value } }) => (
              <IconButton
                aria-label="quarta"
                onClick={() => {
                  onChange(!value);
                }}
              >
                <Avatar className={value ? classes.active : classes.inactive}>Qua</Avatar>
              </IconButton>
            )}
          />
          <Controller
            name="qui"
            control={control}
            render={({ field: { onChange, value } }) => (
              <IconButton
                aria-label="quinta"
                onClick={() => {
                  onChange(!value);
                }}
              >
                <Avatar className={value ? classes.active : classes.inactive}>Qui</Avatar>
              </IconButton>
            )}
          />
          <Controller
            name="sex"
            control={control}
            render={({ field: { onChange, value } }) => (
              <IconButton
                aria-label="sexta"
                onClick={() => {
                  onChange(!value);
                }}
              >
                <Avatar className={value ? classes.active : classes.inactive}>Sex</Avatar>
              </IconButton>
            )}
          />
          <Controller
            name="sab"
            control={control}
            render={({ field: { onChange, value } }) => (
              <IconButton
                aria-label="sabado"
                onClick={() => {
                  onChange(!value);
                }}
              >
                <Avatar className={value ? classes.active : classes.inactive}>Sab</Avatar>
              </IconButton>
            )}
          />
        </Grid>

        <Grid container className={classes.timerGroup}>
          <Typography className={classes.formGroup} variant="h6">
            De
          </Typography>
          <Controller
            name="start"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField type="time" value={value} onChange={onChange} />
            )}
          />
          <Typography className={classes.formGroup} variant="h6">
            até
          </Typography>
          <Controller
            name="end"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField type="time" value={value} onChange={onChange} />
            )}
          />
        </Grid>

        {errorFeedback ? <FormHelperText error>{errorFeedback}</FormHelperText> : null}

        <Button
          aria-label="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit(handleSettingsFormSubmit)}
        >
          {!loading ? t('save') : <CircularProgress color="secondary" aria-label="loading" />}
        </Button>
      </form>
    </Grid>
  );
};

export default withStyles(styles)(SettingsComponent);
