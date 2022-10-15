import { ChangeEvent } from 'react';
import SearchInputComponent from './SearchInput.component';

export interface ISearch {
  value: string;
  handleSearchChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const SearchInput: React.FC<ISearch> = (props): JSX.Element => {
  return <SearchInputComponent {...(props as ISearch)} />;
};

export default SearchInput;
