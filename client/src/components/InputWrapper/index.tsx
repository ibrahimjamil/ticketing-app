import { InputWrapper, Input } from '@mantine/core';

type InputWrapperComponent = {
    label: string;
    error?: string;
    required: boolean;
    description?: string;
    placeholder: string;
    value: string;
    handleChange: any;
}

const InputWrapperComponent = (props: InputWrapperComponent) =>  {
  const {
      label,
      error,
      value,
      handleChange,
      required,
      description,
      placeholder,
  } = props;

  return (
    <InputWrapper
      id="input-demo"
      required={required}
      label={label}
      description={description ? description : ''}
      error={error ? error : ''}
    >
      <Input id="input-demo" placeholder={placeholder} value={value} onChange={handleChange}/>
    </InputWrapper>
  );
}

export default InputWrapperComponent;