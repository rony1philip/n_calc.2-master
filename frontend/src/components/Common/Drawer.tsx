import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import Logo from "/assets/images/n_c.png";
import type { UserPublic } from "../../client";
import useAuth from "../../hooks/useAuth";
import SidebarItems from "./SidebarItems";

const Drawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const queryClient = useQueryClient();
  const textColor = useColorModeValue("ui.dark", "ui.light");
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);
  const { logout } = useAuth();
  const handleLogout = async () => {
    logout();
  };

  return (
    <>
      {/* Desktop */}
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"#edf2f7"}>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex flexDir="column" justify="space-between">
              <Box>
                <Image src={Logo} alt="logo" p={6} />
                <SidebarItems onClose={onClose} />
                <Flex
                  as="button"
                  onClick={handleLogout}
                  p={2}
                  color="ui.danger"
                  fontWeight="bold"
                  alignItems="center"
                >
                  <FiLogOut />
                  <Text ml={2}>Log out</Text>
                </Flex>
              </Box>
              {currentUser?.email && (
                <Text color={textColor} noOfLines={2} fontSize="sm" p={2}>
                  Logged in as: {currentUser.email}
                </Text>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Drawer;
