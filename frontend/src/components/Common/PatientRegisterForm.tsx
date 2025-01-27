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
  const [input, setInput] = useState('')
  
  const [form1Data, setForm1Data] = useState({
    email: "",
    emailAutoFocus: false,
    firstName: "",
    firstNameAutoFocus: false,
    lastName: "",
    lastNameAutoFocus: false,
    phoneNumber: "",
    phoneNumberAutoFocus: false,
  });
  const [form2Data, setForm2Data] = useState({
    gender: "",
    genderAutoFocus: false,
    age: "",
    ageFocus: false,
    about: "",
    aboutAutoFocus: false,
   
  });
  const handleInputChange = (e) => setForm1Data(e.target.value)
  const isForm1Invalid = () => {
    const isEmail = (email: string) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const isPhone = (phoneNumber: string) => 
      /^[0-9]*$/i.test(phoneNumber)
    const notHeveInput = form1Data.firstName == "" || form1Data.lastName == "" || form1Data.phoneNumber == ""
    if (notHeveInput || isEmail(form1Data.email) == false || isPhone(form1Data.phoneNumber) == false){
      return true
    }else{
      return false
    }
  }
const Form1 = () => {
  
  return (
    <> <FormControl isInvalid={isForm1Invalid()} mr="5%">
      <Heading w="100%" textAlign={"center"} fontFamily={"cursive"} mb="2%">
        Register Patient{" "}
      </Heading>
      <Flex>
       
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            First name
          </FormLabel>
          <Input
            key={"tahat"}
            value={form1Data.firstName}
            id="first-name"
            autoFocus={form1Data.firstNameAutoFocus}
            onChange={
              
              (e) => {
              e.preventDefault();
              handleInputChange
              setForm1Data({
                ...form1Data,
                firstName: e.target.value,
                firstNameAutoFocus: true,
                lastNameAutoFocus: false,
                emailAutoFocus: false,
              });
            } }
            placeholder="First name"
          />
    
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input
            id="last-name"
            placeholder="Last name"
            value={form1Data.lastName}
            autoFocus={form1Data.lastNameAutoFocus}
            onChange={(e) => {
              handleInputChange
              setForm1Data({
                ...form1Data,
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
          value={form1Data.email}
          autoFocus={form1Data.emailAutoFocus}
          onChange={(e) => {
            handleInputChange
            setForm1Data({
              ...form1Data,
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
        <Input
          id="phone"
          type="phone"
          placeholder="Phone Number"
          value={form1Data.phoneNumber}
          autoFocus={form1Data.phoneNumberAutoFocus}
          onChange={(e) => {
            handleInputChange
            setForm1Data({
              ...form1Data,
              phoneNumber: e.target.value,
              phoneNumberAutoFocus: true,
              firstNameAutoFocus: false,
              lastNameAutoFocus: false,
            });
          }}
        />
      
     
        <FormErrorMessage>please check that all fields are valid</FormErrorMessage>
      </FormControl>
    
    </>
  );
};

const Form2 = () => {
  return (
    <> 
    <FormControl mr={"5%"} as={GridItem} colSpan={[6, 3]}>
      <Heading w="100%" textAlign={"center"} fontFamily={"cursive"} mb="2%">
        Patient Intake
      </Heading>
      <Flex>
       
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
          >
            <option>Female</option>
            <option>Male</option>
          </Select>
       
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
            Age
          </FormLabel>
          <NumberInput
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            defaultValue={15}
            min={10}
            max={20}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
     
      </Flex>

      
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
                isDisabled={step === 2
                  
                }
                onClick={(e) => {
                  e.preventDefault()
                  if ((step == 1) && isForm1Invalid()) {
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
