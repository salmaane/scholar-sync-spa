import { FormControl, FormLabel, HStack, Input, Stack, Select, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from '../../apis/scholarSync'

const CreateUser = () => {
    const [role, setRole] = useState('PROF');
    const [sectors, setSectors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [, , , axiosFetch] = useAxiosFunction(axios)

    useEffect(() => {
        axiosFetch({
            url: '/sector',
            method: 'get',
            handleResponse: (data : any) => setSectors(data),
        })
        axiosFetch({
          url: "/department",
          method: "get",
          handleResponse: (data: any) => setDepartments(data),
        });
    }, []);

  return (
    <Stack gap={3}>
      <HStack w={"100%"}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input type="text" borderColor={"green.500"} />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" borderColor={"green.600"} />
        </FormControl>
      </HStack>
      <HStack w={"100%"}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="text" borderColor={"green.500"} />
        </FormControl>
        <FormControl>
          <FormLabel>Role</FormLabel>
          <Select
            borderColor={"green.500"}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="PROF">Professor</option>
            <option value="ADMIN">Administrator</option>
          </Select>
        </FormControl>
      </HStack>
      {role == "PROF" && (
        <HStack w={"100%"}>
          <FormControl>
            <FormLabel>Department</FormLabel>
            <Select borderColor={"green.500"}>
              {departments?.map((department: any, index: number) => (
                <option key={index} value={department.id}>
                  {department.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Sector</FormLabel>
            <Select borderColor={"green.500"}>
              {sectors?.map((sector: any, index: number) => (
                <option key={index} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>
      )}
      <HStack w={"100%"}>
        <FormControl>
          <FormLabel>password</FormLabel>
          <Input type="password" borderColor={"green.500"} />
        </FormControl>
      </HStack>
      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        borderColor="green.500"
        color="green.500"
        bgColor={"transparent"}
        w={"100%"}
      >
        Create
      </Button>
    </Stack>
  );
}

export default CreateUser