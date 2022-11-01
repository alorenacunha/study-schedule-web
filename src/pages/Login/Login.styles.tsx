import { createStyles, StyleRules, Theme } from '@material-ui/core';

const styles = (theme: Theme): StyleRules =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: '100vw',
      height: '100vh',
      '& .MuiDivider-root': {
        width: '50%',
        minWidth: '220px',
      },
    },
    logo: {
      marginBottom: theme.spacing(4),
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '30%',
      maxWidth: '340px',
      minWidth: '220px',
      marginTop: theme.spacing(2),

      '& .MuiTypography-h6': {
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        width: '100%',
      },
      '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
        width: '100%',
      },
      '& .MuiFilledInput-root': {
        backgroundColor: theme.palette.primary.contrastText,
        width: '100%',
      },
      '& .MuiFilledInput-underline:before': {
        borderBottom: '1px solid transparent',
      },
      '& .MuiButton-root': {
        width: '100%',
        height: '52px',
        marginBottom: theme.spacing(1),
      },
    },
  });

export default styles;
