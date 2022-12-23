import { Box, Button, Group, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Drill } from "@prisma/client";
import { Session } from "next-auth";

type NewDrillFormProps = {
  afterSubmitSuccess: (d: Drill) => void;
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

  async function createDrill(name: string) {
    fetch("/api/drill", {
      method: "POST",
      body: JSON.stringify({
        name,
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
      <Title order={4}>Add a Drill</Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          await createDrill(values.name);
        })}
      >
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
