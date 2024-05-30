import useAxiosFunction from "../../hooks/useAxiosFunction"
import axios from '../../apis/scholarSync'
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Table from "./ClassesTable";
import ClassForm from "./CreateClass";

const Class = () => {
  const [data, , , axiosFetch] = useAxiosFunction(axios);
  const [reload, setReload] = useState(0);
  useEffect(()=> {
    axiosFetch({
      url: '/class',
      method: 'get',
    });
  }, [reload]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Table classes={data} setReload={setReload}/>
      <ClassForm setReload={setReload}/>
    </Box>
  );
}

export default Class