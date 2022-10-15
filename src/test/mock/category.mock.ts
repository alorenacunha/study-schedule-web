export const categoryProvidersParameters = {
  pagination: {
    _limit: 10,
    _start: 0,
    pageSize: 5,
    count: 100,
  },
  setPagination: jest.fn(),
  categories: [
    {
      id: 2,
      name: 'skin care',
      external_id: 4321,
    },
  ],
  setCategories: jest.fn(),
  loading: false,
  setLoading: jest.fn(),
  currentCategory: null,
  setCurrentCategory: jest.fn(),
  openCreateForm: false,
  setOpenCreateFormModal: jest.fn(),
  openDeleteDialog: false,
  setOpenDeleteDialog: jest.fn(),
  searchValue: '',
  setSearchValue: jest.fn(),
};
