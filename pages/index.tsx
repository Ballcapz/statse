import Head from "next/head";
import { Button, Center, Container, Flex, Stack, Title } from "@mantine/core";
import { SDataCollection } from "../components/SDataCollection";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Header } from "../components/Header";
import { SFileUpload } from "../components/SFileUpload";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Center>
        <div>Loading...</div>
      </Center>
    );
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Stats</title>
          <meta name="description" content="stat things" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header session={session} />
        <Container pt={10}>
          <Stack align="center" mt={24} spacing="xl">
            <SDataCollection />
            <Link
              href={"/stats"}
              style={{
                border: "1px solid green",
                borderRadius: "4px",
                padding: "12px",
                outline: "none",
              }}
            >
              See Stats
            </Link>

            <SFileUpload importType="player" />
            <SFileUpload importType="drill" />
          </Stack>
        </Container>
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
        <Container>
          <Header session={session} />
        </Container>
      </>
    );
  }
}
