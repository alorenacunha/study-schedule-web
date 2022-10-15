import { IconButton } from '@material-ui/core';
import { DeleteOutline, EditRounded } from '@material-ui/icons';
import { GridColDef, GridRowData, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Pagination } from '../../models/pagination.interface';
import { calcPagination } from '../../utils/utils';
import TableGridComponent from './TableGrid.component';

export interface Props {
  handleEdit?: (row: GridRowData) => void;
  handleDelete?: (row: GridRowData) => void;
  pagination: Pagination;
  setPagination: Function;
  loading: boolean;
  rows: GridRowData[];
  columns: GridColDef[];
}

const CategoryList: React.FC<Props> = (props): JSX.Element => {
  const { handleEdit, handleDelete, pagination, setPagination, loading, rows, columns } = props;
  const [page, setPage] = useState(0);
  const [hasActions, setHasActions] = useState(false);

  const columnsWithActions = [
    ...columns,
    {
      field: 'crudactions',
      headerName: ' ',
      width: 140,
      renderCell: (params: GridValueGetterParams) => {
        return (
          <>
            {handleEdit ? (
              <IconButton
                id={params.row.id + '-edit'}
                aria-label={'button-edit'}
                component="span"
                onClick={() => handleEdit(params.row)}
              >
                <EditRounded />
              </IconButton>
            ) : (
              ''
            )}
            {handleDelete ? (
              <IconButton
                id={params.row.id + '-delete'}
                aria-label={'button-delete'}
                component="span"
                onClick={() => handleDelete(params.row)}
              >
                <DeleteOutline />
              </IconButton>
            ) : (
              ''
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setHasActions(handleEdit ? true : false || handleDelete ? true : false);
  }, [handleEdit, handleDelete]);

  useEffect(() => {
    const { start, limit } = calcPagination(page, pagination.pageSize);
    setPagination((prevPagination) => ({
      ...prevPagination,
      _start: start,
      _limit: limit,
    }));
  }, [page, pagination?.pageSize, setPagination]);

  return (
    <TableGridComponent
      columns={hasActions ? columnsWithActions : columns}
      {...{ rows, loading, setPage, pagination }}
    />
  );
};

export default CategoryList;
