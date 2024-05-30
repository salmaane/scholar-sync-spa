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

  const SectorsTable = ({ sectors, setReload}: any) => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const [selectedSectorId, setSelectedSectorId] = useState(0);

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
      Sector deleted successfully !
      </Alert>
      <Alert status="success" variant="left-accent" hidden={!updateSuccess}>
      <AlertIcon />
      Sector updated successfully !
      </Alert>
      <Card shadow={'none'} borderRadius={'20px'}>
        <CardHeader>
          <Heading as="h3" size={"md"}>
            Sectors
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
                {sectors?.map((sector: Sector, index: number) => (
                  <Tr key={index}>
                    <Td>{sector.id}</Td>
                    <Td>{capitalize(sector.name)}</Td>
                    <Td display={"flex"} gap={1}>
                      <IconButton
                        onClick={() => setSelectedSector(sector)}
                        size={"sm"}
                        variant="lightBrand"
                        aria-label="update"
                        icon={<MdEdit size={"18px"} />}
                      />
                      <IconButton
                        onClick={() => setSelectedSectorId(sector.id)}
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

        {selectedSector != null &&
        <ModalUpdate
          sector={selectedSector}
          onClose={() => setSelectedSector(null)}
          setReload={setReload}
          setUpdateSuccess={setUpdateSuccess}
        />}

        {selectedSectorId!=0 &&
        <ModalDelete
          sectorId={selectedSectorId}
          onClose={() => setSelectedSectorId(0)}
          setReload={setReload}
          setDeleteSuccess={setDeleteSuccess}
        />
        }
      </Card></>



    );
  };
  
  type Sector = {
    id: number,
    name: string,
  }
  
  export default SectorsTable;
  