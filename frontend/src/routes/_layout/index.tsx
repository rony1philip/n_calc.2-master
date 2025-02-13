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
  Center,
} from "@chakra-ui/react";
import PatientRegisterForm from "../../components/Common/PatientRegisterForm";
import PatientsManagement from "../../components/Common/PatientsData";
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import Logo from "/assets/images/n.png";
import useAuth from "../../hooks/useAuth";
import { useRef, useState } from "react";
import Combobox, { CreatableSelect } from "../../components/Common/ComboBox";
export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const finalRef = useRef(null);
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
             <Box pt={0} m={4} width="74%">
            <FormControl p={0}>
              <Box pt={0}>
                <Combobox
                  name="destination"
                  options={[
                    { value: "blue", label: "Blue", color: "#0052CC" },
                    { value: "purple", label: "Purple", color: "#5243AA" },
                    { value: "red", label: "Red", color: "#FF5630" },
                    { value: "orange", label: "Orange", color: "#FF8B00" },
                    { value: "yellow", label: "Yellow", color: "#FFC400" },
                    { value: "green", label: "Green", color: "#36B37E" },
                  ]}
                  placeholder="Patient Name"
                  closeMenuOnSelect={true}
                  size="lg"
                />
              </Box>
              <Center>
                <Button onClick={onOpen} variant="primary" type="submit">
                  {" "}
                  Subscribe
                </Button>
              </Center>
            </FormControl>
          </Box>
          </Flex>
        
            <PatientsManagement></PatientsManagement>
              
        </Box>
      </Container>
    </>
  );
}
