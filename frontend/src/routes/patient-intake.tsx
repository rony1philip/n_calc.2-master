import TableForm from "../components/Common/TableForm";
import PhysicalMeasures from "../components/Common/PhysicalMeasures";
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
import PhysicalMeasuresF from "../components/Common/PhysicalMeasures";
export const Route = createFileRoute("/patient-intake")({
  component: PatientIntake,
});

function PatientIntake() {
  return (
    <>
      <FormControl>
        <Container padding={"5%"} maxWidth={"80%"} centerContent={true}>
          <PhysicalMeasuresF></PhysicalMeasuresF>
          <Box padding={"15px"}>
            <TableForm></TableForm>
          </Box>
        </Container>
      </FormControl>
    </>
  );
}
