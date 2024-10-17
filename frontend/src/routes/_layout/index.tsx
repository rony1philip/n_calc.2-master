import {
  Input,
  Box,
  Container,
  Text,
  InputGroup,
  InputRightElement,
  Flex,
  Image,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { createFileRoute } from "@tanstack/react-router";
import Logo from "/assets/images/n.png";
import useAuth from "../../hooks/useAuth";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: currentUser } = useAuth();

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontFamily="cursive" borderColor="#009688" fontSize="4xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text
            paddingBottom={"20%"}
            fontFamily="cursive"
            borderColor="#009688"
            fontSize="2xl"
          >
            Welcome back, nice to see you again!
          </Text>
          <Flex justify={"center"}>
            <Image
              src={Logo}
              alt="logo"
              height="auto"
              maxW="2xs"
              alignSelf="center"
              mb={4}
            />
          </Flex>
          <Flex justify="center">
            <InputGroup
              display={"flex"}
              justifyItems={"center"}
              width={"80%"}
              bgColor={"white"}
              borderColor="#009688"
              justifyContent={"center"}
            >
              <InputRightElement >
                <IconButton
                  variant="primary"
                  onClick={() => {
                    console.log("clicked");
                  }}
                  aria-label="Search database"
                  icon={<Search2Icon color="white" />}
                />
              </InputRightElement>
              <Input
                fontFamily={"cursive"}
                fontSize={"large"}
                type="tel"
                placeholder="Phone number"
              />
            </InputGroup>
          </Flex>
        </Box>
      </Container>
    </>
  );
}
