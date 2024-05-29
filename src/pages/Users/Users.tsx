import useAxiosFunction from "../../hooks/useAxiosFunction"
import axios from '../../apis/scholarSync'
import { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import Table from "./UsersTable";
import { NavLink } from "react-router-dom";


const Users = () => {
  const [data, , , axiosFetch] = useAxiosFunction(axios);

  useEffect(()=> {
    axiosFetch({
      url: '/user',
      method: 'get',
    });
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Table users={data} />
      
      <NavLink to={"create"}>
        <Button
          size="md"
          height="48px"
          width="200px"
          variant={"primary"}
          w={"100%"}
        >
          Add New User
        </Button>
      </NavLink>
    </Box>
  );
}

export default Users