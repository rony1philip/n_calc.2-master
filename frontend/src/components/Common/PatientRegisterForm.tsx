import { useState } from "react";
import {
  Link,
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  
  FormErrorMessage,
  FormHelperText,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
 
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import { useToast } from "@chakra-ui/react";




export default function PatientRegisterForm() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50.50);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    emailAutoFocus: false,
    firstName: "",
    firstNameAutoFocus: false,
    lastName: "",
    lastNameAutoFocus: false,
    phoneNumber: "",
    phoneNumberAutoFocus: false,
    gender: "",
    genderAutoFocus: false,
    birthDate: "",
    birthDateAutoFocus: false,
    about: "",
    aboutAutoFocus: false,
  });

  const isFormInvalid = () => {
    const isEmail = (email: string) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const isPhone = (phoneNumber: string) => 
      /^[0-9]*$/g.test(phoneNumber)
    const notHeveInput = formData.firstName == "" || formData.lastName == ""
    if (notHeveInput || isEmail(formData.email) == false || isPhone(formData.phoneNumber) == false){
      return true
    }else{
      return false
    }
  }
const Form1 = () => {
  
  return (
    <> <FormControl isInvalid={isFormInvalid()} mr="5%">
      <Heading w="100%" textAlign={"center"} fontFamily={"cursive"} mb="2%">
        Register Patient{" "}
      </Heading>
      <Flex>
       
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            First name
          </FormLabel>
          <Input
            key={"tahat"}
            value={formData.firstName}
            id="first-name"
            autoFocus={formData.firstNameAutoFocus}
            onChange={(e) => {
              e.preventDefault();
              setFormData({
                ...formData,
                firstName: e.target.value,
                firstNameAutoFocus: true,
                lastNameAutoFocus: false,
                emailAutoFocus: false,
              });
            }}
            placeholder="First name"
          />
    
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input
            id="last-name"
            placeholder="Last name"
            value={formData.lastName}
            autoFocus={formData.lastNameAutoFocus}
            onChange={(e) => {
              setFormData({
                ...formData,
                lastName: e.target.value,
                lastNameAutoFocus: true,
                emailAutoFocus: false,
                firstNameAutoFocus: true,
              });
            }}
          />
        
      </Flex>
     
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          autoFocus={formData.emailAutoFocus}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value,
              emailAutoFocus: true,
              firstNameAutoFocus: false,
              lastNameAutoFocus: false,
            });
          }}
        />
      
        <FormLabel htmlFor="phone" fontWeight={"normal"}>
          Phone Number
        </FormLabel>
        <Input placeholder="Phone Number" id="phone" type="phone" 
            value={formData.phoneNumber} 
            autoFocus={formData.phoneNumberAutoFocus}
            onChange={(e) => {
              e.preventDefault();
              setFormData({
                ...formData,
                phoneNumber: e.target.value,
                phoneNumberAutoFocus: true,
                firstNameAutoFocus: false,
                lastNameAutoFocus: false,
                emailAutoFocus: false,
              });
            }} /> 
        <FormErrorMessage>please check that all fields are valid</FormErrorMessage>
      </FormControl>
    
    </>
  );
};

const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontFamily={"cursive"} mb="2%">
        Patient Intake
      </Heading>
      <Flex>
        <FormControl mr={"5%"} as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            htmlFor="country"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Gender
          </FormLabel>
          <Select
            id="gender"
            name="gender"
            autoComplete="gender"
            placeholder="Select option"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={formData.gender} 
            autoFocus={formData.genderAutoFocus}
            onChange={(e) => {
              e.preventDefault();
              setFormData({
                ...formData,
                gender: e.target.value,
                genderAutoFocus: true,
                firstNameAutoFocus: false,
                lastNameAutoFocus: false,
                emailAutoFocus: false,
              });
            }}
          >
            <option>Female</option>
            <option>Male</option>
          </Select>
        </FormControl>
        <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
          <FormLabel
            htmlFor="postal_code"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            Birth Date
          </FormLabel>
          <NumberInput
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            defaultValue={1999}
           
           
            
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Flex>

      <FormControl id="email" mt={1}>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          About
        </FormLabel>
        <Textarea
          rows={3}
          shadow="sm"
          focusBorderColor="brand.400"
          fontSize={{
            sm: "sm",
          }}
          value={formData.phoneNumber}
          autoFocus={formData.phoneNumberAutoFocus}
          onChange={(e) => {
            e.preventDefault();
            setFormData({
              ...formData,
              about: e.target.value,
              aboutAutoFocus: true,
              firstNameAutoFocus: false,
              lastNameAutoFocus: false,
            });}}
        />
        <FormHelperText>Brief description of your patient.</FormHelperText>
      </FormControl>
    </>
  );
};

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          colorScheme="teal"
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1 /> : <Form2 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress );
                }}
                isDisabled={step === 1}
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                colorScheme="teal"
                w="7rem"
                isDisabled={step === 2}
                onClick={(e) => {
                  e.preventDefault()
                  if ((step == 1) && isFormInvalid()) {
                     return // checks if this is valid
                  }
                  setStep(step + 1);
                  if (step === 2) {
                    setProgress(100);
                  } else {
                    setProgress(progress);
                  }
                }}
              >
                Next
              </Button>
            </Flex>
            {step === 2 ? (
              <Link
                variant="primary"
                type="submit"
                as={RouterLink}
                to="/patient-intake"
              >
                <Button
                  w="7rem"
                  colorScheme="red"
                  variant="primary"
                  onClick={() => {
                    toast({
                      title: "Patient Intake Complete.",
                      description: "We've created your patient account.",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  Submit
                </Button>
              </Link>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
