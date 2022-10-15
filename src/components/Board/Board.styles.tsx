import { createStyles } from '@material-ui/core';
const styles = (theme) =>
  createStyles({
    root: {
      width: '100%',
      minWidth: '300px',
      maxWidth: '1200px',
      textAlign: 'center',
    },
    content: {
      padding: theme.spacing(4),
      justifyContent: 'center',
    },
  });

export default styles;
