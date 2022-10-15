import { useState } from 'react';
import { InfoObject } from '../../models/infoObject.interface';
import FilterInputComponent from './FilterInput.component';

export interface FilterInputProps {
  options?: Array<any>;
  optionLabel?: string;
  name: string;
  label: string;
  type?: string;
}

export interface Props extends FilterInputProps {
  onFilterChanged: (value) => void;
}

const FilterInput: React.FC<Props> = (props): JSX.Element => {
  const { onFilterChanged } = props;
  const [selectedDate, setDateChange] = useState<Date | null>(new Date());
  const [selectedValue, setSelectChange] = useState<InfoObject | null>(null);

  const handleDateChange = (event: any) => {
    if (!event.isValid) return;
    setDateChange(event);
    onFilterChanged(event);
  };

  const handleSelectChange = (item: InfoObject) => {
    setSelectChange(item);
    onFilterChanged(item);
  };

  return (
    <FilterInputComponent
      {...{
        selectedDate,
        selectedValue,
        handleDateChange,
        handleSelectChange,
      }}
      {...(props as FilterInputProps)}
    />
  );
};

export default FilterInput;
