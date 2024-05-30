import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  FormErrorMessage,
  FormLabel,
  Stack,
  Input,
  Card,
  CardBody,
  FormControl,
} from '@chakra-ui/react';
import axios from '../../apis/scholarSync';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const ModalUpdate = ({ sector, onClose, setReload, setUpdateSuccess }: any) => {
  const [, , , axiosFetch] = useAxiosFunction(axios);

  const onSubmit = (values: any, actions: any) => {
      axiosFetch({
        url: `/sector/${sector.id}`,
        method: "put",
        data: values,
        handleResponse: () => {
          setUpdateSuccess(true);
          setReload((prev: number) => prev + 1);
          onClose();
          actions.setSubmitting(false);
        },
        handleError: (error: any) => {
          console.log(error);
          actions.setSubmitting(false);
        },
      });
  };  

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Sector</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            name: sector.name,
          }}
          onSubmit={onSubmit}
          validationSchema={FORM_VALIDATION}
        >
          {(props) => (
            <Form>
              <ModalBody>
                <Flex flexDirection="column" gap={3}>
                  <Card shadow="none" borderRadius="20px">
                    <CardBody>
                      <Stack w="100%" spacing={4} alignItems="start">
                        <Field name="name">
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel>Name</FormLabel>
                              <Input {...field} variant="auth" type="text" />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Stack>
                    </CardBody>
                  </Card>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="green"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdate;