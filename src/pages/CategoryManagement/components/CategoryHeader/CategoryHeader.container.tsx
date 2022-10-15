import { ChangeEvent } from 'react';
import ManagementHeader from '../../../../components/ManagementHeader';
import { useCategory } from '../../../../context/category';

interface Props {
  handleNewCategory: () => void;
}

const CategoryHeader: React.FC<Props> = (props): JSX.Element => {
  const { searchValue, setSearchValue } = useCategory();

  const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const searchInput = {
    value: searchValue,
    handleSearchChange,
  };

  return <ManagementHeader handleNewItem={props.handleNewCategory} {...{ searchInput }} />;
};

export default CategoryHeader;
