import {
  Avatar,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ExitToApp, Person } from '@material-ui/icons';
import { ClassNameMap } from '@material-ui/styles';
import { t } from 'i18next';
import Logo from '../../assets/images/logo.png';
import { User } from '../../models/user.interface';
import styles from './Header.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  handleClick: (MouseEvent) => void;
  handleClose: () => void;
  signOut: () => void;
  user: User | null;
  anchorEl: null | HTMLElement;
}

const HeaderComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, handleClick, handleClose, anchorEl, signOut, user } = props;

  return (
    <Grid className={classes.root} container direction="row" alignItems="center">
      <Grid container className={classes.header} direction="row">
        <Grid item>
          <img
            src={Logo}
            className={classes.logo}
            alt="brand beauty ops"
            aria-label="logo beauty ops"
          />
        </Grid>
        <Grid item className={classes.navigator}>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            aria-label="avatar"
            onClick={handleClick}
          >
            <Avatar alt="user image" className={classes.large}>
              <Person />
            </Avatar>
          </IconButton>

          <Menu
            aria-label="menu"
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} aria-label="username">
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={user?.username} />
            </MenuItem>
            <MenuItem onClick={signOut} aria-label="logout">
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t('logout')} />
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(HeaderComponent);
