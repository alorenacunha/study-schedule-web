export const brandProvidersParameters = {
  pagination: {
    _limit: 10,
    _start: 0,
    pageSize: 5,
    count: 100,
  },
  setPagination: jest.fn(),
  brands: [
    {
      id: 2,
      name: 'skin care',
      external_id: 4321,
    },
  ],
  setBrands: jest.fn(),
  loading: false,
  setLoading: jest.fn(),
  currentBrand: null,
  setCurrentBrand: jest.fn(),
  openCreateForm: false,
  setOpenCreateFormModal: jest.fn(),
  openDeleteDialog: false,
  setOpenDeleteDialog: jest.fn(),
  searchValue: '',
  setSearchValue: jest.fn(),
};
