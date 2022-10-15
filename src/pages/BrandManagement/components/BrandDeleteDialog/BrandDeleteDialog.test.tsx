import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '../../../../test/setup/brand-setup';
import BrandDeleteDialog from '.';
import { t } from 'i18next';
import { brandProvidersParameters } from '../../../../test/mock/brand.mock';
import { BrandContext, BrandContextData } from '../../../../context/brand';

afterEach(cleanup);

const init = () => {
  const params = {
    handleDeleteDialogClose: jest.fn(),
  };
  const providersParameters = {
    ...brandProvidersParameters,
    openDeleteDialog: true,
  };
  const util = render(
    <BrandContext.Provider value={{ ...(providersParameters as BrandContextData) }}>
      <BrandDeleteDialog {...params} />
    </BrandContext.Provider>,
  );
  return util;
};

describe('<BrandDeleteDialog />', () => {
  it('renders without crashing', () => {
    init();
  });
  it('shows brand on title', () => {
    let util = init();

    const title = util.getByLabelText('delete-dialog-title', { selector: 'div' });

    expect(title).toHaveTextContent(t('brand'));
  });
});
