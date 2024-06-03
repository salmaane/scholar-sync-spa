import {
  Alert,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormErrorMessage,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  Input,
  Flex,
  Select,
  Button,
  Checkbox,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../apis/scholarSync";
import { Formik, Field, Form, FieldArray} from "formik";
import * as Yup from "yup";
import SubjectSelection from "./SubjectSelection";
import { capitalize } from "../../utils/text";
import { useNavigate } from "react-router-dom";

const CreateExam = () => {
  const navigate = useNavigate()
  const [subject, setSubject] = useState<any>();
  const [professorCriteria, setProfessorCriteria] = useState("random");
  const [examDate, setExamDate] = useState<string>();
  const [startHour, setStartHour] = useState<string>();
  const [type, setType] = useState<string>("EXAM");
  const [session, setSession] = useState<string>("REGULAR");
  const [selectedClasses, setSelectedClasses] = useState<any>([]);
  const [showError, setShowError] = useState(false);

  // get Exam Information & groups
  const [information, setInformation] = useState<any>();
  const [groups, setGroups] = useState<any>();
  const [, , , axiosFetch] = useAxiosFunction(axios);
  useEffect(() => {
    axiosFetch({
      url: "/information",
      method: "get",
      handleResponse: (data: any) => setInformation(data),
    });
    axiosFetch({
      url: "/group",
      method: "get",
      handleResponse: (data: any) => setGroups(data),
    });
  }, []);

  // Get available classes
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    if (examDate && startHour) {
      DATE_SCHEMA.isValid(examDate)
        .then((res) => {
          if (res) {
            axiosFetch({
              url: "/class/available",
              method: "post",
              data: {
                date: examDate,
                startHour,
              },
              handleResponse: (data: any) => setClasses(data),
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [examDate, startHour]);

  // form submission
  const onSubmit = (values: any, actions: any) => {
    setShowError(false);
    axiosFetch({
      url: '/exam',
      method:'post',
      data: values,
      handleResponse: (res:any) => {
        console.log(res);
        actions.setSubmitting(false);
        actions.resetForm();
        setExamDate('');
        setStartHour('');
        navigate('/exam')
      },
      handleError: () => {
        actions.setSubmitting(false);
        setShowError(true);
      }
    });
  };

  const FORM_VALIDATION = Yup.object().shape({
    academicYear: Yup.string().required(),
    semester: Yup.string().required().oneOf(["SPRING", "AUTUMN"]),
    session: Yup.string().required().oneOf(["REGULAR", "RESIT"]),
    type: Yup.string().required().oneOf(["EXAM", "SUPERVISED_TEST"]),
    date: Yup.date()
      .required("La date est obligatoire")
      .test(
        "is-between",
        `Enter a valid date of the exams week`,
        function (value, context) {
          if (context.parent.type == "EXAM") {
            if (context.parent.session == "REGULAR") {
              const examsWeek = new Date(information?.examsWeekStartDate);
              return (
                value >= examsWeek &&
                value < new Date(examsWeek.setDate(examsWeek.getDate() + 7))
              );
            } else if (context.parent.session == "RESIT") {
              const resitExamsWeek = new Date(
                information?.resitExamsWeekStartDate
              );
              return (
                value >= resitExamsWeek &&
                value <=
                  new Date(resitExamsWeek.setDate(resitExamsWeek.getDate() + 7))
              );
            }
          } else if (context.parent.type == "SUPERVISED_TEST") {
            const stWeek = new Date(information?.supervisedTestsWeekStartDate);
            return (
              value >= stWeek &&
              value <= new Date(stWeek.setDate(stWeek.getDate() + 7))
            );
          }
        }
      ),
    durationMinutes: Yup.number().required(),
    startHour: Yup.string().required().oneOf(["h_8", "h_10", "h_14", "h_16"]),
    classes: Yup.array()
      .min(1, "You must select at least one class")
      .required("Classes is required"),
    subjectId: Yup.number().min(1),
  });

  const DATE_SCHEMA = Yup.date()
    .required("Date field is required")
    .test(
      "is-between",
      `Enter a valid date of the exams week`,
      function (value) {
        if (type == "EXAM") {
          if (session == "REGULAR") {
            const examsWeek = new Date(information?.examsWeekStartDate);
            return (
              value >= examsWeek &&
              value < new Date(examsWeek.setDate(examsWeek.getDate() + 7))
            );
          } else if (session == "RESIT") {
            const resitExamsWeek = new Date(
              information?.resitExamsWeekStartDate
            );
            return (
              value >= resitExamsWeek &&
              value <
                new Date(resitExamsWeek.setDate(resitExamsWeek.getDate() + 7))
            );
          }
        } else if (type == "SUPERVISED_TEST") {
          const stWeek = new Date(information?.supervisedTestsWeekStartDate);
          return (
            value >= stWeek &&
            value <= new Date(stWeek.setDate(stWeek.getDate() + 7))
          );
        }
      }
    );

  return (
    <Flex w={"100%"} direction={"column"} gap={8}>
      <SubjectSelection
        setSubject={setSubject}
        setExamDate={setExamDate}
        setStartHour={setStartHour}
      />
      {subject && (
        <Card shadow={"none"} borderRadius={"20px"}>
          <CardHeader>
            <Heading as="h3" size={"sm"} color={"#111111"}>
              Create Exam
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack>
              <Formik
                initialValues={{
                  academicYear: information?.academicYear,
                  semester: information?.semester,
                  session: "REGULAR",
                  type: "EXAM",
                  date: "",
                  durationMinutes: subject?.type == "SUBJECT" ? "120" : "90",
                  startHour: "",
                  groupId: 0,
                  classes: [],
                  subjectId: subject?.id,
                }}
                onSubmit={onSubmit}
                validationSchema={FORM_VALIDATION}
                enableReinitialize={true}
              >
                {(props) => (
                  <Form>
                    <Flex flexDirection={"column"} gap={7}>
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
                                variant={"auth"}
                                type="text"
                                readOnly
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
                                variant={"auth"}
                                type="text"
                                readOnly
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
                                onChange={(e) => {
                                  form.handleChange(e);
                                  setSession(e.target.value);
                                }}
                              >
                                <option value="REGULAR">Regular</option>
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
                              isInvalid={form.errors.type && form.touched.type}
                            >
                              <FormLabel>Type</FormLabel>
                              <Select
                                variant={"auth"}
                                isRequired={true}
                                {...field}
                                onChange={(e) => {
                                  form.handleChange(e);
                                  setType(e.target.value);
                                }}
                              >
                                <option value="EXAM">Exam</option>
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
                        <Field name="subjectId" hidden />
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
                              isInvalid={form.errors.date && form.touched.date}
                            >
                              <FormLabel>Date</FormLabel>
                              <Input
                                isRequired={true}
                                {...field}
                                onChange={(e) => {
                                  form.handleChange(e);
                                  setExamDate(e.target.value);
                                }}
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
                                  {subject?.type == "SUBJECT" ? "2h" : "1h30m"}
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
                                form.errors.startHour && form.touched.startHour
                              }
                            >
                              <FormLabel>Hour</FormLabel>
                              <Select
                                variant={"auth"}
                                {...field}
                                isRequired={true}
                                placeholder="Select an Hour"
                                onChange={(e) => {
                                  form.handleChange(e);
                                  setStartHour(e.target.value);
                                }}
                              >
                                <option value="h_8">
                                  8h {" --> "}
                                  {subject?.type == "SUBJECT" ? "10h" : "9h30"}
                                </option>
                                <option value="h_10">
                                  10h {" --> "}
                                  {subject?.type == "SUBJECT" ? "12h" : "11h30"}
                                </option>
                                <option value="h_14">
                                  14h {" --> "}
                                  {subject?.type == "SUBJECT" ? "16h" : "15h30"}
                                </option>
                                <option value="h_16">
                                  16h {" --> "}
                                  {subject?.type == "SUBJECT" ? "18h" : "17h30"}
                                </option>
                              </Select>
                              <FormErrorMessage>
                                {form.errors.startHour}
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
                        <Field name="groupId">
                          {({ field, form }: any) => (
                            <FormControl
                              isInvalid={
                                form.errors.groupId && form.touched.groupId
                              }
                            >
                              <FormLabel>
                                Supervisors selection criteria
                              </FormLabel>
                              <Stack direction={"row"} alignItems={"center"}>
                                <RadioGroup
                                  w={"50%"}
                                  onChange={setProfessorCriteria}
                                  value={professorCriteria}
                                >
                                  <Stack direction="row" gap={10}>
                                    <Radio value="random">Randomly</Radio>
                                    <Radio value="group">By group</Radio>
                                  </Stack>
                                </RadioGroup>
                                <Select
                                  variant={"auth"}
                                  {...field}
                                  isRequired={true}
                                  placeholder="Select a group"
                                  onChange={form.handleChange}
                                  disabled={professorCriteria == "random"}
                                >
                                  {groups?.map((group: any) => (
                                    <option key={group.id} value={group.id}>
                                      {capitalize(group.name)}
                                    </option>
                                  ))}
                                </Select>
                              </Stack>
                              <FormErrorMessage>
                                {form.errors.groupId}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Stack>
                      {startHour && examDate && (
                        <Stack w={"100%"} gap={7} alignItems={"start"}>
                          <Stack gap={2}>
                            <FormLabel m={0}>
                              Available Classes {"(capacity)"}
                            </FormLabel>
                            <FormControl
                              isInvalid={props.errors.classes ? true : false}
                            >
                              <FormErrorMessage m={0}>
                                {props.errors.classes}
                              </FormErrorMessage>
                            </FormControl>
                            <Flex direction={"row"} gap={"40px"}>
                              {classes.map((aClass: any) => (
                                <Checkbox
                                  key={aClass.id}
                                  w={"150px"}
                                  value={aClass.id}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedClasses((prev: any) => [
                                        ...prev,
                                        aClass,
                                      ]);
                                    } else {
                                      setSelectedClasses((prev: any) =>
                                        prev.filter(
                                          (aClass: any) =>
                                            aClass.id != e.target.value
                                        )
                                      );

                                      let arr = props.values.classes.filter(
                                        (obj: any) => {
                                          return obj.classId != aClass.id;
                                        }
                                      );
                                      console.log(arr)
                                      props.setFieldValue("classes", arr);
                                    }
                                  }}
                                >
                                  {aClass.block + aClass.number}
                                  <Text display={"inline"} color={"gray"}>
                                    {" (" + aClass.capacity + ")"}
                                  </Text>
                                </Checkbox>
                              ))}
                            </Flex>
                          </Stack>
                          {selectedClasses.length > 0 && (
                            <FormLabel m={0}>
                              Enter number of supervisors for each class
                            </FormLabel>
                          )}
                          <Flex direction={"row"} alignItems={"center"} gap={0}>
                            <FieldArray name="classes">
                              {() => (
                                <Flex>
                                  {selectedClasses.map(
                                    (aClass: any, index: number) => (
                                      <Flex key={aClass.id}>
                                        <Field
                                          name={`classes.${index}.classId`}
                                          hidden
                                          readOnly
                                        />
                                        <Field name={`classes.${index}.number`}>
                                          {({ field, form }: any) => (
                                            <Flex
                                              direction={"row"}
                                              gap={5}
                                              alignItems={"center"}
                                              w={"100%"}
                                            >
                                              <Flex gap={1}>
                                                {aClass.block + aClass.number}
                                                <Text
                                                  display={"inline"}
                                                  color={"gray"}
                                                >
                                                  {" (" + aClass.capacity + ")"}
                                                </Text>
                                              </Flex>
                                              <Input
                                                variant={"auth"}
                                                w={"40%"}
                                                {...field}
                                                isRequired={true}
                                                type="number"
                                                min={1}
                                                onChange={(e) => {
                                                  form.handleChange(e);
                                                  form.setFieldValue(
                                                    `classes.${index}.classId`,
                                                    aClass.id
                                                  );
                                                }}
                                              />
                                            </Flex>
                                          )}
                                        </Field>
                                      </Flex>
                                    )
                                  )}
                                </Flex>
                              )}
                            </FieldArray>
                          </Flex>
                        </Stack>
                      )}
                      <Alert
                        status="error"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        height="200px"
                        hidden={!showError}
                      >
                        <AlertIcon boxSize="40px" mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize="lg">
                          Failed to create the exam
                        </AlertTitle>
                        <AlertDescription maxWidth="sm">
                          The number of needed supervisor are insufficient for
                          this hour. Try another hour or date
                        </AlertDescription>
                      </Alert>
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
      )}
    </Flex>
  );
};

export default CreateExam;
