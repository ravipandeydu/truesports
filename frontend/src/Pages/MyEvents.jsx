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
  Image,
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
  const loading = useSelector((state) => state.events.loading);
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
      <Box
        position={"sticky"}
        top="70px"
        bg={useColorModeValue("white", "#1a202c")}
        zIndex={10}
      >
        <Heading my={"40px"}>My Events</Heading>
        <Box align="right" maxW={"2xl"} mb="10px">
          <CreateEvents
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>
      {loading ? (
        <Flex
          w="100vw"
          h={"100vh"}
          mx={"auto"}
          align={"center"}
          justify={"center"}
          bg={"rgba(245,250,254,.5)"}
          backgroundBlendMode={"hard-light"}
          position={"absolute"}
          top={"0"}
          left={"0"}
        >
          <Image
            borderRadius={"50%"}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
          />
        </Flex>
      ) : (
        <Box>
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
              image={event.img}
            />
          ))}
        </Box>
      )}
      <Pagination
        total={totalPages}
        current={page}
        onChange={(value) => setPage(value)}
      />
    </Box>
  );
};

export default MyEvents;
