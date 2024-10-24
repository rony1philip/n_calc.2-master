import TableForm from "../../components/Common/TableForm";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Heading,
  Stack,
  StackDivider,
  Text,
  Center,
  Container,
} from "@chakra-ui/react";
export const Route = createFileRoute("/_layout/patient-intake")({
  component: PatientIntake,
});

function PatientIntake() {
  return (
    <>
      <Container maxWidth={"80%"}>
        
          
            <Card width={"100%"}>
              <CardHeader>
                <Heading size="md">Client Report</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Summary
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      View a summary of all your clients over the last month.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Overview
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Check out the overview of your clients.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Analysis
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      See a detailed analysis of all your business clients.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
              </Card>
              <Box padding={"15px"}>
            <TableForm ></TableForm></Box>
        
      </Container>
    </>
  );
}
