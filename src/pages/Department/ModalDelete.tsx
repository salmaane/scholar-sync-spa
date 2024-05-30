import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';
import axios from '../../apis/scholarSync'
import useAxiosFunction from '../../hooks/useAxiosFunction';

const ModalDelete = ({ departmentId, onClose, setReload, setDeleteSuccess}:any) => {
  const [, , , axiosFetch] = useAxiosFunction(axios);
  const handleDelete = () => {
    axiosFetch({
        url: `/department/${departmentId}`,
        method: 'delete',
    });
    setReload((prev: number)=>prev+1);
    setDeleteSuccess(true);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Department</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <Text my={3} color="red.500">
            Warning: If you delete this department, the professors assigned to this department will no longer be assigned to any department.
          </Text>        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="ghost" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;