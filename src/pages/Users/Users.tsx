import useAxiosFunction from "../../hooks/useAxiosFunction"
import axios from '../../apis/scholarSync'
import { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import Table from "./UsersTable";
import { NavLink } from "react-router-dom";


const Users = () => {
  const [data, , loading, axiosFetch] = useAxiosFunction(axios);

  useEffect(()=> {
    axiosFetch({
      url: '/user',
      method: 'get',
    });
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Table users={data} />
      <NavLink to={'create'}>
        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          borderColor="brand.500"
          color="brand.500"
          bgColor={'transparent'}
          w={'100%'}
        >
              Add
        </Button>
      </NavLink>
    </Box>
  );
}

export default Users