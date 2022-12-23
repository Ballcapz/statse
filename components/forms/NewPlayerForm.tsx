import { Box, Button, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Player } from "@prisma/client";
import { Session } from "next-auth";

type NewPlayerFormProps = {
  afterSubmitSuccess: (p: Player) => void;
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

  async function createPlayer(name: string, number: string) {
    fetch("/api/player", {
      method: "POST",
      body: JSON.stringify({
        name,
        number,
      }),
    })
      .then((d) => d.json())
      .then((r) => {
        if (r.error_code) {
          return;
        } else {
          afterSubmitSuccess(r);
        }
      })
      .catch((e) => console.error("error", e));
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Title order={4}>Add a Player</Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          await createPlayer(values.name, values.number);
        })}
      >
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
