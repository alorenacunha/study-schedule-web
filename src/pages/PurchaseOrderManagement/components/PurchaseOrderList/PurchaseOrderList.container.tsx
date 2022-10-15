import { IconButton } from '@material-ui/core';
import { GetAppRounded, OpenInNewRounded, PlaylistAddRounded } from '@material-ui/icons';
import { GridRowData, GridValueGetterParams } from '@mui/x-data-grid';
import TableGrid from '../../../../components/TableGrid';
import { usePurchaseOrder } from '../../../../context/purchaseOrder';
import columns from './PurchaseOrderList.columns';

export interface Props {
  handleDownload: (row: GridRowData) => void;
  handlePurchaseOrderAddProduct: (row: GridRowData | null) => void;
  handlePurchaseOrderDetails: (row: GridRowData) => void;
}

const PurchaseOrderList: React.FC<Props> = (props): JSX.Element => {
  const { handleDownload, handlePurchaseOrderAddProduct, handlePurchaseOrderDetails } = props;
  const { purchaseOrders, pagination, setPagination, loading } = usePurchaseOrder();

  const columnsWithActions = [
    ...columns,
    {
      field: 'actions',
      headerName: ' ',
      width: 160,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            <IconButton
              id={params.row.id + '-download'}
              aria-label={'button-download'}
              component="span"
              onClick={() => handleDownload(params.row)}
            >
              <GetAppRounded />
            </IconButton>

            <IconButton
              id={params.row.id + '-add-product'}
              aria-label={'button-add-product'}
              component="span"
              onClick={() => handlePurchaseOrderAddProduct(params.row)}
            >
              <PlaylistAddRounded />
            </IconButton>

            <IconButton
              id={params.row.id + '-detail'}
              aria-label={'button-detail'}
              component="span"
              onClick={() => handlePurchaseOrderDetails(params.row)}
            >
              <OpenInNewRounded />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <TableGrid
      rows={purchaseOrders}
      columns={columnsWithActions}
      {...{ loading, pagination, setPagination }}
    />
  );
};

export default PurchaseOrderList;
