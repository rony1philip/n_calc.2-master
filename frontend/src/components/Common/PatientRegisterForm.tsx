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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, type PatientCreate, PatientsService as PatientService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface AddPatientProps {
  isOpen: boolean
  onClose: () => void
}


const PatientRegisterForm = ({ isOpen, onClose }: AddPatientProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PatientCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      first_name:"",
      last_name:"",
      email: "",
      about: "",
      phon_number:"",
      gender: "",
      age: 0,
    },
  })

  const mutation = useMutation({
    mutationFn: (data: PatientCreate) =>
      PatientService.createPatient({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Patient created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["Patients"] })
    },
  })

  const onSubmit: SubmitHandler<PatientCreate> = (data) => {
    mutation.mutate(data)
  }
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
    <> <FormControl isRequired isInvalid={isFormInvalid()} mr="5%">
      <Heading w="100%" textAlign={"center"} fontFamily={"cursive"} mb="2%">
        Register Patient{" "}
      </Heading>
      <Flex>
       
          <FormLabel htmlFor="first_name" fontWeight={"normal"}>
            First name
          </FormLabel>
          <Input
           {...register("first_name", {
            required: "first name is required.",
          })}
          
            key={"tahat"}
            value={formData.firstName}
            id="first_name"
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
             {errors.first_name && (
                <FormErrorMessage>{errors.first_name.message}</FormErrorMessage>
              )}
          <FormLabel htmlFor="last_name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input
          {...register("last_name", {
            required: "Title is required.",
          })}
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
          {errors.last_name && (
                <FormErrorMessage>{errors.last_name.message}</FormErrorMessage>
              )}
        
      </Flex>
     
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
        {...register("email", {
          required: "email is required.",
        })}
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
        {errors.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
        <FormLabel htmlFor="phon_number" fontWeight={"normal"}>
          Phone Number
        </FormLabel>
        <Input 
            placeholder="Phone Number" 
            id="phone" 
            type="phone" 
            {...register("phon_number", {
              required: "Title is required.",
            })}
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
            {errors.phon_number && (
                <FormErrorMessage>{errors.phon_number.message}</FormErrorMessage>
              )}
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
        <FormControl isRequired mr={"5%"} as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            htmlFor="gender"
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
          {errors.gender && (
                <FormErrorMessage>{errors.gender.message}</FormErrorMessage>
              )}
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
          {errors.title && (
                <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
              )}
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
        {errors.title && (
                <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
              )}
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
 export default PatientRegisterForm