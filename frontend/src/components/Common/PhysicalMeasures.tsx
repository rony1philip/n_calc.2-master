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
  Avatar,
  Spacer,
  Radio,
  RadioGroup,
  SliderMark,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";

function AgeSlider() {
  const [sliderValue, setSliderValue] = useState(50);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Box>
      <Slider
        colorScheme="green"
        aria-label="slider-ex-6"
        onChange={(val) => setSliderValue(val)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={1} {...labelStyles}></SliderMark>
        <SliderMark value={100} {...labelStyles}></SliderMark>

        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="green"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${sliderValue}`}
        >
          <SliderThumb borderColor={"green"} borderWidth={"2PX"} />
        </Tooltip>
      </Slider>
    </Box>
  );
}

function FemaleMale() {
  const [value, setValue] = React.useState("1");
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Center>
        <Stack direction="row">
          <Radio colorScheme="green" value="1">
            F
          </Radio>
          <Spacer></Spacer>
          <Radio colorScheme="green" value="2">
            M
          </Radio>
        </Stack>{" "}
      </Center>
    </RadioGroup>
  );
}

const PhysicalMeasuresF = () => {
  return (
    <>
      <Card
        boxShadow="dark-lg"
        textColor={"green.200"}
        background={"antiquewhite"}
        borderRadius={"14"}
        borderWidth={"2px"}
        borderColor={"green.200"}
        width={"55%"}
      >
        <CardHeader>
          <Heading
            textShadow="1px 1px grey"
            textAlign={"center"}
            fontFamily={"cursive"}
            size="md"
            fontSize={"xx-large"}
          >
            physical measures
          </Heading>
        </CardHeader>

        <CardBody>
          <Box paddingLeft={"10%"} paddingRight={"10%"}>
            <Grid templateColumns="repeat(5, 1fr)" gap={1}>
              <GridItem colSpan={2} w={"100%"}>
                <Card background={"#FAF7F0"}>
                  <CardBody>
                    <Heading
                      textShadow="1px 1px grey"
                      textAlign={"center"}
                      fontFamily={"cursive"}
                      fontSize={"lg"}
                    >
                      Gender
                    </Heading>
                    <Stack direction="row">
                      <Box p={"4"}>
                        <Avatar
                          size="md"
                          name="Oshigaki Kisame"
                          src="data:image/jpeg;base64,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"
                        />
                      </Box>
                      <Spacer></Spacer>
                      <Box p={"4"}>
                        <Avatar
                          name="Sasuke Uchiha"
                          src="data:image/jpeg;base64,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"
                        />
                      </Box>
                    </Stack>
                    <FemaleMale></FemaleMale>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem colSpan={2} colStart={4} colEnd={6} w={"100%"}>
                <Card background={"#FAF7F0"}>
                  <CardBody>
                    <Heading
                      textShadow="1px 1px grey"
                      textAlign={"center"}
                      fontFamily={"cursive"}
                      fontSize={"lg"}
                    >
                      Gender
                    </Heading>
                    <Center>
                      <Box p={4}>
                        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGnjA4Vx1_yB-cs3_UyC9lD1HjW4FMcVe33Q&s"></Avatar>
                      </Box>
                    </Center>
                    <AgeSlider></AgeSlider>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
            <Grid paddingTop={"5%"} templateColumns="repeat(5, 1fr)" gap={"1"}>
              <GridItem colSpan={2} w={"100%"}>
                <Card background={"#FAF7F0"}>
                  <CardBody>
                    <Box></Box>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem colSpan={2} colStart={4} colEnd={6} w={"100%"}>
                <Card background={"#FAF7F0"}>
                  <CardBody>
                    <Box></Box>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </Box>
          <Box paddingTop={"5%"} paddingLeft={"18%"} paddingRight={"0%"}>
            <Card background={"#FAF7F0"} w={"75%"}>
              <CardBody>
                <Box></Box>
              </CardBody>
            </Card>
          </Box>
        </CardBody>
      </Card>
      ;
    </>
  );
};

export default PhysicalMeasuresF;
