import {
    Card, Flex,
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
  import DeleteModal from '../../components/Modal/DeleteModal'
  import { useEffect, useState } from "react";
  import ModalUpdate from "./ModalUpdate";
  import { capitalize } from "../../utils/text";

  const DepartmentsTable = ({ departments, setReload}: any) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);

  // Allert
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdateSuccess(false);
      setDeleteSuccess(false);
      setShowError(false);
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
        <Alert status="error" variant="left-accent" hidden={!showError}>
          <AlertIcon />
          Something went wrong, try again
        </Alert>
        <Card shadow={"none"} borderRadius={"20px"}>
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
            {departments?.length == 0 ? (
              <Flex justifyContent={"center"} py={5}>
                <Heading size={"md"} color={"gray"} opacity={"0.8"}>
                  No Departments Found
                </Heading>
              </Flex>
            ) : null}
          </CardBody>

          {selectedDepartment != null && (
            <ModalUpdate
              department={selectedDepartment}
              onClose={() => setSelectedDepartment(null)}
              setReload={setReload}
              setUpdateSuccess={setUpdateSuccess}
            />
          )}

          {selectedDepartmentId != 0 && (
            <DeleteModal
              url={"/department/" + selectedDepartmentId}
              message={
                "Warning: If you delete this department, the professors assigned to this department will no longer be assigned to any department."
              }
              onClose={() => setSelectedDepartmentId(0)}
              setReload={setReload}
              setDeleteSuccess={setDeleteSuccess}
              setShowError={setShowError}
            />
          )}
        </Card>
      </>
    );
  };
  
  type Department = {
    id: number,
    name: string,
  }
  
  export default DepartmentsTable;
  