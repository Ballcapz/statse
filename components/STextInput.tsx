import { TextInput } from "@mantine/core";
import { useStyles } from "./inputStyle";

type STextInputProps = {
  label: string;
  value: string;
  setValue: (v: string) => void;
};

export function STextInput({ label, value, setValue }: STextInputProps) {
  const { classes } = useStyles();

  return (
    <TextInput
      label={label}
      classNames={classes}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
