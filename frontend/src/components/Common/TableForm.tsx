import {
  FormControl,
  Center,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Textarea,
  Input,
  TableCaption,
  Text,
  TableContainer,
  Grid,
  GridItem,
  Card,
  Container,
} from "@chakra-ui/react";

function TableForm() {
  const mills = [1, 2, 3, 4, 5, 6, 7];
  const Days = [
    "mill Type",
    "sunday",
    "monday",
    "Tuesday",
    "forday",
    "fifthday",
    "bla",
    "bla",
  ];
  function THead(day: string) {
    return (
      <Th
        borderColor={"green.200"}
        textAlign="center"
        fontWeight="bold"
        fontSize={"large"}
        fontFamily={"cursive"}
        padding={"10px"}
      >
        {day}
      </Th>
    );
  }
  function InputMill(mill: number) {
    return (
      <Td padding={"8px"} borderColor={"green.200"} justifyContent={"center"}>
        <Center>
          <Textarea
            boxShadow="md"
            background={"#FAF7F0"}
            variant="outline"
            width={"80px"}
            borderRadius={"7"}
            borderColor={"black"}
            border={"0px"}
            fontSize={"xx-small"}
          ></Textarea>
        </Center>
      </Td>
    );
  }
  function TRow(mill: number) {
    return (
      <Tr borderColor={"green.200"}>
        <Th borderColor={"green.200"} textAlign="center" fontWeight="bold">
          <GridItem rowSpan={1} colSpan={1}>
            {mill}
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            <Input
              boxShadow="md"
              background={"antiquewhite"}
              boxSize={"small"}
              width={"55%"}
              variant={"outline"}
              size="md"
              type="time"
            />
          </GridItem>
        </Th>
        {mills.map(InputMill)}
      </Tr>
    );
  }

  return (
    <>
      <Card boxShadow="dark-lg" borderRadius={"14"}>
        <TableContainer
          borderRadius={"14"}
          border={"2px"}
          borderColor={"green.200"}
        >
          <Table
            justifyContent={"center"}
            background={"antiquewhite"}
            color="green.200"
            size="l"
            fontSize="small"
          >
            <Thead>
              <Container centerContent={true}>
                <Text
                  textShadow="1px 1px grey"
                  m="6"
                  textAlign={"center"}
                  fontSize={"xxx-large"}
                >
                  TABLE
                </Text>
              </Container>
              <Tr>{Days.map(THead)}</Tr>
            </Thead>
            <Tbody>{mills.map(TRow)}</Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
export default TableForm;
