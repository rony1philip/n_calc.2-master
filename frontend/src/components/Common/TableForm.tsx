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
            variant="outline"
            width={"80px"}
            borderRadius={"7"}
            borderColor={"green.50"}
            border={"2px"}
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
          <GridItem rowSpan={1} colSpan={1}>
            <Input
              boxSize={"small"}
              width={"50%"}
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
      <FormControl>
        <TableContainer borderRadius={"14"} border={"2px"} borderColor={"green.200"}>
          <Table
            justifyContent={"center"}
           
            color="green.200"
            size="l"
            fontSize="small"
            
            
          >
            <Thead>
              <Center>
                <Text justifyContent={"center"} fontSize={"xxx-large"}>
                  TABLE
                </Text>
              </Center>
              <Tr>{Days.map(THead)}</Tr>
            </Thead>
            <Tbody>{mills.map(TRow)}</Tbody>
          </Table>
        </TableContainer>
        ;
      </FormControl>
    </>
  );
}
export default TableForm;
