import { Grid, Paper, WithStyles, withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import styles from './Board.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
}

const BoardComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, children } = props;

  return (
    <Grid container className={classes.root} direction="column" spacing={2} justifyContent="center">
      <Paper className={classes.content}>
        <Grid container direction="column" spacing={2} justifyContent="center">
          {children}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default withStyles(styles)(BoardComponent);
