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
  Select,
} from '@chakra-ui/react';
import axios from '../../apis/scholarSync';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const FORM_VALIDATION = Yup.object().shape({
  block: Yup.string().oneOf(["NB", "AB", "Amphi"]).required(),
  capacity: Yup.number().integer('Capacity must be an integer').min(0, 'Capacity must be at least 0').required(),
  number: Yup.number().integer('Capacity must be an integer').min(0, 'Capacity must be at least 0').required(),
});

const ModalUpdate = ({ class_, onClose, setReload, setUpdateSuccess }: any) => {
  const [, , , axiosFetch] = useAxiosFunction(axios);

  const onSubmit = (values: any, actions: any) => {
      axiosFetch({
        url: `/class/${class_.id}`,
        method: 'put',
        data: values,
        handleResponse: () => {
          setUpdateSuccess(true);
          setReload((prev: number) => prev + 1);
          onClose();
          actions.setSubmitting(false);
        },
        handleError: (error : any) => {
          console.log(error)
          actions.setSubmitting(false);
        }
      })
  };  

  return (
        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Class</ModalHeader>
            <ModalCloseButton />
            <Formik
              initialValues={{
                block: class_.block,
                capacity: class_.capacity,
                number: class_.number,
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
      <Stack
                        w={"100%"}
                        spacing={4}
                        alignItems={"start"}
                        direction={["column", "column", "row"]}
                        >
                            <Field name="block">
                              {({ field, form }: any) => (
                                <FormControl>
                                  <FormLabel>block</FormLabel>
                                  <Select
                                    isInvalid={
                                      form.errors.block && form.touched.block
                                    }
                                    variant={"auth"}
                                    isRequired={true}
                                    {...field}
                                    onChange={form.handleChange}
                                    placeholder="Select a Block"
                                  >
                                      <option value="Amphi">Amphi</option>
                                      <option value="NB">NB</option>
                                      <option value="AB">AB</option>
                                  </Select>
                                  <FormErrorMessage>
                                    {form.errors.Block}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>

                            <Field name="number">
                                {({ field, form }: any) => (
                                <FormControl
                                    isInvalid={form.errors.number && form.touched.number}
                                >
                                    <FormLabel>Number</FormLabel>
                                    <Input
                                    isRequired={true}
                                    {...field}
                                    onChange={form.handleChange}
                                    variant={"auth"}
                                    type="number"
                                    />
                                    <FormErrorMessage>{form.errors.number}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name="capacity">
                                {({ field, form }: any) => (
                                <FormControl
                                    isInvalid={form.errors.capacity && form.touched.capacity}
                                >
                                    <FormLabel>Capacity</FormLabel>
                                    <Input
                                    isRequired={true}
                                    {...field}
                                    onChange={form.handleChange}
                                    variant={"auth"}
                                    type="number"
                                    />
                                    <FormErrorMessage>{form.errors.capacity}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                        </Stack>
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