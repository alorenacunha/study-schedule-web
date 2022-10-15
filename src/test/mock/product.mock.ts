export const productProvidersParameters = {
  pagination: {
    _limit: 10,
    _start: 0,
    pageSize: 5,
    count: 100,
  },
  setPagination: jest.fn(),
  products: [
    {
      id: 8,
      name: 'moisturizer',
      external_id: 63457,
      category: {
        id: 2,
        name: 'skin care',
        external_id: 4321,
      },
      brand: {
        id: 2,
        name: 'sallve',
        external_id: 5432,
      },
      price: 45,
      margin: 35,
    },
  ],
  setProducts: jest.fn(),
  brands: [
    {
      id: 2,
      name: 'salve',
      external_id: 5432,
    },
  ],
  setBrands: jest.fn(),
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
  currentProduct: {},
  setCurrentProduct: jest.fn(),
  openCreateForm: false,
  setOpenCreateFormModal: jest.fn(),
  openDeleteDialog: false,
  setOpenDeleteDialog: jest.fn(),
  searchValue: '',
  setSearchValue: jest.fn(),
};
