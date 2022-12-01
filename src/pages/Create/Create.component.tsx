import { Grid, Button, SvgIcon, WithStyles, withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import { t } from 'i18next';
import styles from './Create.styles';
import { AddRounded } from '@material-ui/icons';
interface Props extends WithStyles<typeof styles> {
  classes: ClassNameMap;
  handleHeaderClick: (string) => void;
}

const CreateComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, handleHeaderClick } = props;

  return (
    <Grid
      container
      className={classes.content}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid className={classes.header}>
        <Button variant="outlined" onClick={() => handleHeaderClick('course')}>
          <AddRounded />
          {t('course')}
        </Button>
        <Button variant="outlined" onClick={() => handleHeaderClick('module')}>
          <AddRounded />
          {t('module')}
        </Button>
        <Button variant="outlined" onClick={() => handleHeaderClick('task')}>
          <AddRounded />
          {t('task')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CreateComponent);
