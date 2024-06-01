import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  Flex,
  Select,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/scholarSync";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { capitalize } from "../../utils/text";

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  role: Yup.string().oneOf(["ADMIN", "PROF"]).required(),
  password: Yup.string().required(),
  departmentId: Yup.number().positive().nullable(),
  sectorId: Yup.number().positive().nullable(),
});

const CreateUser = () => {
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

  // select input data
  const [sectors, setSectors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [, , , axiosFetch] = useAxiosFunction(axios);
  useEffect(() => {
    axiosFetch({
      url: "/sector",
      method: "get",
      handleResponse: (data: any) => setSectors(data),
    });
    axiosFetch({
      url: "/department",
      method: "get",
      handleResponse: (data: any) => setDepartments(data),
    });
  }, []);

  // form submission
  const onSubmit = (values: any, actions: any) => {
    axiosFetch({
      url: "/admin/register",
      method: "post",
      data: values,
      handleResponse: () => {
        actions.setSubmitting(false);
        setShowSuccess(true);
        actions.resetForm();
      },
      handleError: () => {
        actions.setSubmitting(false);
        setShowError(true);
      },
    });
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        role: "PROF",
        password: "",
        departmentId: undefined,
        sectorId: undefined,
      }}
      onSubmit={onSubmit}
      validationSchema={FORM_VALIDATION}
    >
      {(props) => (
        <Form>
          <Flex flexDirection={"column"} gap={3}>
            <Alert status="success" variant="left-accent" hidden={!showSuccess}>
              <AlertIcon />
              User created successfully !
            </Alert>
            <Alert status="error" variant="left-accent" hidden={!showError}>
              <AlertIcon />
              Something went wrong, try again
            </Alert>
            <Stack
              w={"100%"}
              spacing={4}
              alignItems={"start"}
              direction={["column", "column", "row"]}
            >
              <Field name="firstName">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.firstName && form.touched.firstName}
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      isRequired={true}
                      {...field}
                      onChange={form.handleChange}
                      variant={"auth"}
                      type="text"
                    />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.lastName && form.touched.lastName}
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      isRequired={true}
                      {...field}
                      onChange={form.handleChange}
                      variant={"auth"}
                      type="text"
                    />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Stack
              w={"100%"}
              gap={4}
              alignItems={"start"}
              direction={["column", "column", "row"]}
            >
              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      isRequired={true}
                      {...field}
                      onChange={form.handleChange}
                      variant={"auth"}
                      type="text"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="role">
                {({ field, form }: any) => (
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Select
                      isInvalid={form.errors.role && form.touched.role}
                      isRequired={true}
                      {...field}
                      variant={"auth"}
                      onChange={form.handleChange}
                    >
                      <option value="PROF">Professor</option>
                      <option value="ADMIN">Administrator</option>
                    </Select>
                    <FormErrorMessage>{form.errors.role}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            {props.getFieldMeta("role").value == "PROF" && (
              <Stack
                w={"100%"}
                gap={4}
                alignItems={"start"}
                direction={["column", "column", "row"]}
              >
                <Field name="departmentId">
                  {({ field, form }: any) => (
                    <FormControl>
                      <FormLabel>Department</FormLabel>
                      <Select
                        isInvalid={
                          form.errors.departmentId && form.touched.departmentId
                        }
                        variant={"auth"}
                        isRequired={true}
                        {...field}
                        onChange={form.handleChange}
                        placeholder="Select a Department"
                      >
                        {departments?.map((department: any, index: number) => (
                          <option key={index} value={department.id}>
                            {capitalize(department.name)}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {form.errors.departmentId}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="sectorId">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.sectorId && form.touched.sectorId}
                    >
                      <FormLabel>Sector</FormLabel>
                      <Select
                        isRequired={true}
                        {...field}
                        onChange={form.handleChange}
                        variant={"auth"}
                        placeholder="Select a Sector"
                      >
                        {sectors?.map((sector: any, index: number) => (
                          <option key={index} value={sector.id}>
                            {capitalize(sector.name)}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {form.errors.sectorId}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
            )}
            <Stack
              w={"100%"}
              gap={4}
              alignItems={"start"}
              direction={["column", "column", "row"]}
            >
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>password</FormLabel>
                    <Input
                      isRequired={true}
                      {...field}
                      onChange={form.handleChange}
                      type="password"
                      variant={"auth"}
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
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
};

export default CreateUser;
