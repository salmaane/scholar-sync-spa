import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th, 
    Td,
    TableContainer,
    IconButton,
    useColorModeValue,
    Alert,
    AlertIcon,
  } from "@chakra-ui/react";
  import { MdEdit } from "react-icons/md";
  import { MdOutlineDeleteOutline } from "react-icons/md";
  import { capitalize } from "../../utils/text";
  import ModalDelete from "./ModalDelete";
  import { useEffect, useState } from "react";
import ModalUpdate from "./ModalUpdate";
  const DepartmentsTable = ({ departments, setReload}: any) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);

  // Allert
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdateSuccess(false);
      setDeleteSuccess(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [updateSuccess, deleteSuccess]);

    return (
      <>
      <Alert status="success" variant="left-accent" hidden={!deleteSuccess}>
      <AlertIcon />
      Department deleted successfully !
      </Alert>
      <Alert status="success" variant="left-accent" hidden={!updateSuccess}>
      <AlertIcon />
      Department updated successfully !
      </Alert>
      <Card shadow={'none'} borderRadius={'20px'}>
        <CardHeader>
          <Heading as="h3" size={"md"}>
            Departments
          </Heading>
        </CardHeader>
        <CardBody>

          <TableContainer>
            <Table variant="simple" size={"md"}>
              <Thead>
                <Tr>
                  <Th borderColor={borderColor}>Id</Th>
                  <Th borderColor={borderColor}>Name</Th>
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {departments?.map((department: Department, index: number) => (
                  <Tr key={index}>
                    <Td>{department.id}</Td>
                    <Td>{capitalize(department.name)}</Td>
                    <Td display={"flex"} gap={1}>
                      <IconButton
                        onClick={() => setSelectedDepartment(department)}
                        size={"sm"}
                        variant="lightBrand"
                        aria-label="update"
                        icon={<MdEdit size={"18px"} />}
                      />
                      <IconButton
                        onClick={() => setSelectedDepartmentId(department.id)}
                        size={"sm"}
                        variant="lightBrand"
                        aria-label="delete"
                        icon={<MdOutlineDeleteOutline size={"18px"} />}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>

        {selectedDepartment != null &&  
        <ModalUpdate
          department={selectedDepartment}
          onClose={() => setSelectedDepartment<any>(null)}
          setReload={setReload}
          setUpdateSuccess={setUpdateSuccess}
        />}

        {selectedDepartmentId!=0 &&
        <ModalDelete
          departmentId={selectedDepartmentId}
          onClose={() => setSelectedDepartmentId(0)}
          setReload={setReload}
          setDeleteSuccess={setDeleteSuccess}
        />
        }
      </Card></>



    );
  };
  
  type Department = {
    id: number,
    name: string,
  }
  
  export default DepartmentsTable;
  