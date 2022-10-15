import styles from './ChipStatus.styles';
import { Chip, withStyles, WithStyles } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
  label: string;
  color: string;
}

const ChipStatusComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, label, color } = props;

  return <Chip label={label} className={classes[color]} />;
};

export default withStyles(styles)(ChipStatusComponent);
