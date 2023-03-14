import { useCallback } from "react";
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/select";
import styled from "@emotion/styled";

const Option = styled.option`
  color: black;
  background: lightgrey;
`;

type SelectProps<T extends string> = {
  onChange: (selected: T) => void;
  items: { label: string; value: T }[];
  value: T | undefined;
} & Omit<ChakraSelectProps, "onChange" | "value">;

export function Select<T extends string>({
  onChange,
  value,
  items,
  ...rest
}: SelectProps<T>) {
  const onChangeSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value as T;
      onChange(value);
    },
    [onChange]
  );

  return (
    <ChakraSelect onChange={onChangeSelect} value={value} {...rest}>
      {items.map((item) => {
        return (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        );
      })}
    </ChakraSelect>
  );
}
