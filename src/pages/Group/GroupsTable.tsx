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
import DeleteModal from "../../components/Modal/DeleteModal";
  const GroupsTable = ({ groups, setReload}: any) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  const [selectedGroup, setSelectedGroup] = useState<Group>(null);
  const [selectedGroupId, setSelectedGroupId] = useState(0);

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
      Group deleted successfully !
      </Alert>
      <Alert status="success" variant="left-accent" hidden={!updateSuccess}>
      <AlertIcon />
      Group updated successfully !
      </Alert>
      <Card shadow={'none'} borderRadius={'20px'}>
        <CardHeader>
          <Heading as="h3" size={"md"}>
            Groups
          </Heading>
        </CardHeader>
        <CardBody>

          <TableContainer>
            <Table variant="simple" size={"md"}>
              <Thead>
                <Tr>
                  <Th borderColor={borderColor}>Id</Th>
                  <Th borderColor={borderColor}>Name</Th>
                  <Th borderColor={borderColor}>Creation Criteria</Th>
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {groups?.map((group: Group, index: number) => (
                  <Tr key={index}>
                    <Td>{groups.id}</Td>
                    <Td>{capitalize(group.name)}</Td>
                    <Td>{group.creation_criteria}</Td>
                    <Td display={"flex"} gap={1}>
                      <IconButton
                        onClick={() => setSelectedGroup(group)}
                        size={"sm"}
                        variant="lightBrand"
                        aria-label="update"
                        icon={<MdEdit size={"18px"} />}
                      />
                      <IconButton
                        onClick={() => setSelectedGroupId(group.id)}
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

        {selectedGroup != null &&  
        <ModalUpdate
          group={selectedGroup}
          onClose={() => setSelectedGroup<any>(null)}
          setReload={setReload}
          setUpdateSuccess={setUpdateSuccess}
        />}

        {selectedGroupId!=0 &&
        <DeleteModal
          url={"/group/"+selectedGroupId}
          message={"Are you sure to delete this group?"}
          onClose={() => setSelectedGroupId(0)}
          setReload={setReload}
          setDeleteSuccess={setDeleteSuccess}
        />
        }
      </Card></>



    );
  };
  
  type Group = {
    id: number,
    name: string,
    creation_criteria: string,
  }
  
  export default GroupsTable;
  