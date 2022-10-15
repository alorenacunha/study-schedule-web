import { ChangeEvent } from 'react';
import ManagementHeader from '../../../../components/ManagementHeader';
import { usePurchaseOrder } from '../../../../context/purchaseOrder';

interface Props {
  handlePurchaseOrderNew: () => void;
}

const PurchaseOrderHeader: React.FC<Props> = (props): JSX.Element => {
  const { searchValue, setSearchValue } = usePurchaseOrder();

  const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const searchInput = {
    value: searchValue,
    handleSearchChange,
  };

  return <ManagementHeader handleNewItem={props.handlePurchaseOrderNew} {...{ searchInput }} />;
};

export default PurchaseOrderHeader;
