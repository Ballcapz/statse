import { Box, Button, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

type NewPlayerFormProps = {
  afterSubmitSuccess: () => void;
};

export function NewPlayerForm({ afterSubmitSuccess }: NewPlayerFormProps) {
  const form = useForm({
    initialValues: {
      name: "",
      number: "",
    },

    validate: {
      name: (value) => (value.length ? null : "Please enter a name"),
      number: (value) =>
        Number(value) > -1 && Number(value) < 56 && value.length
          ? null
          : "Please enter a valid number",
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Title order={4}>Add a Player</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput label="Player name" {...form.getInputProps("name")} />
        <TextInput label="Player number" {...form.getInputProps("number")} />

        <Group position="center" mt="md">
          <Button variant="filled" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
