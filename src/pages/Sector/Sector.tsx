import useAxiosFunction from "../../hooks/useAxiosFunction"
import axios from '../../apis/scholarSync'
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Table from "./SectorsTable";
import SectorForm from "./CreateSetor";

const Sector = () => {
  const [data, , , axiosFetch] = useAxiosFunction(axios);
  const [reload, setReload] = useState(0);
  useEffect(()=> {
    axiosFetch({
      url: '/sector',
      method: 'get',
    });
  }, [reload]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Table sectors={data} setReload={setReload}/>
      <SectorForm setReload={setReload}/>
    </Box>
  );
}

export default Sector