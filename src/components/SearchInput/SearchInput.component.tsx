import { IconButton, InputAdornment, TextField, WithStyles, withStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { ClassNameMap } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { ISearch } from './SearchInput.container';
import styles from './SearchInput.styles';

interface Props extends WithStyles<typeof styles>, ISearch {
  classes: ClassNameMap;
}

const SearchInputComponent: React.FC<Props> = (props): JSX.Element => {
  const { classes, value, handleSearchChange } = props;
  const { t } = useTranslation();

  return (
    <TextField
      className={classes.root}
      id="outlined-basic"
      label={t('search')}
      size="small"
      value={value}
      onChange={handleSearchChange}
      variant="outlined"
      inputProps={{ 'aria-label': 'search-input' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton aria-label="search">
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};

export default withStyles(styles)(SearchInputComponent);
