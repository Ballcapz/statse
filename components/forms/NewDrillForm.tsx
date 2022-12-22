import { Box, Button, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

type NewDrillFormProps = {
  afterSubmitSuccess: () => void;
};

export function NewDrillForm({ afterSubmitSuccess }: NewDrillFormProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (value.length ? null : "Please enter a drill"),
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Title order={4}>Add a Drill</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput label="Drill name" {...form.getInputProps("name")} />

        <Group position="center" mt="md">
          <Button variant="filled" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
