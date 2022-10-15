import { GridCellEditCommitParams } from '@mui/x-data-grid';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { usePurchaseOrder } from '../../../../context/purchaseOrder';
import { PurchaseItem } from '../../../../models/purchaseOrder.interface';
import PurchaseOrderAddProductComponent from './PurchaseOrderAddProduct.component';

interface Props {
  handlePurchaseOrderAddProductClose: (boolean) => void;
}

const PurchaseOrderAddProduct: React.FC<Props> = (props): JSX.Element => {
  const { handlePurchaseOrderAddProductClose } = props;
  const { products, openPurchaseOrderAddProduct } = usePurchaseOrder();
  const [purchaseItemsOptions, setPurchaseItemsOptions] = useState<PurchaseItem[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleCellEditCommit = useCallback(
    (cell: GridCellEditCommitParams) => {
      if (cell.field != 'quantity') return;
      setPurchaseItemsOptions((prevPurchaseItemsOptions) => {
        return prevPurchaseItemsOptions.map((row) => {
          if (row.id === cell.id) {
            return { ...row, quantity: Number(cell.value?.toString()) };
          }
          return row;
        });
      });
    },
    [setPurchaseItemsOptions],
  );

  useEffect(() => {
    if (!openPurchaseOrderAddProduct) return;
    setPurchaseItemsOptions(
      products
        .filter((item) => item.name?.includes(searchValue))
        .map((item, index) => ({
          id: index,
          product: item,
          quantity: 0,
          delivered: false,
        })),
    );
  }, [searchValue, products, openPurchaseOrderAddProduct]);

  const handleAddPurchaseProducts = useCallback(() => {
    const purchaseProductsToAdd = purchaseItemsOptions.filter((item) => item.quantity);
    handlePurchaseOrderAddProductClose(purchaseProductsToAdd);
  }, [purchaseItemsOptions, handlePurchaseOrderAddProductClose]);

  const searchInput = {
    value: searchValue,
    handleSearchChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
    },
  };

  return (
    <PurchaseOrderAddProductComponent
      {...{
        openPurchaseOrderAddProduct,
        handleCellEditCommit,
        handlePurchaseOrderAddProductClose,
        handleAddPurchaseProducts,
        searchInput,
        purchaseItemsOptions,
      }}
    />
  );
};

export default PurchaseOrderAddProduct;
