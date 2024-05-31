import useAxiosFunction from "../../hooks/useAxiosFunction"
import axios from '../../apis/scholarSync'
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Table from "./SubjectsTable";
import SubjectForm from "./CreateSubject";

const Subject = () => {
  const [data, , , axiosFetch] = useAxiosFunction(axios);
  const [reload, setReload] = useState(0);
  useEffect(()=> {
    axiosFetch({
      url: '/subject',
      method: 'get',
    });
  }, [reload]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Table subjects={data} setReload={setReload}/>
      <SubjectForm setReload={setReload}/>
    </Box>
  );
}

export default Subject;