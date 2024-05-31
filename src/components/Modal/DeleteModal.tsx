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
} from "@chakra-ui/react";
import axios from "../../apis/scholarSync";
import useAxiosFunction from "../../hooks/useAxiosFunction";

const ModalDelete = ({
  url,
  message,
  onClose,
  setReload,
  setDeleteSuccess,
  setShowError
}: any) => {
  const [, , , axiosFetch] = useAxiosFunction(axios);
  const handleDelete = () => {
    axiosFetch({
      url: url,
      method: "delete",
      handleResponse: () => {
        setReload((prev: number) => prev + 1);
        setDeleteSuccess(true);
      },
      handleError: () => {
        setShowError(true);
      }
    });

    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete sector</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text my={3} color="red.500">
            {message}
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
