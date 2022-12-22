import { Box, Button, Group, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

type NewStatFormProps = {
  availableDrills: Array<string>;
  availablePlayers: Array<string>;
};

export function NewStatForm({
  availableDrills,
  availablePlayers,
}: NewStatFormProps) {
  const form = useForm({
    initialValues: {
      leftMakes: "",
      leftTakes: "",
      rightMakes: "",
      rightTakes: "",
      drill: "",
      player: "",
    },

    validate: {
      leftMakes: (value) => (value.length ? null : "Please enter left makes"),
      leftTakes: (value) => (value.length ? null : "Please enter left takes"),
      rightMakes: (value) => (value.length ? null : "Please enter right makes"),
      rightTakes: (value) => (value.length ? null : "Please enter right takes"),
      drill: (value) => (value.length ? null : "Please enter a drill"),
      player: (value) => (value.length ? null : "Please enter a player"),
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Select
          label="Drill"
          data={availableDrills}
          {...form.getInputProps("drill")}
        />
        <Select
          label="Player"
          data={availablePlayers}
          {...form.getInputProps("player")}
        />

        <TextInput label="Left makes" {...form.getInputProps("leftMakes")} />
        <TextInput label="Left takes" {...form.getInputProps("leftTakes")} />
        <TextInput label="Right makes" {...form.getInputProps("rightMakes")} />
        <TextInput label="Right takes" {...form.getInputProps("rightTakes")} />

        <Group position="center" mt="md">
          <Button variant="filled" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
