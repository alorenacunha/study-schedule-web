import { createStyles, StyleRules } from '@material-ui/core';
const styles = (): StyleRules =>
  createStyles({
    content: {
      height: 'calc(100vh - 100px)',
      width: '100vw',
    },
    textover: {
      margin: 'auto',
    },
  });

export default styles;
