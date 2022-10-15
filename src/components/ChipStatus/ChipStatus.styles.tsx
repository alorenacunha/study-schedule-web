import { createStyles } from '@material-ui/core';
const styles = (theme) =>
  createStyles({
    blue: {
      backgroundColor: theme.palette.blue.main,
    },
    yellow: {
      backgroundColor: theme.palette.yellow.main,
    },
    green: {
      backgroundColor: theme.palette.green.main,
    },
    gray: {
      backgroundColor: theme.palette.gray.main,
    },
  });

export default styles;
