import { Button, Grid, WithStyles, withStyles } from '@material-ui/core';
import { t } from 'i18next';
import SearchInput from '../SearchInput';
import { ISearch } from '../SearchInput/SearchInput.container';
import styles from './ManagementHeader.styles';

interface Props extends WithStyles<typeof styles> {
  handleNewItem: () => void;
  searchInput: ISearch;
}

const ManagementHeaderComponent: React.FC<Props> = (props): JSX.Element => {
  const { handleNewItem, searchInput } = props;

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      <Grid item>
        <SearchInput {...searchInput} />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleNewItem} aria-label={'new-button'}>
          {t('new')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ManagementHeaderComponent);
