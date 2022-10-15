import { createStyles } from '@material-ui/core';
const styles = (theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      minWidth: '240px',
      padding: `${theme.spacing(2)}px`,
    },
    icon: {
      justifyContent: 'center',
      marginRight: theme.spacing(2),
    },
    value: {},
  });

export default styles;
