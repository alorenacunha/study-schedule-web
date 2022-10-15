import TableGrid from '../../../../components/TableGrid';
import { useInventory } from '../../../../context/inventory';
import { Inventory } from '../../../../models/inventory.interface';
import columns from './InventoryTable.columns';

export interface InventoryTableProps {
  rows: Inventory[];
}

const InventoryTable: React.FC<InventoryTableProps> = (props): JSX.Element => {
  const { rows } = props;
  const { pagination, setPagination, loading } = useInventory();

  return <TableGrid {...{ columns, rows, loading, pagination, setPagination }} />;
};

export default InventoryTable;
