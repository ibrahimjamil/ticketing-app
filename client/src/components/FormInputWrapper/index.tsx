import { InputWrapper, Input } from '@mantine/core';

type InputWrapperComponent = {
    label?: string;
    placeholder: string;
    name: string;
    register: any;
    description?: string;
    className?: any
    required?: boolean;
    error?: string;
}

const FormInputWrapperComponent = (props: InputWrapperComponent) =>  {
  const {
      label,
      register,
      name,
      placeholder,
      description,
      className,
      required,
      error
  } = props;

  return (
    <InputWrapper
      label={label}
      description={description ?? description}
      required={required ?? required}
      className={className ?? className}
      error={!!error ? error : ''}
    >
      <Input  placeholder={placeholder} {...register(name, { required: required })}/>
    </InputWrapper>
  );
}

export default FormInputWrapperComponent;