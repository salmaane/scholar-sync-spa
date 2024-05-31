import { FormControl, FormLabel, FormErrorMessage, Stack, Input, Flex, Select, Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from '../../apis/scholarSync'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {Alert, AlertIcon } from "@chakra-ui/react";
import { capitalize } from "../../utils/text";

const FORM_VALIDATION = Yup.object().shape({
  title:Yup.string().required(),
  level: Yup.string().oneOf(["LEVEL_1", "LEVEL_2", "LEVEL_3"]).required(),
  type: Yup.string().oneOf(["SUBJECT", "ELEMENT"]).required(),
  professorId: Yup.number().required(),
  coordinatorId: Yup.number().required(),
});

const CreateSubject = ({ setReload }: any) => {
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
      url:'/subject/create',
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
  const [profs, setProfs] = useState<Prof[]>([]);
  useEffect(() => {
    axiosFetch({
      url: "/group/prof",
      method: "get",
      handleResponse: (data: any) => setProfs(data),
    });
  }, []);

  return (
    <Formik
      initialValues={{
        title: "",
        level: "",  
        type: "",
        professorId: '',
        coordinatorId: '',
      }}
      onSubmit={onSubmit}
      validationSchema={FORM_VALIDATION}
    >
      {(props) => (
          <Form>
            <Flex flexDirection={"column"} gap={3}>
                <Alert status="success" variant="left-accent" hidden={!showSuccess}>
                <AlertIcon />
                Subject created successfully !
                </Alert>
                <Alert status="error" variant="left-accent" hidden={!showError}>
                <AlertIcon />
                Something went wrong, try again
                </Alert>
                <Card shadow={'none'} borderRadius={'20px'}>
                    <CardHeader>
                    <Heading as="h3" size={"md"}>
                        Create New Subject
                    </Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack
                          w={"100%"}
                          spacing={4}
                          alignItems={"start"}
                          direction={["column", "column", "row"]}
                          >
                          <Field name="title">
                            {({ field, form }: any) => (
                            <FormControl
                                isInvalid={form.errors.title && form.touched.title}
                            >
                                <FormLabel>Title</FormLabel>
                                <Input
                                isRequired={true}
                                {...field}
                                onChange={form.handleChange}
                                variant={"auth"}
                                type="text"
                                min={1}
                                />
                                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                            </FormControl>
                            )}
                          </Field>
                          <Stack
                            w={"100%"}
                            spacing={4}
                            alignItems={"start"}
                            direction={["column", "column", "row"]}
                            >
                            <Field name="level">
                              {({ field, form }: any) => (
                                <FormControl>
                                  <FormLabel>Level</FormLabel>
                                  <Select
                                    isInvalid={
                                      form.errors.level && form.touched.level
                                    }
                                    variant={"auth"}
                                    isRequired={true}
                                    {...field}
                                    onChange={form.handleChange}
                                    placeholder="Select a level"
                                  >
                                      <option value="LEVEL_1">L1</option>
                                      <option value="LEVEL_2">L2</option>
                                      <option value="LEVEL_3">L3</option>
                                  </Select>
                                  <FormErrorMessage>
                                    {form.errors.level}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="type">
                              {({ field, form }: any) => (
                                <FormControl>
                                  <FormLabel>Type</FormLabel>
                                  <Select
                                    isInvalid={
                                      form.errors.type && form.touched.type
                                    }
                                    variant={"auth"}
                                    isRequired={true}
                                    {...field}
                                    onChange={form.handleChange}
                                    placeholder="Select a type"
                                  >
                                      <option value="SUBJECT">Subject</option>
                                      <option value="ELEMENT">Element</option>
                                  </Select>
                                  <FormErrorMessage>
                                    {form.errors.type}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Stack>
                        </Stack>

                        <Stack
                          w={"100%"}
                          spacing={4}
                          alignItems={"start"}
                          direction={["column", "column", "row"]}
                          >
                          <Field name="professorId">
                            {({ field, form }: any) => (
                              <FormControl>
                                <FormLabel>Professor</FormLabel>
                                <Select
                                  isInvalid={
                                    form.errors.professorId && form.touched.professorId
                                  }
                                  variant={"auth"}
                                  isRequired={true}
                                  {...field}
                                  onChange={form.handleChange}
                                  placeholder="Select a Professor"
                                >
                                  {profs?.map((prof: Prof, index: number) => (
                                    <option key={index} value={prof.id}>
                                      {capitalize(prof.email)}
                                    </option>
                                  ))}
                                </Select>
                                <FormErrorMessage>
                                  {form.errors.professorId}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="coordinatorId">
                            {({ field, form }: any) => (
                              <FormControl>
                                <FormLabel>Coordinator</FormLabel>
                                <Select
                                  isInvalid={
                                    form.errors.coordinatorId && form.touched.coordinatorId
                                  }
                                  variant={"auth"}
                                  isRequired={true}
                                  {...field}
                                  onChange={form.handleChange}
                                  placeholder="Select a Coordinator"
                                >
                                  {profs?.map((prof: Prof, index: number) => (
                                    <option key={index} value={prof.id}>
                                      {capitalize(prof.email)}
                                    </option>
                                  ))}
                                </Select>
                                <FormErrorMessage>
                                  {form.errors.coordinatorId}
                                </FormErrorMessage>
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

  type Prof = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    createdAt: string,
    updatedAt: string,
  }
  export default CreateSubject;
