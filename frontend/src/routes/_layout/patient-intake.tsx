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
      <Container padding={"5%"} maxWidth={"80%"}>
        <Card width={"80%"}>
          <CardHeader>
            <Heading size="md">Client Report</Heading>
          </CardHeader>

          <CardBody></CardBody>
        </Card>
        <Box padding={"15px"}>
          <TableForm></TableForm>
        </Box>
      </Container>
    </>
  );
}
