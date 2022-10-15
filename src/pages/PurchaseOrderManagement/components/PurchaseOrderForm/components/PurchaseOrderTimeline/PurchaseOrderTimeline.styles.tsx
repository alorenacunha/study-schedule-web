import { createStyles } from '@material-ui/core';
const styles = () =>
  createStyles({
    root: {
      marginTop: '-90px',
      marginBottom: '-80px',
    },
    timeline: {
      transform: 'rotate(90deg)',
    },
    timelineContentContainer: {
      textAlign: 'left',
    },
    timelineContent: {
      display: 'inline-block',
      transform: 'rotate(-90deg)',
      textAlign: 'center',
      minWidth: 70,
      margin: '0 -40px',
      height: '30px',
    },
    timelineIcon: {
      transform: 'rotate(-90deg)',
    },
  });

export default styles;
