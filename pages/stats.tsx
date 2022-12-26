import { Center, Container, Flex } from "@mantine/core";
import { Stat } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SDropdown } from "../components/SDropdown";

const groupBy = function (xs: Array<any>, key: string) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default function Stats() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [drills, setDrills] = useState<Record<string, any> | null>(null);
  const [selectedDrill, setSelectedDrill] = useState("");

  const [shownStats, setShownStats] = useState<Array<Stat>>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [result] = await Promise.all([
        fetch("/api/stat")
          .then((d) => d.json())
          .then((r) => r)
          .catch((err) => console.log(err)),
      ]);

      console.log({ result });

      const d = groupBy(result, "drillName");

      console.log({ d });
      setDrills(d);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (drills && selectedDrill.length > 0) {
      console.log(drills[selectedDrill]);
      setShownStats(drills[selectedDrill]);
    }
  }, [selectedDrill]);

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  if (status === "loading" || loading || !drills) {
    return (
      <Center>
        <div>Loading...</div>
      </Center>
    );
  }

  return (
    <Container sx={{ minHeight: "90vh" }} pt={20}>
      <Flex
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Link
          href={"/"}
          style={{
            border: "1px solid green",
            borderRadius: "4px",
            padding: "12px",
            outline: "none",
          }}
        >
          Home
        </Link>
        <Link
          href="/api/stat/download"
          download={true}
          style={{
            border: "1px solid green",
            borderRadius: "4px",
            padding: "12px",
            outline: "none",
          }}
        >
          Download all stats
        </Link>
      </Flex>
      <SDropdown
        label="Show Stats For Drill"
        options={Object.keys(drills)}
        setValue={setSelectedDrill}
        value={selectedDrill}
      />
      <Flex
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
        pt={20}
        pb={20}
      >
        <span style={{ fontWeight: "600" }}>Left Makes</span>
        <span style={{ fontWeight: "600" }}>Left Takes</span>
        <span style={{ fontWeight: "600" }}>Right Makes</span>
        <span style={{ fontWeight: "600" }}>Right Takes</span>
        <span style={{ fontWeight: "600" }}>Single Makes</span>
        <span style={{ fontWeight: "600" }}>Single Takes</span>
      </Flex>
      <hr />
      {shownStats.length &&
        shownStats.map((stat) => (
          <Flex
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            key={stat.id}
          >
            <span>{stat.playerName}</span>
            <span>
              L: {stat.leftMakes ?? "-"} / {stat.leftTakes ?? "-"}
            </span>
            <span>
              R: {stat.rightMakes ?? "-"} / {stat.rightTakes ?? "-"}
            </span>
            <span>
              S: {stat.singleMakes ?? "-"} / {stat.singleTakes ?? "-"}
            </span>
          </Flex>
        ))}
    </Container>
  );
}
