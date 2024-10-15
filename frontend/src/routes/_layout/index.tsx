import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import useAuth from "../../hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontFamily="cursive" borderColor="#009688" fontSize="4xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text fontFamily="cursive" borderColor="#009688" fontSize="2xl">
            Welcome back, nice to see you again!
          </Text>
        </Box>
      </Container>
    </>
  );
}
