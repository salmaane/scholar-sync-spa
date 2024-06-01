import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  Flex,
  Select,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/scholarSync";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { capitalize } from "../../utils/text";

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(),
  creationCriteria: Yup.string()
    .oneOf(["RANDOM", "BY_SECTOR", "BY_DEPARTMENT"])
    .required(),
  users: Yup.array().required(),
});

const CreateDepartment = ({ setReload }: any) => {
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
  //--------------load users when updating criteria and criteriaValue-------------------
  const [criteria, setCreteria] = useState("");
  const [criteriaValue, setCreteriaValue] = useState<any>(0); //value of sector or department
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (criteria == "") {
      setUsers([]);
    } else {
      if (criteria == "RANDOM") {
        axiosFetch({
          url: "/group/prof",
          method: "get",
          handleResponse: (data: any) => setUsers(data),
        });
      } else if (criteria == "BY_SECTOR" && criteriaValue != 0) {
        axiosFetch({
          url: `/group/prof/sector/${criteriaValue}`,
          method: "get",
          handleResponse: (data: any) => setUsers(data),
        });
      } else if (criteria == "BY_DEPARTMENT" && criteriaValue != 0) {
        axiosFetch({
          url: `/group/prof/department/${criteriaValue}`,
          method: "get",
          handleResponse: (data: any) => setUsers(data),
        });
      }
    }
  }, [criteria, criteriaValue]);

  //form submission
  const onSubmit = (values: any, actions: any) => {
    axiosFetch({
      url: "/group/create",
      method: "post",
      data: values,
      handleResponse: () => {
        actions.setSubmitting(false);
        setShowSuccess(true);
        actions.resetForm();
        setReload((prev: number) => prev + 1);
        actions.resetForm();
        setCreteria("");
        setCreteriaValue(0);
      },
      handleError: () => {
        actions.setSubmitting(false);
        setShowError(true);
        actions.resetForm();
      },
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        creationCriteria: '',
        users: [],
      }}
      onSubmit={onSubmit}
      validationSchema={FORM_VALIDATION}
    >
      {(props) => (
        <Form>
          <Flex flexDirection={"column"} gap={3}>
            <Alert status="success" variant="left-accent" hidden={!showSuccess}>
              <AlertIcon />
              Department created successfully !
            </Alert>
            <Alert status="error" variant="left-accent" hidden={!showError}>
              <AlertIcon />
              Something went wrong, try again
            </Alert>
            <Card shadow={"none"} borderRadius={"20px"}>
              <CardHeader>
                <Heading as="h3" size={"md"}>
                  Create New Group
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack gap={4}>
                  <Stack
                    w={"100%"}
                    spacing={4}
                    alignItems={"start"}
                    direction={["column", "column", "row"]}
                    gap={3}
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
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="creationCriteria">
                      {({ field, form }: any) => (
                        <FormControl>
                          <FormLabel> Group Creation Creteria</FormLabel>
                          <Select
                            isInvalid={
                              form.errors.creation_criteria &&
                              form.touched.creation_criteria
                            }
                            variant={"auth"}
                            isRequired={true}
                            {...field}
                            onChange={(e) => {
                              form.handleChange(e);
                              setCreteria(e.target.value || "");
                            }}
                            placeholder="Select a criteria"
                          >
                            <option value="RANDOM">Random</option>
                            <option value="BY_SECTOR">By Sector</option>
                            <option value="BY_DEPARTMENT">By Department</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.creation_criteria}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>

                  {/* display sectors or department dynamically */}
                  <Stack
                    w={"100%"}
                    spacing={4}
                    alignItems={"start"}
                    direction={["column", "column", "row"]}
                  >
                    {criteria == "BY_SECTOR" && (
                        <FormControl>
                          <FormLabel>Sector</FormLabel>
                          <Select
                            isRequired={true}
                            onChange={(e) => {
                              setCreteriaValue(e.target.value || 0);
                            }}
                            variant={"auth"}
                            placeholder="Select a Sector"
                          >
                            {sectors?.map((sector: any, index: number) => (
                              <option key={index} value={sector.id}>
                                {capitalize(sector.name)}
                              </option> 
                            ))}
                          </Select>
                        </FormControl>
                    )}
                    {criteria == "BY_DEPARTMENT" && (
                          <FormControl>
                            <FormLabel>Department</FormLabel>
                            <Select
                              variant={"auth"}
                              isRequired={true}
                              onChange={(e) => {
                                setCreteriaValue(e.target.value || 0);
                              }}
                              placeholder="Select a Department"
                            >
                              {departments?.map(
                                (department: any, index: number) => (
                                  <option key={index} value={department.id}>
                                    {capitalize(department.name)}
                                  </option>
                                )
                              )}
                            </Select>
                          </FormControl>
                    )}
                  </Stack>

                  {/* display professors */}
                  {users.length > 0 && (
                    <Stack gap={4}>
                      <Heading as="h6" size={"sm"}>
                        Select professors for the group
                      </Heading>
                      <Flex direction={"row"} gap={"30px"}>
                        {users.map((user: any, index: number) => (
                          <Field name="users" key={index}>
                            {({ field }: any) => (
                              <Checkbox w={"20%"} {...field} value={user.id}>
                                {capitalize(user.firstName) +
                                  " " +
                                  capitalize(user.lastName)}
                              </Checkbox>
                            )}
                          </Field>
                        ))}
                      </Flex>
                    </Stack>
                  )}
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
};

export default CreateDepartment;
