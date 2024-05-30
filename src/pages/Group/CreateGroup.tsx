import { FormControl, FormLabel, FormErrorMessage, Stack, Input, Flex, Select, Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from '../../apis/scholarSync'
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {Alert, AlertIcon } from "@chakra-ui/react";
import { capitalize } from "../../utils/text";

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(),
  creation_criteria: Yup.string().oneOf(["RANDOM", "BY_SECTOR", "BY_DEPARTMENT"]).required(),
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

  //------------
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
  //--------------load users when updating creteria and creteriaValue-------------------
  const [creteria, setCreteria] = useState("");
  const [creteriaValue, setCreteriaValue] = useState(0);//value of sector or department
  const [users, setUsers] = useState([]);


  useEffect(() => {
    if(creteria==""){
      setUsers([]);
    }else{
      if(creteria == "RANDOM"){
        console.log("random creteria")
        axiosFetch({
          url: "/group/prof",
          method: "get",
          handleResponse: (data: any) => setUsers(data),
        });
      }else if(creteria == "BY_SECTOR" && creteriaValue!=0){
        axiosFetch({
          url: `/group/prof/sector/${creteriaValue}`,
          method: "get",
          handleResponse: (data: any) => setUsers(data),
        });
      }else if(creteria == "BY_DEPARTMENT" && creteriaValue!=0){
        axiosFetch({
          url: `/group/prof/department/${creteriaValue}`,
          method: "get",
          handleResponse: (data: any) => setUsers(data),
        });
      }
    }
  }, [creteria, creteriaValue])
  



  //formsubmission
  const onSubmit = (values: any, actions: any) => {
    axiosFetch({
      url:'/department',
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
                Department created successfully !
                </Alert>
                <Alert status="error" variant="left-accent" hidden={!showError}>
                <AlertIcon />
                Something went wrong, try again
                </Alert>
                <Card shadow={'none'} borderRadius={'20px'}>
                    <CardHeader>
                    <Heading as="h3" size={"md"}>
                        Create New Department
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
                        <Field name="creation_creteria">
                            {({ field, form }: any) => (
                              <FormControl>
                                <FormLabel> Group Creation Creteria</FormLabel>
                                <Select
                                  isInvalid={
                                    form.errors.creation_creteria && form.touched.creation_creteria
                                  }
                                  variant={"auth"}
                                  isRequired={true}
                                  {...field}
                                  onChange={(e) => {
                                    form.handleChange(e);
                                    setCreteria(e.target.value || "");
                                  }}                                    
                                  placeholder="Select a creteria"
                                >
                                    <option value="RANDOM">Random</option>
                                    <option value="BY_SECTOR">By Sector</option>
                                    <option value="BY_DEPARTMENT">By Department</option>
                                </Select>
                                <FormErrorMessage>
                                  {form.errors.creation_creteria}
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
                        {creteria == "RANDOM"}
                        {creteria == "BY_SECTOR" &&
                        <Field name="sectorId">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.sectorId && form.touched.sectorId}
                          >
                            <FormLabel>Sector</FormLabel>
                            <Select
                              isRequired={true}
                              {...field}
                              onChange={(e) => {
                                form.handleChange(e);
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
                            <FormErrorMessage>
                              {form.errors.sectorId}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                        </Field>}
                        {creteria == "BY_DEPARTMENT" &&
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
                                onChange={(e) => {
                                  form.handleChange(e);
                                  setCreteriaValue(e.target.value || 0);
                                }}
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
                        </Field>}
                      </Stack>

                      {/* display proffesors */}
                      {users && 
                      }

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

export default CreateDepartment