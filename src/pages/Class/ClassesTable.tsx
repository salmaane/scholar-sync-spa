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
  import ModalDelete from "./ModalDelete";
  import { useEffect, useState } from "react";
import ModalUpdate from "./ModalUpdate";
  const ClassesTable = ({ classes, setReload}: any) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [action, setAction] = useState("");


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
          Class deleted successfully !
        </Alert>
        <Alert status="success" variant="left-accent" hidden={!updateSuccess}>
          <AlertIcon />
          Class updated successfully !
        </Alert>
        <Card shadow={"none"} borderRadius={"20px"}>
          <CardHeader>
            <Heading as="h3" size={"md"}>
              Classes
            </Heading>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant="simple" size={"md"}>
                <Thead>
                  <Tr>
                    <Th borderColor={borderColor}>Id</Th>
                    <Th borderColor={borderColor}>Block</Th>
                    <Th borderColor={borderColor}>Number</Th>
                    <Th borderColor={borderColor}>Capacity</Th>
                    <Th borderColor={borderColor}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {classes?.map((class_: Class, index: number) => (
                    <Tr key={index}>
                      <Td>{class_.id}</Td>
                      <Td>{class_.block}</Td>
                      <Td>{class_.number}</Td>
                      <Td>{class_.capacity}</Td>
                      <Td display={"flex"} gap={1}>
                        <IconButton
                          onClick={() => {
                            setAction("update");
                            setSelectedClass(class_);
                          }}
                          size={"sm"}
                          variant="lightBrand"
                          aria-label="update"
                          icon={<MdEdit size={"18px"} />}
                        />
                        <IconButton
                          onClick={() => {
                            setAction("delete");
                            setSelectedClass(class_);
                          }}
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
            {classes?.length == 0 ? (
              <Flex justifyContent={"center"} py={5}>
                <Heading size={"md"} color={"gray"} opacity={"0.8"}>
                  No Classes Found
                </Heading>
              </Flex>
            ) : null}
          </CardBody>

          {selectedClass != null && action == "update" && (
            <ModalUpdate
              class_={selectedClass}
              onClose={() => setSelectedClass(null)}
              setReload={setReload}
              setUpdateSuccess={setUpdateSuccess}
            />
          )}

          {selectedClass != null && action == "delete" && (
            <ModalDelete
              class_={selectedClass}
              onClose={() => setSelectedClass(null)}
              setReload={setReload}
              setDeleteSuccess={setDeleteSuccess}
            />
          )}
        </Card>
      </>
    );
  };
  
  type Class = {
    id: number,
    block: string,
    capacity: number,
    number: number,
  }
  
  export default ClassesTable;
  