import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Container,
  InputGroup,
  InputRightElement,
  Flex,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Link,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import PatientRegisterForm from "../../components/Common/PatientRegisterForm";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import Logo from "/assets/images/n.png";
import useAuth from "../../hooks/useAuth";
import { useRef, useState } from "react";
export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontFamily="cursive" borderColor="#009688" fontSize="4xl">
            Hi, {currentUser?.full_name || currentUser?.id} 👋🏼
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
              <InputRightElement>
                <IconButton
                  variant="primary"
                  onClick={onOpen}
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
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <PatientRegisterForm></PatientRegisterForm>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Container>
    </>
  );
}
