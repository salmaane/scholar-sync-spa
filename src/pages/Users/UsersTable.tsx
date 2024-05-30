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
  Tag
} from "@chakra-ui/react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { formatDate } from "../../utils/date";
import { capitalize } from "../../utils/text";
import { NavLink } from "react-router-dom";
const UsersTable = ({ users }: any) => {
   const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Card shadow={"none"} borderRadius={"20px"}>
      <CardHeader>
        <Heading as="h3" size={"md"}>
          Users
        </Heading>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table variant="simple" size={"md"}>
            <Thead>
              <Tr>
                <Th borderColor={borderColor}>Id</Th>
                <Th borderColor={borderColor}>First Name</Th>
                <Th borderColor={borderColor}>Last Name</Th>
                <Th borderColor={borderColor}>Email</Th>
                <Th borderColor={borderColor}>Role</Th>
                <Th borderColor={borderColor}>Member since</Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((user: User, index: number) => (
                <Tr key={index}>
                  <Td>{user.id}</Td>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Tag
                      variant={"solid"}
                      justifyContent={"center"}
                      w={"60px"}
                      colorScheme={user.role == "ADMIN" ? "green" : "navy"}
                    >
                      {capitalize(user.role)}
                    </Tag>
                  </Td>
                  <Td>{formatDate(user.createdAt)}</Td>
                  <Td display={"flex"} gap={1}>
                    <NavLink to={'update'} state={user}>
                    </NavLink>
                    <IconButton
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
    </Card>
  );
};

type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  createdAt: string,
  updatedAt: string,
}

export default UsersTable;
