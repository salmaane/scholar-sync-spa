import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/scholarSync";
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Exam = () => {
  const [data, , , axiosFetch] = useAxiosFunction(axios);
  const [reload, setReload] = useState(0);
  useEffect(() => {

  }, [reload]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <NavLink to={"create"}>
        <Button
          size="md"
          height="48px"
          width="200px"
          variant={"primary"}
          w={"100%"}
        >
          Add New Exam
        </Button>
      </NavLink>
    </Box>
  );
};

export default Exam;
