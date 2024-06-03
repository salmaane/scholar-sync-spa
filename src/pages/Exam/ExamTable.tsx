import {Flex, Heading, Stack, Tag, Text } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { formatDate } from "../../utils/date";
import { capitalize, formatLevel, formatStartHour } from "../../utils/text";
import { VSeparator } from "../../components/Separator/Separator";

const ExamTable = ({exams} : any) => {
  return (
    <Accordion
      defaultIndex={undefined}
      backgroundColor={"#fff"}
      allowMultiple={false}
    >
      {exams?.map((exam: any) => (
        <AccordionItem>
          <h2>
            <AccordionButton borderBottom={"1px solid #eee"}>
              <Flex justifyContent={"space-between"} w={"100%"}>
                <Text flex={1}>
                  <strong>{exam?.subject?.title}</strong> {" ("}
                  {formatLevel(exam?.subject?.level)}
                  {")"}
                </Text>
              </Flex>
              <AccordionIcon ml={4} />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} borderRadius={"20px"}>
            <Stack direction={"row"} gap={4}>
              <Stack flex={1}>
                <Flex gap={4} direction={"column"}>
                  {/* Id */}
                  <Flex gap={3}>
                    <Text flex={1}>Id</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {exam?.id}
                    </Tag>
                  </Flex>
                  {/* Type */}
                  <Flex gap={3}>
                    <Text flex={1}>Type</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"120px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {capitalize(exam?.type)}
                    </Tag>
                  </Flex>
                  {/* Academic Year */}
                  <Flex gap={3}>
                    <Text flex={1}>Academic Year</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"85px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {exam?.academicYear}
                    </Tag>
                  </Flex>
                  {/* Date */}
                  <Flex gap={3}>
                    <Text flex={1}>Date</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"100px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {formatDate(exam?.date)}
                    </Tag>
                  </Flex>
                  {/* Duration */}
                  <Flex gap={3}>
                    <Text flex={1}>Duration</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"60px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {exam?.duration == "90" ? "1h30" : "2h"}
                    </Tag>
                  </Flex>
                  {/* Semester */}
                  <Flex gap={3}>
                    <Text flex={1}>Semester</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"60px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {capitalize(exam?.semester)}
                    </Tag>
                  </Flex>
                  {/* Session */}
                  <Flex gap={3}>
                    <Text flex={1}>Session</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"60px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {capitalize(exam?.session)}
                    </Tag>
                  </Flex>
                  {/* Start Hour */}
                  <Flex gap={3}>
                    <Text flex={1}>Start Hour</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"60px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {formatStartHour(exam?.startHour)}
                    </Tag>
                  </Flex>
                  {/* Subject */}
                  <Flex gap={3}>
                    <Text flex={1}>Subject</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"120px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {capitalize(exam?.subject?.title)}
                    </Tag>
                  </Flex>
                  {/* Subject Type*/}
                  <Flex gap={3}>
                    <Text flex={1}>Subject Type</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"120px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {capitalize(exam?.subject?.type)}
                    </Tag>
                  </Flex>
                  {/* Level*/}
                  <Flex gap={3}>
                    <Text flex={1}>Level</Text>
                    <Tag
                      flex={2}
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"60px"}
                      backgroundColor={"brand.100"}
                      color={"#000"}
                    >
                      {formatLevel(exam?.subject?.level)}
                    </Tag>
                  </Flex>
                </Flex>
              </Stack>
              <VSeparator />
              <Stack flex={1} gap={4}>
                <Heading size={"md"}>Surveillances</Heading>
                <Flex gap={3}>
                  <Text flex={1}>Coordinator</Text>
                  <Tag
                    flex={2}
                    variant={"solid"}
                    justifyContent={"center"}
                    backgroundColor={"green.200"}
                    color={"#000"}
                  >
                    {capitalize(
                      exam?.surveillances?.[0]?.coordinator?.firstName +
                        " " +
                        exam?.surveillances?.[0]?.coordinator?.lastName
                    )}
                  </Tag>
                </Flex>
                <Flex gap={4} direction={"column"}>
                  {exam?.surveillances?.map(
                    (surveillance: any, index: number) => (
                      <Flex key={index} direction={"column"} gap={2}>
                        <Heading size={"sm"}>
                          Class{" "}
                          {surveillance.aclass.block +
                            surveillance.aclass.number}
                        </Heading>
                        <Flex direction={"column"} gap={3}>
                          <Flex gap={3}>
                            <Text flex={1}>Capacity</Text>
                            <Tag
                              flex={2}
                              variant={"solid"}
                              justifyContent={"center"}
                              backgroundColor={"brand.100"}
                              color={"#000"}
                            >
                              {surveillance.aclass.capacity}
                            </Tag>
                          </Flex>
                          <Flex gap={3}>
                            <Text flex={1}>Absence Controller</Text>
                            <Tag
                              flex={2}
                              variant={"solid"}
                              justifyContent={"center"}
                              backgroundColor={"red.200"}
                              color={"#000"}
                            >
                              {capitalize(
                                surveillance?.absController?.firstName +
                                  " " +
                                  surveillance?.absController?.firstName
                              )}
                            </Tag>
                          </Flex>
                          <Flex>
                            <Text flex={1}>Supervisors</Text>
                            <Flex flex={2} direction="column" gap={3}>
                              {surveillance?.professors?.map(
                                (prof: any, index: number) => (
                                  <Flex direction={"row"} gap={2}>
                                    <Heading flex={1} size={"sm"}>
                                      {index + 1}
                                    </Heading>
                                    <Tag
                                      flex={15}
                                      key={index}
                                      variant={"solid"}
                                      justifyContent={"center"}
                                      backgroundColor={"navy.200"}
                                      color={"#000"}
                                    >
                                      {capitalize(
                                        prof?.firstName + " " + prof?.lastName
                                      )}
                                    </Tag>
                                  </Flex>
                                )
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    )
                  )}
                </Flex>
              </Stack>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ExamTable;
