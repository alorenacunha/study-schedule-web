import { createStyles, StyleRules } from '@material-ui/core';
const styles = (): StyleRules =>
  createStyles({
    content: {
      height: 'calc(100vh - 100px)',
      width: '100vw',
    },
    header: {
      width: 'calc(100vh - 100px)',
      justifyContent: 'center',
      gap: '2em',
      display: 'flex',
      flexDirection: 'row',
    },
  });

export default styles;
