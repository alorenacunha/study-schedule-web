import { createStyles } from '@material-ui/core';

const styles = (theme) =>
  createStyles({
    drawer: {
      display: 'flex',
      position: 'relative',
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      color: theme.palette.gray,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: `calc(${theme.spacing(7)} + 1px)`,
      [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
      },
      '& .MuiListItemIcon-root': {
        minWidth: 'unset',
        marginTop: '4px',
        marginBottom: '4px',
        color: theme.palette.gray,
      },
      '& .MuiDrawer-paper': {
        // background: 'transparent',
        color: theme.palette.gray,
        backgroundColor: theme.palette.background.default,
        // marginTop: theme.header.height,
        position: 'relative',
        height: `calc(100vh - ${theme.header.height})`,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
          width: `calc(${theme.spacing(9)} + 1px)`,
        },
      },

      '& .MuiListItemText-root': {
        display: 'none',
        fontFamily: theme.typography.fonts[1],
      },

      '& .active': {
        '& .MuiListItemIcon-root': {
          color: theme.palette.primary.main,
        },
      },

      '& :hover': {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        '& .MuiDrawer-paper': {
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
        },
        ' & .MuiListItemText-root': {
          paddingLeft: theme.spacing(1),
          display: 'block',
          visibility: 'visible',
          color: theme.palette.gray.dark,
          ' & .MuiTypography-root': {
            fontFamily: theme.typography.fonts[1],
            textTransform: 'uppercase',
            fontWeight: 500,
            fontSize: '0.9rem',
          },
        },
        '& .active': {
          '& .MuiListItemText-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
          },
        },
      },
    },
  });

export default styles;
