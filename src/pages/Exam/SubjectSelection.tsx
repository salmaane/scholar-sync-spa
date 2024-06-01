import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/scholarSync";
import { capitalize } from "../../utils/text";

const SubjectSelection = ({ setSubject }: any) => {
  const [sectorId, setSectorId] = useState<number>();
  const [level, setLevel] = useState<string>();
  const [subjects, setSubjects] = useState([]);
  
  // get sectors data
  const [sectors, setSectors] = useState([]);
  const [, , , axiosFetch] = useAxiosFunction(axios);
  useEffect(() => {
    axiosFetch({
      url: "/sector",
      method: "get",
      handleResponse: (data: any) => setSectors(data),
    });
  }, []);

  // get subject data
  useEffect(() => {
    if (sectorId != 0 && level != "") {
      axiosFetch({
        url: `/subject/sector/${sectorId}/level/${level}`,
        method: "get",
        handleResponse: (data: any) => setSubjects(data),
      });
    }
  }, [sectorId, level]);

  return (
    <Card shadow={"none"} borderRadius={"20px"}>
      <CardHeader>
        <Heading as="h3" size={"sm"} color={"#111111"}>
          Select a subject for the exam
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack gap={4}>
          <Stack
            w={"100%"}
            gap={4}
            alignItems={"start"}
            direction={["column", "column", "row"]}
          >
            <FormControl>
              <FormLabel>Sector</FormLabel>
              <Select
                isRequired={true}
                onChange={(e) => {
                  setSectorId(Number(e.target.value));
                }}
                variant={"auth"}
                placeholder="Select a Sector"
              >
                {sectors?.map((sector: any, index: number) => (
                  <option key={index} value={sector.id}>
                    {capitalize(sector.name)}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Level</FormLabel>
              <Select
                variant={"auth"}
                isRequired={true}
                placeholder="Select a level"
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="LEVEL_1">1st Year</option>
                <option value="LEVEL_2">2nd Year</option>
                <option value="LEVEL_3">3rd Year</option>
              </Select>
            </FormControl>
          </Stack>
          {(subjects?.length > 0 && sectorId && level) ? (
            <FormControl>
              <FormLabel>Subject</FormLabel>
              <Select 
                isRequired={true} 
                variant={"auth"} 
                onChange={(e) => {
                    setSubject(subjects.find((subject : any) => subject.id == Number(e.target.value)))
                }}
                placeholder="Select a subject"
                >
                {subjects?.map((subject: any, index: number) => (
                  <option key={index} value={subject.id}>
                    {capitalize(subject.title)}
                  </option>
                ))}
              </Select>
            </FormControl>
          ) : 
            <Flex justifyContent={'center'} py={4}>
              <Heading size={"md"} color={"gray"} opacity={"0.8"}>No Subjects Found</Heading>
            </Flex>
          }
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SubjectSelection;
