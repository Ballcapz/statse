import Head from "next/head";
import { Button } from "@mantine/core";
import { SDropdown } from "../components/SDropdown";
import { STextInput } from "../components/STextInput";
import { SButtonMenu } from "../components/SButtonMenu";
import { useState } from "react";
import { SDrawer } from "../components/SDrawer";
import { SDataCollection } from "../components/SDataCollection";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Stats</title>
        <meta name="description" content="stat things" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: "100vh" }}>
        <Button variant="filled">Testing 123</Button>

        <SDropdown
          label="player"
          options={["one", "two"]}
          setValue={(v) => null}
          value={"one"}
        />

        <STextInput label="hi" setValue={(v) => null} value={""} />

        <SDataCollection />
      </main>
    </>
  );
}
