import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  Select,
  Spacer,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateEvents from "../Components/CreateEvents";
import EventCard from "../Components/EventCard";
import MyEventCard from "../Components/MyEventCard";
import Pagination from "../Components/Pagination";
import { getAllEvents, postEvents } from "../Redux/events/events.actions";

const initEvent = {
  title: "",
  desc: "",
  img: "",
  gameType: "",
  category: "",
  startAt: "",
  endAt: "",
  playersLimit: 2,
};

const MyEvents = () => {
  const token = useSelector((state) => state.auth.user).token;
  const user = useSelector((state) => state.auth.user).user;
  const myevents = useSelector((state) => state.events.data).filter(
    (event) => event.userId === user._id
  );
  console.log(token);
  const [users, setUsers] = useState([]);
  const [event, setEvent] = useState(initEvent);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(myevents.length / perPage);
  let end = page * perPage;
  let start = end - perPage;
  let paginatedEvents = myevents.slice(start, end);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  // const handleGetUsers = () => {
  //   axios.get("http://localhost:8080/user").then((res) => setUsers(res.data));
  //   // .then((data) => console.log(data));
  // };

  // useEffect(() => {
  //   handleGetUsers();
  // }, []);

  function handleSubmit() {
    dispatch(postEvents(token, event)).then(() => {
      dispatch(getAllEvents(token));
    });
  }

  useEffect(() => {
    dispatch(getAllEvents(token));
  }, []);
  return (
    <Box align="center">
      <Box position={"sticky"} top="70px" bg={useColorModeValue('white', '#1a202c')} zIndex={10}>
        <Heading my={"40px"}>My Events</Heading>
        <Box align="right" maxW={"2xl"} mb="10px">
          <CreateEvents
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>

      {/* <Card maxW="lg">
        <CardBody>
          <FormLabel>Category</FormLabel>
          <Select
            mt="4px"
            maxW="xl"
            mr="100px"
            name="gameType"
            placeholder="Select option"
            onChange={handleChange}
          >
            <option value="Cricket">Cricket</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
          </Select>
          <FormLabel>Title</FormLabel>
          <Input name="title" onChange={handleChange} />
          <FormLabel>Desc</FormLabel>
          <Textarea
            // value={message}
            name="desc"
            onChange={handleChange}
            type="text"
          />
          <FormLabel>Image</FormLabel>
          <Input value={event.img} name="img" onChange={handleChange} />
          <FormLabel>Player Limit</FormLabel>
          <Input
            // value={event.playersLimit}
            name="playersLimit"
            onChange={handleChange}
          />
          <FormLabel>Start At</FormLabel>
          <Input type="datetime-local" name="startAt" onChange={handleChange} />
          <FormLabel>End At</FormLabel>
          <Input type="datetime-local" name="endAt" onChange={handleChange} />
        </CardBody>
        <Divider />
        <CardFooter>
          <Button variant="solid" colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card> */}
      {paginatedEvents.map((event) => (
        <MyEventCard
          key={event._id}
          title={event.title}
          desc={event.desc}
          eventId={event._id}
          event={event}
          gameType={event.gameType}
          startAt={event.startAt}
          endAt={event.endAt}
          organiserId={event.userId}
          userId={user._id}
          pending={event.pending}
          // handleApprove={() => handleApprove()}
          // handleReject={handleReject}
        />
      ))}
      <Pagination
        total={totalPages}
        current={page}
        onChange={(value) => setPage(value)}
      />
    </Box>
  );
};

export default MyEvents;
