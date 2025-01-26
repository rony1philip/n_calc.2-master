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
  Flex
  
} from "@chakra-ui/react";
import PhysicalMeasuresF from "../../components/Common/PhysicalMeasures";
export const Route = createFileRoute("/_layout/patient-intake")({
  component: PatientIntake,
});

function PatientIntake() {
  return (
    <>

    <Box paddingLeft={19}>
     <PhysicalMeasuresF></PhysicalMeasuresF>
          <PhysicalMeasuresF></PhysicalMeasuresF>
        </Box>
        <Box>
    <TableForm></TableForm></Box>
     
       
  

      
  

    </>
  )
}
