import { Badge, Box, Card, CardBody, Divider, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FaBookBookmark, FaPeopleGroup, FaUsers, FaWarehouse } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { IoGitBranch } from "react-icons/io5";
import { PiExamBold } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { useEffect, useState } from "react";
import axios from "../../apis/scholarSync";
const Dashboard = () => {

  const [usersNbr, setUsersNbr] = useState();
  const [professorsNbr, setProfessorsNbr] = useState();
  const [adminNbr, setAdminNbr] = useState();
  const [groupsNbr, setGroupsNbr] = useState();
  const [departmentsNbr, setUDepartmentsNbr] = useState();
  const [sectorsNbr, setSectorsNbr] = useState();
  const [subjectsNbr, setSubjectsNbr] = useState();
  const [examsNbr, setExamsNbr] = useState();
  const [classesNbr, setClassesNbr] = useState();
  const [informations, setInformations] = useState<any>();

  const [, , , axiosFetch] = useAxiosFunction(axios);
  useEffect(()=>{
    axiosFetch({ 
      url: "/user/count",
      method: "get",
      handleResponse: (data: any) => setUsersNbr(data),
    });
    axiosFetch({
      url: "/professor/count",
      method: "get",
      handleResponse: (data: any) => setProfessorsNbr(data),
    });
    axiosFetch({
      url: "/admin/count",
      method: "get",
      handleResponse: (data: any) => setAdminNbr(data),
    });
    axiosFetch({
      url: "/group/count",
      method: "get",
      handleResponse: (data: any) => setGroupsNbr(data),
    });
    axiosFetch({
      url: "/department/count",
      method: "get",
      handleResponse: (data: any) => setUDepartmentsNbr(data),
    });
    axiosFetch({
      url: "/sector/count",
      method: "get",
      handleResponse: (data: any) => setSectorsNbr(data),
    });
    axiosFetch({
      url: "/subject/count",
      method: "get",
      handleResponse: (data: any) => setSubjectsNbr(data),
    });
    axiosFetch({
      url: "/exam/count",
      method: "get",
      handleResponse: (data: any) => setExamsNbr(data),
    });
    axiosFetch({
      url: "/class/count",
      method: "get",
      handleResponse: (data: any) => setClassesNbr(data),
    });
    axiosFetch({
      url: "/information",
      method: "get",
      handleResponse: (data) => setInformations(data),
    });
  },[])
    
  return (

    <>
    {/* <div>Statistics</div> */}
      <Stack direction={'row'} gap={0}>

        <Flex gap={5} wrap={"wrap"} w={"71%"}>
          <Card shadow={'none'} borderRadius={'20px'} w={'30%'}>
            <CardBody>
                <Flex gap={4} alignItems={'Center'}>
                    <Icon
                      as={HiMiniUsers}
                      width="38px"
                      height="38px"
                      color={"secondaryGray.500"}
                    />
                  <Stack direction={'column'} spacing={0}>
                    <Text lineHeight='100%' color={'gray.500'}>Users</Text>
                    <Text fontWeight={600} fontSize={{base: "2xl", }}>{usersNbr}</Text>
                  </Stack>
                </Flex>
            </CardBody>
          </Card>
          <Card shadow={'none'} borderRadius={'20px'} w={'30%'}>
            <CardBody>
                <Flex gap={4} alignItems={'Center'}>
                    <Icon
                      as={RiAdminFill}
                      width="38px"
                      height="38px"
                      color={"secondaryGray.500"}
                    />
                  <Stack direction={'column'} spacing={0}>
                    <Text lineHeight='100%' color={'gray.500'}>Administrators</Text>
                    <Text fontWeight={600} fontSize={{base: "2xl", }}>{adminNbr}</Text>
                  </Stack>
                </Flex>
            </CardBody>
          </Card>
          <Card shadow={'none'} borderRadius={'20px'} w={'30%'}>
            <CardBody>
                <Flex gap={4} alignItems={'Center'}>
                    <Icon
                      as={FaUsers}
                      width="38px"
                      height="38px"
                      color={"secondaryGray.500"}
                    />
                  <Stack direction={'column'} spacing={0}>
                    <Text lineHeight='100%' color={'gray.500'}>Professors</Text>
                    <Text fontWeight={600} fontSize={{base: "2xl", }}>{professorsNbr}</Text>
                  </Stack>
                </Flex>
            </CardBody>
          </Card>
          <Card shadow={'none'} borderRadius={'20px'} w={'30%'}>
            <CardBody>
                <Flex gap={4} alignItems={'Center'}>
                    <Icon
                      as={FaPeopleGroup}
                      width="38px"
                      height="38px"
                      color={"secondaryGray.500"}
                    />
                  <Stack direction={'column'} spacing={0}>
                    <Text lineHeight='100%' color={'gray.500'}>Groups</Text>
                    <Text fontWeight={600} fontSize={{base: "2xl", }}>{groupsNbr}</Text>
                  </Stack>
                </Flex>
            </CardBody>
          </Card>
          <Card shadow={'none'} borderRadius={'20px'} w={'30%'}>
            <CardBody>
                <Flex gap={4} alignItems={'Center'}>
                    <Icon
                      as={FaWarehouse}
                      width="38px"
                      height="38px"
                      color={"secondaryGray.500"}
                    />
                  <Stack direction={'column'} spacing={0}>
                    <Text lineHeight='100%' color={'gray.500'}>Departmens</Text>
                    <Text fontWeight={600} fontSize={{base: "2xl", }}>{departmentsNbr}</Text>
                  </Stack>
                </Flex>
            </CardBody>
          </Card>
          <Card shadow={'none'} borderRadius={'20px'} w={'30%'}>
            <CardBody>
                <Flex gap={4} alignItems={'Center'}>
                    <Icon
                      as={IoGitBranch}
                      width="38px"
                      height="38px"
                      color={"secondaryGray.500"}
                    />
                  <Stack direction={'column'} spacing={0}>
                    <Text lineHeight='100%' color={'gray.500'}>Sectors</Text>
                    <Text fontWeight={600} fontSize={{base: "2xl", }}>{sectorsNbr}</Text>
                  </Stack>
                </Flex>
            </CardBody>
          </Card>
          <Card shadow={'none'} borderRadius={'20px'} w={'30%'}>
            <CardBody>
                <Flex gap={4} alignItems={'Center'}>
                    <Icon
                      as={FaBookBookmark}
                      width="38px"
                      height="38px"
                      color={"secondaryGray.500"}
                    />
                  <Stack direction={'column'} spacing={0}>
                    <Text lineHeight='100%' color={'gray.500'}>Subjects</Text>
                    <Text fontWeight={600} fontSize={{base: "2xl", }}>{subjectsNbr}</Text>
                  </Stack>
                </Flex>
            </CardBody>
          </Card>
          <Card shadow={'none'} borderRadius={'20px'} w={'30%'}>
            <CardBody>
                <Flex gap={4} alignItems={'Center'}>
                    <Icon
                      as={PiExamBold}
                      width="38px"
                      height="38px"
                      color={"secondaryGray.500"}
                    />
                  <Stack direction={'column'} spacing={0}>
                    <Text lineHeight='100%' color={'gray.500'}>Exams</Text>
                    <Text fontWeight={600} fontSize={{base: "2xl", }}>{examsNbr}</Text>
                  </Stack>
                </Flex>
            </CardBody>
          </Card>
          <Card shadow={'none'} borderRadius={'20px'} w={'30%'}>
            <CardBody>
                <Flex gap={4} alignItems={'Center'}>
                    <Icon
                      as={SiGoogleclassroom}
                      width="38px"
                      height="38px"
                      color={"secondaryGray.500"}
                    />
                  <Stack direction={'column'} spacing={0}>
                    <Text lineHeight='100%' color={'gray.500'}>Classes</Text>
                    <Text fontWeight={600} fontSize={{base: "2xl", }}>{classesNbr}</Text>
                  </Stack>
                </Flex>
            </CardBody>
          </Card>
        </Flex>

        <Flex gap={6} wrap={"wrap"} w={"29%"}>
          <Card shadow={'none'} borderRadius={'20px'} w={'95%'}>
            <CardBody>
                <Flex gap={6} alignItems={'Center'} direction={'column'} justifyItems={"center"} mt={2} >
                  <Flex alignItems={"center"} justifyContent={"space-between"} width={"95%"}>
                    <Text fontSize='lg' fontWeight='bold' width={"60%"}>
                      Academic Year:
                    </Text>
                    <Badge ml='1' fontSize='0.8em' backgroundColor={"navy.300"} color={"white"} width={"40%"} textAlign={"center"}>
                      <Text fontSize='md' fontWeight='bold'>
                        {informations?.academicYear}
                      </Text>
                    </Badge>
                  </Flex>

                  <Flex alignItems={"center"} justifyContent={"space-between"} width={"95%"}>
                    <Text textAlign={"start"} fontSize='lg' fontWeight='bold' width={"60%"} justifySelf={"self-start"}  >
                      Semester:
                    </Text>
                    <Badge ml='1' fontSize='0.8em' backgroundColor={"navy.300"} color={"white"} width={"40%"} textAlign={"center"}>
                      <Text fontSize='md' fontWeight='bold'>
                        {informations?.semester}
                      </Text>
                    </Badge>
                  </Flex>

                  <Divider orientation='horizontal' m={-1}/>

                  <Flex alignItems={"center"} justifyContent={"space-between"} width={"95%"}>
                    <Text textAlign={"start"} fontSize='lg' fontWeight='bold' width={"60%"} justifySelf={"self-start"}  >
                      Supervised T Date:
                    </Text>
                    <Badge ml='1' fontSize='0.8em' backgroundColor={"navy.300"} color={"white"} width={"40%"} textAlign={"center"}>
                      <Text fontSize='md' fontWeight='bold'>
                        {informations?.supervisedTestsWeekStartDate}
                      </Text>
                    </Badge>
                  </Flex>

                  <Flex alignItems={"center"} justifyContent={"space-between"} width={"95%"}>
                    <Text textAlign={"start"} fontSize='lg' fontWeight='bold' width={"60%"} justifySelf={"self-start"}  >
                      Exams Date:
                    </Text>
                    <Badge ml='1' fontSize='0.8em' backgroundColor={"navy.300"} color={"white"} width={"40%"} textAlign={"center"}>
                      <Text fontSize='md' fontWeight='bold'>
                        {informations?.examsWeekStartDate}
                      </Text>
                    </Badge>
                  </Flex>

                  <Flex alignItems={"center"} justifyContent={"space-between"} width={"95%"}>
                    <Text textAlign={"start"} fontSize='lg' fontWeight='bold' width={"60%"} justifySelf={"self-start"}  >
                      Resit Exams Date:
                    </Text>
                    <Badge ml='1' fontSize='0.8em' backgroundColor={"navy.300"} color={"white"} width={"40%"} textAlign={"center"}>
                      <Text fontSize='md' fontWeight='bold'>
                        {informations?.resitExamsWeekStartDate}
                      </Text>
                    </Badge>
                  </Flex>

                </Flex>
            </CardBody>
          </Card>
        </Flex>

      </Stack>
    </>


  );
}

export default Dashboard