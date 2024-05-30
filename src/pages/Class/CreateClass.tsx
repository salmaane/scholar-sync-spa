import { FormControl, FormLabel, FormErrorMessage, Stack, Input, Flex, Select, Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from '../../apis/scholarSync'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {Alert, AlertIcon } from "@chakra-ui/react";

const FORM_VALIDATION = Yup.object().shape({
  block: Yup.string().oneOf(["NB", "AB", "Amphi"]).required(),
  capacity: Yup.number().integer('Capacity must be an integer').min(0, 'Capacity must be at least 0').required(),
  number: Yup.number().integer('Capacity must be an integer').min(0, 'Capacity must be at least 0').required(),
});

const CreateClass = ({ setReload }: any) => {
  // Allert
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(false);
      setShowError(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [showSuccess, showError]);


  const [, , , axiosFetch] = useAxiosFunction(axios);

  // form submission
  const onSubmit = (values: any, actions: any) => {
    axiosFetch({
      url:'/class',
      method:'post',  
      data: values,
      handleResponse: () => {
        actions.setSubmitting(false);
        setShowSuccess(true)
        actions.resetForm()
        setReload((prev: number)=>prev+1)
      },
      handleError: () => {
        actions.setSubmitting(false);
        setShowError(true)
        actions.resetForm()
      },
    })
  };

  return (
    <Formik
      initialValues={{
        block: "",
        capacity: "",
        number: "",
      }}
      onSubmit={onSubmit}
      validationSchema={FORM_VALIDATION}
    >
      {(props) => (
          <Form>
            <Flex flexDirection={"column"} gap={3}>
                <Alert status="success" variant="left-accent" hidden={!showSuccess}>
                <AlertIcon />
                Class created successfully !
                </Alert>
                <Alert status="error" variant="left-accent" hidden={!showError}>
                <AlertIcon />
                Something went wrong, try again
                </Alert>
                <Card shadow={'none'} borderRadius={'20px'}>
                    <CardHeader>
                    <Heading as="h3" size={"md"}>
                        Create New Class
                    </Heading>
                    </CardHeader>
                    <CardBody>
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
                                    min={1}
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
                                    min={1}
                                    />
                                    <FormErrorMessage>{form.errors.capacity}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                        </Stack>
                    </CardBody>
                </Card>
                <Button
                size="md"
                height="48px"
                width="200px"
                variant={"navy"}
                w={"100%"}
                mt={1}
                type="submit"
                isLoading={props.isSubmitting}
                >
                Create
                </Button>
            </Flex>
            </Form>
      )}
    </Formik>
  );
}

export default CreateClass