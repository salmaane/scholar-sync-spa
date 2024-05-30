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

const ModalDelete = ({ class_, onClose, setReload, setDeleteSuccess}:any) => {
  const [, , , axiosFetch] = useAxiosFunction(axios);
  const handleDelete = () => {
    axiosFetch({
        url: `/class/${class_.id}`,
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
        <ModalHeader>Delete Class</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <Text my={3} color="red.500">
            Are you sure you want to delete class <b>{class_.block=="Amphi"? `${class_.block} ${class_.number}` : `${class_.number+class_.block}`}</b>?
          </Text>        
        </ModalBody>
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