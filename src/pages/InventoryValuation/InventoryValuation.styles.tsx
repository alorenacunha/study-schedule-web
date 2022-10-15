import { createStyles } from '@material-ui/core';
const styles = (theme) =>
  createStyles({
    root: {
      width: '100%',
      minWidth: '300px',
      maxWidth: '1200px',
      padding: theme.spacing(2),
    },
    content: {
      padding: theme.spacing(2),
      justifyContent: 'center',
    },
    filtersContainer: {
      width: 'auto',
    },
    search: {
      width: '50%',
    },
  });

export default styles;
