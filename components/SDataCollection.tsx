import { Drill, Player } from "@prisma/client";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { NewDrillForm } from "./forms/NewDrillForm";
import { NewPlayerForm } from "./forms/NewPlayerForm";
import { NewSingleStatForm } from "./forms/NewSingleStatForm";
import { NewStatForm } from "./forms/NewStatForm";
import { SButtonMenu } from "./SButtonMenu";
import { SDrawer } from "./SDrawer";

export function SDataCollection({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
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

  const [drills, setDrills] = useState<Array<Drill>>([]);
  const [players, setPlayers] = useState<Array<Player>>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [d, p] = await Promise.all([
        fetch("/api/drill")
          .then((d) => d.json())
          .then((r) => r)
          .catch((err) => console.error(err)),
        fetch("/api/player")
          .then((d) => d.json())
          .then((r) => r)
          .catch((err) => console.error(err)),
      ]);

      console.log({ d });
      console.log({ p });

      setDrills(d);
      setPlayers(p);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SButtonMenu title="Add New" options={menuOptions} />
      )}

      <SDrawer opened={newPlayerOpen} setOpened={setNewPlayerOpen}>
        <NewPlayerForm
          afterSubmitSuccess={(p) => {
            console.log({ p });
            setPlayers((prev) => [...prev, p]);
            setNewPlayerOpen(false);
          }}
          session={session}
        />
      </SDrawer>

      <SDrawer opened={newDrillOpen} setOpened={setNewDrillOpen}>
        <NewDrillForm
          afterSubmitSuccess={(d) => {
            console.log({ d });
            setDrills((prev) => [...prev, d]);
            setNewDrillOpen(false);
          }}
          session={session}
        />
      </SDrawer>

      <SDrawer opened={newStatOpen} setOpened={setNewStatOpen}>
        <NewStatForm
          availableDrills={drills.map((drill) => drill.name)}
          availablePlayers={players.map((player) => player.name)}
          afterSubmitSuccess={(s) => {
            console.log({ s });
            setNewStatOpen(false);
          }}
          session={session}
        />
      </SDrawer>
      <SDrawer opened={newSingleStatOpen} setOpened={setNewSingleStatOpen}>
        <NewSingleStatForm
          availableDrills={drills.map((drill) => drill.name)}
          availablePlayers={players.map((player) => player.name)}
          afterSubmitSuccess={(s) => {
            console.log({ s });
            setNewSingleStatOpen(false);
          }}
          session={session}
        />
      </SDrawer>
    </>
  );
}
