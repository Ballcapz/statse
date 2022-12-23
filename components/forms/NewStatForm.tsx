import { Box, Button, Group, Select, TextInput, Title } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { Stat } from "@prisma/client";
import { Session } from "next-auth";
import { useState } from "react";
import { SDropdown } from "../SDropdown";

type NewStatFormProps = {
  availableDrills: Array<string>;
  availablePlayers: Array<string>;
  afterSubmitSuccess: (s: Stat) => void;
  session: Session;
};

export function NewStatForm({
  availableDrills,
  availablePlayers,
  afterSubmitSuccess,
  session,
}: NewStatFormProps) {
  const [selectedDrill, setSelectedDrill] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const form = useForm({
    initialValues: {
      leftMakes: "",
      leftTakes: "",
      rightMakes: "",
      rightTakes: "",
    },

    validate: {
      leftMakes: (value) => (value.length ? null : "Please enter left makes"),
      leftTakes: (value) => (value.length ? null : "Please enter left takes"),
      rightMakes: (value) => (value.length ? null : "Please enter right makes"),
      rightTakes: (value) => (value.length ? null : "Please enter right takes"),
    },
  });

  async function createStat(
    leftMakes: string,
    leftTakes: string,
    rightMakes: string,
    rightTakes: string,
    drill: string,
    player: string
  ) {
    fetch("/api/stat/both", {
      method: "POST",
      body: JSON.stringify({
        leftMakes,
        leftTakes,
        rightMakes,
        rightTakes,
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
            values.leftMakes,
            values.leftTakes,
            values.rightMakes,
            values.rightTakes,
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
