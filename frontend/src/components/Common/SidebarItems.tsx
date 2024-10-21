import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Image,
  Container
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import {
  FiBriefcase,
  FiHome,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import Logo from "../../../public/assets/images/n_c.png";
import type { UserPublic } from "../../client"
const items = [
  { icon: FiHome, title: "Dashboard", path: "/",},
  { icon: FiBriefcase, title: "Items", path: "/items",},
  {
    icon: FiSettings,
    title: "User Settings",
    path: "/settings",
   
  },
  
];

interface SidebarItemsProps {
  onClose?: () => void
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const queryClient = useQueryClient()
  const textColor = useColorModeValue("ui.main", "ui.light")
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568")
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const finalItems = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: "Admin", path: "/admin" }]
    : items

  const listItems = finalItems.map(({ icon, title, path }) => (
    <Flex
      
      as={Link}
      to={path}
      w="100%"
      p={2}
      key={title}
      activeProps={{
        style: {
          background: bgActive,
        },
      }}
      color={textColor}
      onClick={onClose}
    >
      <Text fontFamily="cursive" fontSize={"large"} ml={2}>
        <Icon as={icon}></Icon>
        {" " + title}
      </Text>
    </Flex>
  ));

  return (
    <>
      <Box >
        <Container>
          <Image maxW={200} maxH={200} src={Logo} alt="logo" p={6} />
        </Container>
        {listItems}
      </Box>
    </>
  );
}

export default SidebarItems
