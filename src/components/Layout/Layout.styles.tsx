import { createStyles } from '@material-ui/core';
const styles = (theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
    },
    content: {
      width: '100%',
      display: 'flex',
      flexFlow: 'row',
    },
    main: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      width: 'calc(100vw - 120px)',
    },
  });

export default styles;
