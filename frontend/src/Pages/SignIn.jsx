import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Redux/auth/auth.actions";

const SignIn = () => {
  const { loading, error, errormsg } = useSelector(
    (state) => state.auth
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginSuccess({ username, password })).then(() => {
        navigate("/");
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box align="center">
      <Card maxW="lg">
        <CardBody>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </CardBody>
        <Divider />
        <CardFooter>
          {loading ? (
            <Button
              isLoading
              loadingText="Loading"
              colorScheme="teal"
              variant="outline"
              spinnerPlacement="end"
            >
              Login
            </Button>
          ) : (
            <Button variant="solid" colorScheme="blue" onClick={handleSubmit}>
              Login
            </Button>
          )}
        </CardFooter>
      </Card>
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{errormsg}</AlertTitle>
        </Alert>
      ) : (
        ""
      )}
    </Box>
  );
};

export default SignIn;
