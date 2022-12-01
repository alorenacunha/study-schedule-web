import { createStyles, StyleRules } from '@material-ui/core';

const styles = (): StyleRules =>
  createStyles({
    content: {
      height: 'calc(100vh - 150px)',
      width: 'calc(100vh - 100px)',
      justifyContent: 'flex-start',
    },
    textover: {
      margin: 'auto',
    },
  });

export default styles;
