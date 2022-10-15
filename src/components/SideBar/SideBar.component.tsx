import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  SvgIconTypeMap,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { ClassNameMap } from '@material-ui/styles';
import { ElementType } from 'react';
import styles from './SideBar.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  menu: {
    icon: ElementType<OverridableComponent<SvgIconTypeMap<{}, 'svg'>>>;
    label: string;
    notMenu?: boolean;
    route: string;
  }[];
  goTo: (route: string) => void;
}

const SideBarComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, menu, goTo } = props;
  return (
    <Drawer variant="permanent" className={classes.drawer}>
      <List aria-label="side-bar">
        {menu
          .filter((item) => !item.notMenu)
          .map((item, index) => (
            <ListItem
              button
              key={index + '-' + item.label}
              aria-label={item.label}
              onClick={() => goTo(item.route)}
              className={window.location.pathname === item.route ? 'active' : ''}
            >
              <ListItemIcon>
                <SvgIcon aria-label={'icon-' + item.label} component={item.icon}></SvgIcon>
              </ListItemIcon>
              <ListItemText aria-label={'label-' + item.label} primary={item.label} />
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(SideBarComponent);
