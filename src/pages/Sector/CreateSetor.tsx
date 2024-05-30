import { FormControl, FormLabel, FormErrorMessage, Stack, Input, Flex, Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from '../../apis/scholarSync'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {Alert, AlertIcon } from "@chakra-ui/react";

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(),
});

const CreateSector = ({ setReload }: any) => {
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
      url:'/sector',
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
        name: "",
      }}
      onSubmit={onSubmit}
      validationSchema={FORM_VALIDATION}
    >
      {(props) => (
          <Form>
            <Flex flexDirection={"column"} gap={3}>
                <Alert status="success" variant="left-accent" hidden={!showSuccess}>
                <AlertIcon />
                Sector created successfully !
                </Alert>
                <Alert status="error" variant="left-accent" hidden={!showError}>
                <AlertIcon />
                Something went wrong, try again
                </Alert>
                <Card shadow={'none'} borderRadius={'20px'}>
                    <CardHeader>
                    <Heading as="h3" size={"md"}>
                        Create New Sector
                    </Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack
                        w={"100%"}
                        spacing={4}
                        alignItems={"start"}
                        direction={["column", "column", "row"]}
                        >
                            <Field name="name">
                                {({ field, form }: any) => (
                                <FormControl
                                    isInvalid={form.errors.name && form.touched.name}
                                >
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                    isRequired={true}
                                    {...field}
                                    onChange={form.handleChange}
                                    variant={"auth"}
                                    type="text"
                                    />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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

export default CreateSector