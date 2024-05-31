import {
    Card, CardHeader, CardBody,
    TableContainer, Table, Thead, Tbody, Tr, Th, Td,
    Heading,
    IconButton,
    useColorModeValue,
    Alert,
    AlertIcon,
    Tag
  } from "@chakra-ui/react";
  import { MdOutlineDeleteOutline } from "react-icons/md";
  import { capitalize } from "../../utils/text";
  import { useEffect, useState } from "react";
  import DeleteModal from "../../components/Modal/DeleteModal";

  const GroupsTable = ({ groups, setReload}: any) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  const [selectedGroupId, setSelectedGroupId] = useState(0);

  // Allert
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleteSuccess(false);
      setShowError(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [deleteSuccess, showError]);

    return (
      <>
        <Alert status="success" variant="left-accent" hidden={!deleteSuccess}>
          <AlertIcon />
          Group deleted successfully !
        </Alert>
        <Alert status="error" variant="left-accent" hidden={!showError}>
          <AlertIcon />
          Something went wrong, try again
        </Alert>
        <Card shadow={"none"} borderRadius={"20px"}>
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
                      <Td>{group.id}</Td>
                      <Td>{capitalize(group.name)}</Td>
                      <Td>
                        <Tag
                          variant={"solid"}
                          justifyContent={"center"}
                          w={"115px"}
                          colorScheme={
                            group.creationCriteria == "BY_SECTOR"
                              ? "green"
                              : "blue"
                          }
                        >
                          {group.creationCriteria == "BY_SECTOR"
                            ? "Sector"
                            : "Department"}
                        </Tag>
                      </Td>
                      <Td display={"flex"} gap={1}>
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

          {selectedGroupId != 0 && (
            <DeleteModal
              url={"/group/" + selectedGroupId}
              message={"Are you sure to delete this group?"}
              onClose={() => setSelectedGroupId(0)}
              setReload={setReload}
              setDeleteSuccess={setDeleteSuccess}
              setShowError={setShowError}
            />
          )}
        </Card>
      </>
    );
  };
  
  type Group = {
    id: number,
    name: string,
    creationCriteria: string,
  }
  
  export default GroupsTable;
  