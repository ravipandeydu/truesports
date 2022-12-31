import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/auth/auth.actions";
import logo from "../assets/true-sports-logo.png"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user).user;
  const myevents = useSelector((state) => state.events.data).filter(
    (event) => event.userId === user?._id
  );
  let notifications = myevents.reduce(
    (total, current) => total + current.pending.length,
    0
  );

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <Flex
      bg={useColorModeValue("red.200", "teal")}
      borderBottom="0.5px solid #b1b3b5"
      px={6}
      align="center"
      justify="center"
      wrap="nowrap"
      position={"sticky"}
      top={0}
      zIndex={10}
    >
      <Link to="/">
        {/* <Text px={6} py={2} fontSize="xl">
          TrueSports
        </Text> */}
        <Image p={5} src={logo} w="200px" />
      </Link>
      <Spacer />
      <Link to="/">
        <Text px={6} py={2} fontSize="xl">
          All Events
        </Text>
      </Link>
      <Link to="/myevents">
        <Tooltip
          label={
            isAuth && notifications > 0
              ? `${notifications} pending requests`
              : ""
          }
          aria-label="A tooltip"
        >
          <Flex>
            <Text pl={6} py={2} fontSize="xl">
              My Events
            </Text>
            <Box>{isAuth && notifications > 0 ? notifications : ""}</Box>
          </Flex>
        </Tooltip>
      </Link>
      <Link to="/booked">
        <Text px={6} py={2} fontSize="xl">
          My Booked Events
        </Text>
      </Link>
      <Spacer />
      {isAuth ? (
        <Flex gap={"10px"}>
          <Box px={6} py={2} fontWeight="600" fontSize={"18px"}>
            {user.username}
          </Box>
          <Button px={6} py={2} onClick={handleLogout}>
            Logout
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      ) : (
        <Flex>
          <Link to="/signin">
            <Text px={6} py={2}>
              Sign In
            </Text>
          </Link>
          <Link to="/signup">
            <Text px={6} py={2}>
              Sign Up
            </Text>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
