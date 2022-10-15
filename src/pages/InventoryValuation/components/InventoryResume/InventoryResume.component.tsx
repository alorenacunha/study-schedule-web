import {
  Avatar,
  Box,
  Grid,
  Paper,
  SvgIcon,
  SvgIconTypeMap,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { ClassNameMap } from '@material-ui/styles';
import { ElementType } from 'react';
import styles from './InventoryResume.styles';

export interface InventoryResumeType {
  iconAvatar?: ElementType<OverridableComponent<SvgIconTypeMap<{}, 'svg'>>>;
  name: string;
  value?: number;
  format?: (number) => string;
  description: string;
  color?: string;
}

interface Props extends WithStyles<typeof styles>, InventoryResumeType {
  classes: ClassNameMap;
}

const InventoryResumeComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, iconAvatar, value, description, color, format } = props;

  return (
    <Grid item>
      <Paper className={classes.root} aria-label={`card-${description}`}>
        <Avatar className={`${classes.icon} && ${color}`}>
          {iconAvatar && <SvgIcon component={iconAvatar}></SvgIcon>}
        </Avatar>
        <Box className={classes.value}>
          <Typography variant="h4" aria-label={`value-${value}`}>
            {format ? format(value) : value}
          </Typography>
          <Typography variant="subtitle2" aria-label={`description-${description}`}>
            {description}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default withStyles(styles)(InventoryResumeComponent);
