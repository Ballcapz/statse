import Head from "next/head";
import { Button } from "@mantine/core";
import { SDropdown } from "../components/SDropdown";
import { STextInput } from "../components/STextInput";
import { SButtonMenu } from "../components/SButtonMenu";
import { useState } from "react";
import { SDrawer } from "../components/SDrawer";
import { SDataCollection } from "../components/SDataCollection";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Head>
          <title>Stats</title>
          <meta name="description" content="stat things" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main style={{ height: "100vh", padding: "0 10px" }}>
          <header>
            <Button onClick={() => signOut()} variant="filled">
              Sign out
            </Button>
          </header>

          <SDropdown
            label="player"
            options={["one", "two"]}
            setValue={(v) => null}
            value={"one"}
          />

          <STextInput label="hi" setValue={(v) => null} value={""} />

          <SDataCollection session={session} />
        </main>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <Head>
          <title>Stats</title>
          <meta name="description" content="stat things" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main style={{ height: "100vh" }}>
          <Button onClick={() => signIn()}>Sign In</Button>
        </main>
      </>
    );
  }
}
