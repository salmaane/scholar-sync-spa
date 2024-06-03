import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/scholarSync";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ExamTable from "./ExamTable";
import { capitalize } from "../../utils/text";

const Exam = () => {
  const [, , , axiosFetch] = useAxiosFunction(axios);
  const [exams, setExams] = useState([]);
  const [academicYear, setAcademicYear] = useState<string>();

  useEffect(() => {
    if (academicYear) {
      axiosFetch({
        url: `/exam/byYear`,
        method: "post",
        data: { academicYear: academicYear },
        handleResponse: (data: any) => {
          setExams(data);
        },
      });
    }
  }, [academicYear]);

  const [years, setYears] = useState([]);
  useEffect(() => {
    axiosFetch({
      url: "/exam/years",
      method: "get",
      handleResponse: (data: any) => {
        setYears(data);
      },
    });
  }, []);

  // console.log(exams);
  console.log(years);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Stack
        w={"100%"}
        spacing={4}
        alignItems={"start"}
        direction={["column", "column", "row"]}
      >
        <FormControl>
          <FormLabel>Academic Year</FormLabel>
          <Select
            isRequired={true}
            onChange={(e) => {
              setAcademicYear(e.target.value);
            }}
            variant={"auth"}
            placeholder="Select a Year"
          >
            {years?.map((year: any, index: number) => (
              <option key={index} value={year}>
                {capitalize(year)}
              </option>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {academicYear ? null : <Card shadow={"none"} borderRadius={"20px"}>
        <CardBody>
          <Flex justifyContent={"center"} alignItems={"center"} direction={'column'} p={5}>
            <Heading size={"lg"} color={"gray"}>
              No exams found
            </Heading>
            <Text color={'gray'}>Please select a year</Text>
          </Flex>
        </CardBody>
      </Card>}
      {academicYear && exams.length > 0 ? <ExamTable exams={exams} /> : null}
      <NavLink to={"create"}>
        <Button
          size="md"
          height="48px"
          width="200px"
          variant={"primary"}
          w={"100%"}
        >
          Add New Exam
        </Button>
      </NavLink>
    </Box>
  );
};

export default Exam;
