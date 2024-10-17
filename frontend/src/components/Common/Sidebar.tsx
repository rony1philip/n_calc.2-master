import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  DrawerHeader,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query"
import { FiLogOut, FiMenu } from "react-icons/fi"
import React, { Component } from 'react'
import Logo from "/assets/images/n_c.png"
import type { UserPublic } from "../../client"
import useAuth from "../../hooks/useAuth"

import { Example } from "../Sidebar/FullSidebar";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const queryClient = useQueryClient();
  const bgColor = useColorModeValue("ui.light", "ui.dark");
  const textColor = useColorModeValue("ui.dark", "ui.light");
  const secBgColor = useColorModeValue("ui.secondary", "ui.darkSlate");
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);
  const { logout } = useAuth();
  const handleLogout = async () => {
    logout();
  };

  return (
    <>
      {/* Mobile */}
      <IconButton
        onClick={onOpen}
        display={{ base: "flex", md: "none" }}
        aria-label="Open Menu"
        position="absolute"
        fontSize="20px"
        m={4}
        icon={<FiMenu />}
      />
      
      {/* Desktop */}

    </>
  );
}

export default Sidebar
