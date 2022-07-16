import { Select } from '@mantine/core';

type SelectComponentProps={
    label: string;
    placeholder?: string;
    data: string[];
    required?: boolean;
    value?: any;
    handleChange?: (e: any) => void;
    description?: string;
    className?: any;
}

const SelectComponent = (props: SelectComponentProps) => {

    const {label, placeholder, data, value, handleChange, required, description, className } = props;
    return (
      <Select
        label={label}
        placeholder={placeholder ? placeholder : ''}
        searchable
        nothingFound="No options"
        required={!!required ? required : false}
        data={data}
        value={value} 
        description={description ?? description}
        onChange={handleChange}
        className={className ?? className }
      />
    );
  }

export default SelectComponent;