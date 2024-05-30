import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Field, Form} from "formik";
import * as Yup from "yup";
// React router & auth kit
import { useNavigate, Navigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
// Custom components
import { HSeparator } from "../../components/Separator/Separator";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// axios
import axios from '../../apis/scholarSync'
import useAxiosFunction from "../../hooks/useAxiosFunction";

type formValues = {
  email: string,
  password: string, 
  remember: boolean
}

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  if(isAuthenticated) {
    return <Navigate to={'/'} replace={true}/> 
  }
  
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [, , loading, axiosFetch] = useAxiosFunction(axios);

  const onSubmit = (values : formValues, actions : any) => {
    axiosFetch({
      method: "post",
      url: "/auth/authenticate",
      data: values,
      handleResponse: (data: any) => {
        signIn({
          auth: {
            token: data.accessToken,
            type: 'Bearer',
          },
        });
        navigate("/", { replace: true });
      },
      handleError: (err: any) => {
        console.log(err)
      },
    });
    
    actions.setSubmitting(false);
  }

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="80%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="30px" mb="10px">
            Welcome to Scholar Sync !
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.700" mx="14px">
              SignIn
            </Text>
            <HSeparator />
          </Flex>
          <Formik
            initialValues={{
              email: "",
              password: "",
              remember: false,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <Field name="email">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                      mb="24px"
                    >
                      <FormLabel
                        display="flex"
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color={textColor}
                        mb="8px"
                      >
                        Email
                        <Text color={brandStars}>*</Text>
                      </FormLabel>
                      <Input
                        {...field}
                        isRequired={true}
                        variant="auth"
                        fontSize="sm"
                        ms={{ base: "0px", md: "0px" }}
                        type="email"
                        placeholder="mail@uae.ac.ma"
                        fontWeight="500"
                        size="lg"
                        onChange={form.handleChange}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      mb="24px"
                    >
                      <FormLabel
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color={textColor}
                        display="flex"
                      >
                        Password
                        <Text color={brandStars}>*</Text>
                      </FormLabel>
                      <InputGroup size="md">
                        <Input
                          {...field}
                          isRequired={true}
                          fontSize="sm"
                          placeholder="Min. 8 characters"
                          size="lg"
                          type={show ? "text" : "password"}
                          variant="auth"
                          onChange={form.handleChange}
                        />
                        <InputRightElement
                          display="flex"
                          alignItems="center"
                          mt="4px"
                        >
                          <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: "pointer" }}
                            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                            onClick={handleClick}
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="center">
                    <Field name="remember">
                      {({ field }: any) => (
                        <Checkbox
                          {...field}
                          id="remember-login"
                          colorScheme="brandScheme"
                          me="10px"
                        />
                      )}
                    </Field>
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      fontWeight="normal"
                      color={textColor}
                      fontSize="sm"
                    >
                      Keep me logged in
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                  type="submit"
                  isLoading={loading}
                  _hover={{  }}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Login
