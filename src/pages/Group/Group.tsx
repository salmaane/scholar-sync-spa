import useAxiosFunction from "../../hooks/useAxiosFunction"
import axios from '../../apis/scholarSync'
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Table from "./GroupsTable";
import GroupForm from "./CreateGroup";

const Group = () => {
  const [data, , , axiosFetch] = useAxiosFunction(axios);
  const [reload, setReload] = useState(0);
  useEffect(()=> {
    axiosFetch({
      url: '/group',
      method: 'get',
    });
  }, [reload]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Table groups={data} setReload={setReload}/>
      <GroupForm setReload={setReload}/>
    </Box>
  );
}

export default Group