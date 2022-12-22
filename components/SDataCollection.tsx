import { useState } from "react";
import { NewDrillForm } from "./forms/NewDrillForm";
import { NewPlayerForm } from "./forms/NewPlayerForm";
import { NewStatForm } from "./forms/NewStatForm";
import { SButtonMenu } from "./SButtonMenu";
import { SDrawer } from "./SDrawer";

export function SDataCollection() {
  const [newPlayerOpen, setNewPlayerOpen] = useState(false);
  const [newDrillOpen, setNewDrillOpen] = useState(false);
  const [newStatOpen, setNewStatOpen] = useState(false);
  const [newSingleStatOpen, setNewSingleStatOpen] = useState(false);

  const menuOptions = [
    {
      value: "Add Player",
      clickAction: () => {
        setNewPlayerOpen(true);
      },
    },
    {
      value: "Add Drill",
      clickAction: () => {
        setNewDrillOpen(true);
      },
    },
    {
      value: "Add Stat",
      clickAction: () => {
        setNewStatOpen(true);
      },
    },
    {
      value: "Add Single Stat",
      clickAction: () => {
        setNewSingleStatOpen(true);
      },
    },
  ];

  return (
    <>
      <SButtonMenu title="Add New" options={menuOptions} />

      <SDrawer opened={newPlayerOpen} setOpened={setNewPlayerOpen}>
        <NewPlayerForm afterSubmitSuccess={() => null} />
      </SDrawer>

      <SDrawer opened={newDrillOpen} setOpened={setNewDrillOpen}>
        <NewDrillForm afterSubmitSuccess={() => null} />
      </SDrawer>

      <SDrawer opened={newStatOpen} setOpened={setNewStatOpen}>
        <NewStatForm
          availableDrills={["stanford", "steph"]}
          availablePlayers={["me"]}
        />
      </SDrawer>
      <SDrawer opened={newSingleStatOpen} setOpened={setNewSingleStatOpen}>
        {/* <NewPlayerForm /> */}
      </SDrawer>
    </>
  );
}
