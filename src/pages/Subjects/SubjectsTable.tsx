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
  import ModalDelete from "./ModalDelete";
  import { useEffect, useState } from "react";
  import ModalUpdate from "./ModalUpdate";
import DeleteModal from "../../components/Modal/DeleteModal";

  const SubjectsTable = ({ subjects, setReload}: any) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
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
      Subject deleted successfully !
      </Alert>
      <Alert status="success" variant="left-accent" hidden={!updateSuccess}>
      <AlertIcon />
      Subject updated successfully !
      </Alert>
      <Card shadow={'none'} borderRadius={'20px'}>
        <CardHeader>
          <Heading as="h3" size={"md"}>
            Subjects
          </Heading>
        </CardHeader>
        <CardBody>

          <TableContainer>
            <Table variant="simple" size={"md"}>
              <Thead>
                <Tr>
                  <Th borderColor={borderColor}>Id</Th>
                  <Th borderColor={borderColor}>Title</Th>
                  <Th borderColor={borderColor}>Level</Th>
                  <Th borderColor={borderColor}>Type</Th>
                  <Th borderColor={borderColor}>Professor</Th>
                  <Th borderColor={borderColor}>Coordinator</Th>
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                  {console.log(subjects)}
                {subjects?.map((subject: subject, index: number) => (
                  <Tr key={index}>
                    <Td>{subject.id}</Td>
                    <Td>{subject.title}</Td>
                    <Td>{subject.level}</Td>
                    <Td>{subject.type}</Td>
                    <Td>{subject.professor?.email}</Td>
                    <Td>{subject.coordinator?.email}</Td>
                    <Td display={"flex"} gap={1}>
                      <IconButton
                        onClick={() => {setAction("update");setSelectedSubject(subject)}}
                        size={"sm"}
                        variant="lightBrand"
                        aria-label="update"
                        icon={<MdEdit size={"18px"} />}
                      />
                      <IconButton
                        onClick={() => {setAction("delete");setSelectedSubject(subject)}}
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

        {selectedSubject != null &&  action=="update" &&
        <ModalUpdate
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
          setReload={setReload}
          setUpdateSuccess={setUpdateSuccess}
        />}

        {selectedSubject!=null && action=="delete" &&
        <DeleteModal
          url={'/subject/' + selectedSubject.id}
          message={
            `Are you sure you want to delete subject ${selectedSubject.title}?`
          }
          onClose={() => setSelectedSubject(null)}
          setReload={setReload}
          setDeleteSuccess={setDeleteSuccess}
        />
        }
      </Card></>



    );
  };
  
  type subject = {
    id: number,
    title: string,
    level: string,
    type: string,
    professor: prof,
    coordinator: prof,
  }

  type prof = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    createdAt: string,
    updatedAt: string,
  }
  export default SubjectsTable;
  