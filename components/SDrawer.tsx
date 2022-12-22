import { Drawer, ScrollArea } from "@mantine/core";

type SDrawerProps = {
  opened: boolean;
  setOpened: (b: boolean) => void;
  children: React.ReactNode;
};

export function SDrawer({ opened, setOpened, children }: SDrawerProps) {
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        size="xl"
        padding="sm"
        position="bottom"
      >
        <ScrollArea style={{ height: 400 }}>{children}</ScrollArea>
      </Drawer>
    </>
  );
}
