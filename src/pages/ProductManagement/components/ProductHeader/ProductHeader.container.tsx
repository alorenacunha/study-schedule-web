import { ChangeEvent } from 'react';
import ManagementHeader from '../../../../components/ManagementHeader';
import { useProduct } from '../../../../context/product';

interface Props {
  handleNewProduct: () => void;
}
const ProductHeader: React.FC<Props> = (props): JSX.Element => {
  const { searchValue, setSearchValue } = useProduct();

  const searchInput = {
    value: searchValue,
    handleSearchChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
    },
  };

  return <ManagementHeader handleNewItem={props.handleNewProduct} {...{ searchInput }} />;
};

export default ProductHeader;
