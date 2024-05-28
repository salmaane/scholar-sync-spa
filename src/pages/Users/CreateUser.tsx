import { FormControl, FormLabel, FormErrorMessage, HStack, Input, Stack, Select, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from '../../apis/scholarSync'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  role: Yup.string().oneOf(["ADMIN", "PROF"]).required(),
  password: Yup.string().required(),
  departmentId: Yup.number().positive(),
  sectorId: Yup.number().positive(),
});

const CreateUser = () => {
    const [sectors, setSectors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [, , , axiosFetch] = useAxiosFunction(axios)

    useEffect(() => {
        axiosFetch({
            url: '/sector',
            method: 'get',
            handleResponse: (data : any) => setSectors(data),
        })
        axiosFetch({
          url: "/department",
          method: "get",
          handleResponse: (data: any) => setDepartments(data),
        });
    }, []);

    const onSubmit = (values : any, actions : any) => {
        console.log(values);
        console.log("submit")

        actions.setSubmitting(false);
    }
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        role: "PROF",
        password: "",
        departmentId: null,
        sectorId: null,
      }}
      onSubmit={onSubmit}
      validationSchema={FORM_VALIDATION}
    >
      {(props) => (
        <Form>
          <Stack gap={3}>
            <HStack w={"100%"} gap={4}>
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
            </HStack>
            <HStack w={"100%"} gap={4}>
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
            </HStack>
            {props.getFieldMeta("role").value == "PROF" && (
              <HStack w={"100%"} gap={4}>
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
                      >
                        {departments?.map((department: any, index: number) => (
                          <option key={index} value={department.id}>
                            {department.name}
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
                      >
                        {sectors?.map((sector: any, index: number) => (
                          <option key={index} value={sector.id}>
                            {sector.name}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {form.errors.sectorId}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </HStack>
            )}
            <HStack w={"100%"} gap={4}>
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
            </HStack>
            <Button
              size="md"
              height="48px"
              width="200px"
              variant={"navy"}
              w={"100%"}
              mt={3}
              type="submit"
            >
              Create
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default CreateUser