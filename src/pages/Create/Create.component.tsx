import { Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { t } from 'i18next';
import styles from './Create.styles';

interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
}

const CreateComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes } = props;

  return (
    <Grid
      container
      className={classes.content}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item className={classes.contentOverlay}>
        <Typography className={classes.textover} variant="h1">
          {t('add.new')}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CreateComponent);
