import Head from "next/head";
import { Button, Center, Container, Flex, Stack, Title } from "@mantine/core";
import { SDataCollection } from "../components/SDataCollection";
import { signIn, signOut, useSession } from "next-auth/react";

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
        <Container pt={10}>
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Button onClick={() => signOut()} variant="filled">
              Sign out
            </Button>
          </Flex>

          <Stack
            align="center"
            mt={24}
            spacing="xl"
            sx={{ borderTop: "1px solid black" }}
          >
            <Title order={1}>Stats E</Title>
            <SDataCollection />
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
          <Button onClick={() => signIn()}>Sign In</Button>
        </Container>
      </>
    );
  }
}
