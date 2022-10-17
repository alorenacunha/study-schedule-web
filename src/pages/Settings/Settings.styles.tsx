import { createStyles } from '@material-ui/core';
const styles = (theme) =>
  createStyles({
    root: {
      '& .MuiDialog-paperWidthSm': {
        minWidth: '400px',
      },
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minWidth: '220px',
      marginTop: theme.spacing(2),
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    active: {
      fontSize: '14px',
      backgroundColor: theme.palette.primary.main,
    },
    inactive: {
      fontSize: '14px',
    },
  });

export default styles;
