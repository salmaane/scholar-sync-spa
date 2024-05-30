import useAxiosFunction from "../../hooks/useAxiosFunction"
import axios from '../../apis/scholarSync'
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Table from "./DepartmentsTable";
import DepartmentForm from "./CreateDepartment";
import { NavLink } from "react-router-dom";

const Department = () => {
  const [data, , , axiosFetch] = useAxiosFunction(axios);
  const [reload, setReload] = useState(0);
  useEffect(()=> {
    axiosFetch({
      url: '/department',
      method: 'get',
    });
  }, [reload]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Table departments={data} setReload={setReload}/>
      <DepartmentForm setReload={setReload}/>
    </Box>
  );
}

export default Department