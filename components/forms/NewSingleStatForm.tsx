import { Box, Button, Group, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Stat } from "@prisma/client";
import { Session } from "next-auth";
import { useState } from "react";

type NewStatFormProps = {
  availableDrills: Array<string>;
  availablePlayers: Array<string>;
  afterSubmitSuccess: (s: Stat) => void;
  session: Session;
};

export function NewSingleStatForm({
  availableDrills,
  availablePlayers,
  afterSubmitSuccess,
  session,
}: NewStatFormProps) {
  const [selectedDrill, setSelectedDrill] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const form = useForm({
    initialValues: {
      singleMakes: "",
      singleTakes: "",
    },

    validate: {
      singleMakes: (value) => (value.length ? null : "Please enter makes"),
      singleTakes: (value) => (value.length ? null : "Please enter takes"),
    },
  });

  async function createStat(
    singleMakes: string,
    singleTakes: string,
    drill: string,
    player: string
  ) {
    fetch("/api/stat/single", {
      method: "POST",
      body: JSON.stringify({
        singleMakes,
        singleTakes,
        drillName: drill,
        playerName: player,
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
      <form
        onSubmit={form.onSubmit(async (values) => {
          await createStat(
            values.singleMakes,
            values.singleTakes,
            selectedDrill,
            selectedPlayer
          );
        })}
      >
        <Select
          data={availableDrills}
          label="Drill"
          value={selectedDrill}
          onChange={(value: string) => setSelectedDrill(value)}
        />
        <Select
          label="Player"
          data={availablePlayers}
          value={selectedPlayer}
          onChange={(value: string) => setSelectedPlayer(value)}
        />

        <TextInput label="Makes" {...form.getInputProps("singleMakes")} />
        <TextInput label="Takes" {...form.getInputProps("singleTakes")} />

        <Group position="center" mt="md">
          <Button variant="filled" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
