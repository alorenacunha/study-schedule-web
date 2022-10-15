import { GridCellEditCommitParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { usePurchaseOrder } from '../../../../../../context/purchaseOrder';
import PurchaseOrderFormListComponent from './PurchaseOrderFormList.component';

interface Props {
  handleCellEditCommit: (cell: GridCellEditCommitParams) => void;
  handleDeliveredSelection: (id: any) => void;
}

const PurchaseOrderForm: React.FC<Props> = (props): JSX.Element => {
  const { handleCellEditCommit, handleDeliveredSelection } = props;
  const { currentPurchaseOrder } = usePurchaseOrder();
  const [checkboxSelection, setCheckboxSelection] = useState(false);

  const [selectionModel, setSelectionModel] = useState(
    currentPurchaseOrder?.purchaseItems?.filter((r) => r.delivered).map((r) => r.id),
  );

  useEffect(() => {
    if (currentPurchaseOrder?.status == 'sent') {
      setCheckboxSelection(true);
    }
  }, [currentPurchaseOrder]);

  const handleSelection = (ids) => {
    setSelectionModel(ids);
    handleDeliveredSelection(ids);
  };

  return (
    <PurchaseOrderFormListComponent
      purchaseItemsOptions={currentPurchaseOrder.purchaseItems}
      {...{ handleCellEditCommit, handleSelection, checkboxSelection, selectionModel }}
    />
  );
};

export default PurchaseOrderForm;
