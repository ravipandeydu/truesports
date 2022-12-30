import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Fade,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../Components/EventCard";
import {
  bookEvents,
  getAllEvents,
  getMyEvents,
  postEvents,
} from "../Redux/events/events.actions";

const AllEvents = () => {
  const token = useSelector((state) => state.auth.user).token;
  const user = useSelector((state) => state.auth.user).user;
  const loading = useSelector((state) => state.auth.loading);
  console.log(user);
  const events = useSelector((state) => state.events.data);
  console.log(events);
  const [id, setId] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents(token));
  }, []);

  const handleClick = (eventId, event) => {
    // if (event.userId !== user._id) {
    dispatch(
      bookEvents(eventId, {
        ...event,
        pending: [...event.pending, user.username],
      })
    ).then(() => {
      dispatch(getAllEvents(token));
    });
    // }
  };

  if (loading) {
    return (
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
    );
  }

  return (
    <Box align="center">
      {events.map((event) => (
        <EventCard
          key={event._id}
          title={event.title}
          desc={event.desc}
          gameType={event.gameType}
          startAt={event.startAt}
          endAt={event.endAt}
          organiserId={event.userId}
          userId={user._id}
          players={event.players}
          playersLimit={event.playersLimit}
          pending={event.pending.includes(user.username)}
          rejected={event.rejected.includes(user.username)}
          confirmed={event.players.includes(user.username)}
          handleBook={() => handleClick(event._id, event)}
        />
      ))}
    </Box>
  );
};

export default AllEvents;
