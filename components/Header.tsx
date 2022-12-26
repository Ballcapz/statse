import { Button, Flex, Title } from "@mantine/core";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

type HeaderProps = {
  session: Session | null;
};

export function Header({ session }: HeaderProps) {
  return (
    <Flex
      gap="md"
      justify="space-between"
      align="center"
      direction="row"
      wrap="wrap"
      p={12}
    >
      <Title order={1}>Stat Chekr</Title>

      {session ? (
        <Button onClick={() => signOut()} variant="filled">
          Sign out
        </Button>
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </Flex>
  );
}
