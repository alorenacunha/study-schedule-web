import { createStyles, StyleRules, Theme } from '@material-ui/core';
const styles = (theme: Theme): StyleRules =>
  createStyles({
    formGroup: {
      display: 'flex',
      'flex-direction': 'column',
      gap: '31px',
    },
    timerGroup: {
      display: 'flex',
      'flex-direction': 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '31px',
    },
    active: {
      'background-color': theme.palette.primary.main,
      'font-size': '1.0rem',
    },
    inactive: {
      'font-size': '1.0rem',
    },
  });

export default styles;
