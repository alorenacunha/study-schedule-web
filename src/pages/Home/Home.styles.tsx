import { createStyles, StyleRules } from '@material-ui/core';
import Background from '../../assets/images/b2.png';
const styles = (): StyleRules =>
  createStyles({
    content: {
      height: 'calc(100vh - 100px)',
      width: '100vw',
      background: `url(${Background}) no-repeat center`,
    },
    textover: {
      margin: 'auto',
    },
  });

export default styles;
