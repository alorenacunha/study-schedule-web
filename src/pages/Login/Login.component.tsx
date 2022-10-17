import {
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/images/logo.png';
import styles from './Login.styles';

interface Props extends WithStyles<typeof styles> {
  loading: boolean;
  errorFeedback: string | null;
  onLoginFormSubmit: (LoginForm) => void;
  classes: ClassNameMap;
}

const LoginComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, loading, errorFeedback, onLoginFormSubmit } = props;
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm();

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <img
        src={Logo}
        className={classes.logo}
        alt="brand agenda de estudos"
        aria-label="logo agenda de estudos"
      />
      <Divider />
      <form
        className={classes.formGroup}
        autoComplete="off"
        aria-label="login form"
        onSubmit={handleSubmit(onLoginFormSubmit)}
      >
        <Typography className={classes.formGroup} variant="h6">
          {t('signin')}
        </Typography>
        <Controller
          name="email"
          control={control}
          rules={{ required: String(t('what.required', { what: t('email') })) }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              aria-label="email"
              variant="filled"
              label={t('email')}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              InputLabelProps={{ shrink: true }}
              inputProps={{ 'aria-label': 'email' }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: String(t('what.required', { what: t('password') })) }}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              type="password"
              variant="filled"
              label={t('password')}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              InputLabelProps={{ shrink: true }}
              inputProps={{ 'aria-label': 'password' }}
            />
          )}
        />
        {errorFeedback ? <FormHelperText error>{errorFeedback}</FormHelperText> : null}
        <Button aria-label="submit login button" type="submit" variant="contained" color="primary">
          {!loading ? t('login') : <CircularProgress color="secondary" aria-label="loading" />}
        </Button>
      </form>
    </Grid>
  );
};

export default withStyles(styles)(LoginComponent);
