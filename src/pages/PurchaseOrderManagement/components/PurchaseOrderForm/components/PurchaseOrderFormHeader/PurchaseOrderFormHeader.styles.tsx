import { createStyles } from '@material-ui/core';
const styles = (theme) =>
  createStyles({
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: '340px',
      minWidth: '220px',
      marginTop: theme.spacing(2),

      '& .MuiTypography-h6': {
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        width: '100%',
      },
      '& .MuiFormControl-root': {
        marginBottom: theme.spacing(2),
        width: '100%',
      },
      '& .MuiFilledInput-root': {
        backgroundColor: theme.palette.background.light,
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
