import { Button, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";

type SButtonMenuProps = {
  title: string;
  options: Array<{ value: string; clickAction: () => void }>;
};

export function SButtonMenu({ options, title }: SButtonMenuProps) {
  return (
    <Menu
      transition="pop-bottom-right"
      position="bottom-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <Button rightIcon={<IconChevronDown size={18} stroke={1.5} />} pr={12}>
          {title}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {options.map((option, i) => (
          <Menu.Item key={i} component="button" onClick={option.clickAction}>
            {option.value}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
