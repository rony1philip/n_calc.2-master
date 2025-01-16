import TableForm from "../../components/Common/TableForm";
import PhysicalMeasures from "../../components/Common/PhysicalMeasures";
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
  Grid,
  GridItem,
  FormControl,
  
} from "@chakra-ui/react";
import PhysicalMeasuresF from "../../components/Common/PhysicalMeasures";
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

      <FormControl>
      <Container padding={"5%"} maxWidth={"80%"} centerContent={true}>
       <PhysicalMeasuresF></PhysicalMeasuresF>
        <Box padding={"15px"}>
          <TableForm></TableForm>
        </Box>
      </Container></FormControl>

    </>
  );
}
