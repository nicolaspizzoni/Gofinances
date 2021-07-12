import React from "react";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { Container, Error } from "./styles";
import { Input } from "../Input";

interface Props extends TextInputProps {
    name: string;
    control: Control;
    error: string;
}

export function InputForm({ name, control, error, ...rest }: Props) {
  return (
    <Container>
      <Controller
        name={name} //name do input, para diferenciar
        control={control} //control para identificar o form
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      { error && <Error>{error}</Error>}
    </Container>
  );
}
