<Box
  bg={bgColor}
  p={3}
  h="100vh"
  position="sticky"
  top="0"
  display={{ base: "none", md: "flex" }}
>
  <Flex
    flexDir="column"
    justify="space-between"
    bg={secBgColor}
    p={4}
    borderRadius={12}
  >
    <Box>
      <Image src={Logo} alt="Logo" w="180px" maxW="2xs" p={6} />
      <SidebarItems />
    </Box>
    {currentUser?.email && (
      <Text color={textColor} noOfLines={2} fontSize="sm" p={2} maxW="180px">
        Logged in as: {currentUser.email}
      </Text>
    )}
  </Flex>
</Box>;
