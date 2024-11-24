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

import { Search2Icon } from "@chakra-ui/icons";
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import Logo from "/assets/images/n.png";
import useAuth from "../../hooks/useAuth";
import { useRef } from "react";
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
              <ModalHeader>Register Patient</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <Text>Patient Name</Text>
                  <Input type="tel" placeholder="Patient Name" />
                  <Text>Patient Phon Number</Text>
                  <Input type="tel" placeholder="Phone number" />
                  <Text>Patient Id</Text>
                  <Input type="tel" placeholder="Patient Id" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>

                <Link type="submit" as={RouterLink} to="/patient-intake">
                  <Button variant="primary">Patient Intake</Button>
                </Link>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Container>
    </>
  );
}
