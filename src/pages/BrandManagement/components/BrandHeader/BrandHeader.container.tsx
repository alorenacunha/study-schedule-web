import { ChangeEvent } from 'react';
import ManagementHeader from '../../../../components/ManagementHeader';
import { useBrand } from '../../../../context/brand';

interface Props {
  handleNewBrand: () => void;
}

const BrandHeader: React.FC<Props> = (props): JSX.Element => {
  const { searchValue, setSearchValue } = useBrand();

  const searchInput = {
    value: searchValue,
    handleSearchChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
    },
  };

  return <ManagementHeader handleNewItem={props.handleNewBrand} {...{ searchInput }} />;
};

export default BrandHeader;
