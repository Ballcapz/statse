import { Select } from "@mantine/core";
import { useStyles } from "./inputStyle";

type SDropdownProps = {
  label: string;
  options: Array<string>;
  value: string | null;
  setValue: (value: string) => void;
};

export function SDropdown({ options, value, setValue, label }: SDropdownProps) {
  const { classes } = useStyles();

  return (
    <>
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={options}
        label={label}
        classNames={classes}
        value={value}
        onChange={setValue}
      />
    </>
  );
}
