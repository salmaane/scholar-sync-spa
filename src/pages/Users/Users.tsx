import useAxiosFunction from "../../hooks/useAxiosFunction"
import axios from '../../apis/scholarSync'
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import Table from "./UsersTable";
import { NavLink } from "react-router-dom";


const Users = () => {
  const [data, , , axiosFetch] = useAxiosFunction(axios);
  const [reload, setReload] = useState(0);

  useEffect(()=> {
    axiosFetch({
      url: '/user',
      method: 'get',
    });
  }, [reload]);



  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Table users={data} setReload={setReload}/>
      
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