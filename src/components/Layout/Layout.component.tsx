import { Grid, WithStyles, withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { Outlet } from 'react-router';
import Header from '../Header';
import SideBar from '../SideBar';
import styles from './Layout.styles';

import { ToastContainer } from 'react-toastify';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
}

const LayoutComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes } = props;

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Header></Header>

      <Grid container className={classes.content}>
        <Grid item>
          <SideBar />
        </Grid>
        <Grid item>
          <Grid container className={classes.main}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>

      <ToastContainer />
    </Grid>
  );
};

export default withStyles(styles)(LayoutComponent);
