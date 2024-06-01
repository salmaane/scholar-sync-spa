import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Card,
  CardBody,
  CardHeader,
  Heading,
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
import SubjectSelection from "./SubjectSelection";


const CreateExam = ({ setReload }: any) => {
  const [subject, setSubject] = useState<any>();

  // get Exam Information
  const [information, setInformation] = useState<any>();
  const [, , , axiosFetch] = useAxiosFunction(axios);
  useEffect(() => {
    axiosFetch({
      url: "/information",
      method: "get",
      handleResponse: (data: any) => setInformation(data),
    });
  }, []);

  // form submission
  const onSubmit = (values: any, actions: any) => {
    console.log(values);

    actions.setSubmitting(false);
  };

  const FORM_VALIDATION = Yup.object().shape({

  });

  return (
    <Flex w={"100%"} direction={"column"} gap={8}>
      <SubjectSelection setSubject={setSubject} />
      {
        /*subject*/ true && (
          <Card shadow={"none"} borderRadius={"20px"}>
            <CardHeader>
              <Heading as="h3" size={"sm"} color={"#111111"}>
                Create Exam
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack gap={4}>
                <Formik
                  initialValues={{
                    academicYear: information?.academicYear,
                    semester: information?.semester,
                    session: "REGULAR",
                    type: "EXAM",
                    date: "",
                    durationMinutes: subject?.type == "SUBJECT" ? "120" : "90",
                    startHour: '',
                  }}
                  onSubmit={onSubmit}
                  validationSchema={FORM_VALIDATION}
                >
                  {(props) => (
                    <Form>
                      <Flex flexDirection={"column"} gap={3}>
                        <Stack
                          w={"100%"}
                          spacing={4}
                          alignItems={"start"}
                          direction={["column", "column", "column", "row"]}
                        >
                          <Field name="academicYear">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.academicYear &&
                                  form.touched.academicYear
                                }
                              >
                                <FormLabel>Academic Year</FormLabel>
                                <Input
                                  isRequired={true}
                                  {...field}
                                  value={information?.academicYear}
                                  variant={"auth"}
                                  type="text"
                                  disabled
                                  _disabled={{ color: "#00000" }}
                                />
                                <FormErrorMessage>
                                  {form.errors.academicYear}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="semester">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.semester && form.touched.semester
                                }
                              >
                                <FormLabel>Semester</FormLabel>
                                <Input
                                  isRequired={true}
                                  {...field}
                                  value={information?.semester}
                                  variant={"auth"}
                                  type="text"
                                  disabled
                                  _disabled={{ color: "#00000" }}
                                />
                                <FormErrorMessage>
                                  {form.errors.semester}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="session">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.session && form.touched.session
                                }
                              >
                                <FormLabel>Session</FormLabel>
                                <Select
                                  variant={"auth"}
                                  isRequired={true}
                                  {...field}
                                  onChange={form.handleChange}
                                >
                                  <option value="REGULAR" selected>
                                    Regular
                                  </option>
                                  <option value="RESIT">Resit</option>
                                </Select>
                                <FormErrorMessage>
                                  {form.errors.session}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="type">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.type && form.touched.type
                                }
                              >
                                <FormLabel>Type</FormLabel>
                                <Select
                                  variant={"auth"}
                                  isRequired={true}
                                  {...field}
                                  onChange={form.handleChange}
                                >
                                  <option value="EXAM" selected>
                                    Exam
                                  </option>
                                  <option value="SUPERVISED_TEST">
                                    Supervised Test
                                  </option>
                                </Select>
                                <FormErrorMessage>
                                  {form.errors.type}
                                </FormErrorMessage>
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
                          <Field name="date">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.date && form.touched.date
                                }
                              >
                                <FormLabel>Date</FormLabel>
                                <Input
                                  isRequired={true}
                                  {...field}
                                  onChange={form.handleChange}
                                  variant={"auth"}
                                  type="date"
                                />
                                <FormErrorMessage>
                                  {form.errors.date}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="durationMinutes">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.durationMinutes &&
                                  form.touched.durationMinutes
                                }
                              >
                                <FormLabel>Duration</FormLabel>
                                <Select
                                  variant={"auth"}
                                  isRequired={true}
                                  {...field}
                                  onChange={form.handleChange}
                                  disabled
                                  _disabled={{ color: "#000" }}
                                >
                                  <option>
                                    {subject?.type == "SUBJECT"
                                      ? "2h"
                                      : "1h30m"}
                                  </option>
                                </Select>
                                <FormErrorMessage>
                                  {form.errors.durationMinutes}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name="startHour">
                            {({ field, form }: any) => (
                              <FormControl
                                isInvalid={
                                  form.errors.durationMinutes &&
                                  form.touched.durationMinutes
                                }
                              >
                                <FormLabel>Hour</FormLabel>
                                <Select
                                  variant={"auth"}
                                  {...field}
                                  isRequired={true}
                                  placeholder="Select an Hour"
                                  onChange={form.handleChange}
                                >
                                  <option value="h_8">
                                    8h {" --> "}
                                    {subject?.type == "SUBJECT"
                                      ? "10h"
                                      : "9h30"}
                                  </option>
                                  <option value="h_10">
                                    10h {" --> "}
                                    {subject?.type == "SUBJECT"
                                      ? "12h"
                                      : "11h30"}
                                  </option>
                                  <option value="h_14">
                                    14h {" --> "}
                                    {subject?.type == "SUBJECT"
                                      ? "16h"
                                      : "15h30"}
                                  </option>
                                  <option value="h_16">
                                    16h {" --> "}
                                    {subject?.type == "SUBJECT"
                                      ? "18h"
                                      : "17h30"}
                                  </option>
                                </Select>
                                <FormErrorMessage>
                                  {form.errors.durationMinutes}
                                </FormErrorMessage>
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
                                      form.errors.departmentId &&
                                      form.touched.departmentId
                                    }
                                    variant={"auth"}
                                    isRequired={true}
                                    {...field}
                                    onChange={form.handleChange}
                                    placeholder="Select a Department"
                                  ></Select>
                                  <FormErrorMessage>
                                    {form.errors.departmentId}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                            <Field name="sectorId">
                              {({ field, form }: any) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.sectorId &&
                                    form.touched.sectorId
                                  }
                                >
                                  <FormLabel>Sector</FormLabel>
                                  <Select
                                    isRequired={true}
                                    {...field}
                                    onChange={form.handleChange}
                                    variant={"auth"}
                                    placeholder="Select a Sector"
                                  ></Select>
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
                                isInvalid={
                                  form.errors.password && form.touched.password
                                }
                              >
                                <FormLabel>password</FormLabel>
                                <Input
                                  isRequired={true}
                                  {...field}
                                  onChange={form.handleChange}
                                  type="password"
                                  variant={"auth"}
                                />
                                <FormErrorMessage>
                                  {form.errors.password}
                                </FormErrorMessage>
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
              </Stack>
            </CardBody>
          </Card>
        )
      }
    </Flex>
  );
};



export default CreateExam;
