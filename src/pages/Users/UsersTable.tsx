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
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

const UsersTable = ({ users }: any) => {

  const formatDate = (date : string) => {

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size={"md"}>
          Users
        </Heading>
      </CardHeader>
      <CardBody>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Member since</Th>
                <Th></Th>
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
                    {user.role[0].toUpperCase() +
                      user.role.substring(1).toLocaleLowerCase()}
                  </Td>
                  <Td>{formatDate(user.createdAt)}</Td>
                  <Td display={"flex"} gap={1}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="update"
                      icon={<MdEdit size={"18px"} />}
                    />
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
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
