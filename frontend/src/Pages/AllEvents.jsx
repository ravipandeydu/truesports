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
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../Components/EventCard";
import {
  bookEvents,
  getAllEvents,
  searchEvents,
} from "../Redux/events/events.actions";
import Pagination from "../Components/Pagination";

const AllEvents = () => {
  const token = useSelector((state) => state.auth.user).token;
  const user = JSON.parse(localStorage.getItem("user"))?.user;
  const loading = useSelector((state) => state.events.loading);
  const events = useSelector((state) => state.events.data);
  const [gameType, setGameType] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(events?.length / perPage);
  let end = page * perPage;
  let start = end - perPage;
  let paginatedEvents = [];
  if (events.length > 0) {
    paginatedEvents = events?.slice(start, end);
  }

  const [text, setText] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents(token, gameType));
  }, [gameType]);

  const handleClick = (eventId, event) => {
    dispatch(
      bookEvents(eventId, {
        ...event,
        pending: [...event.pending, user.username],
      })
    ).then(() => {
      dispatch(getAllEvents(token, gameType));
    });
  };

  const handlesearch = async (r) => {
    dispatch(searchEvents(r));
  };
  return (
    <Box align="center">
      <Box
        position={"sticky"}
        top="70px"
        bg={useColorModeValue("white", "#1a202c")}
        zIndex={10}
      >
        <Heading my={"20px"}>All Events</Heading>
        <Flex my={"20px"}>
          <Select
            mt="4px"
            maxW="sm"
            ml="20px"
            mr="100px"
            name="gameType"
            placeholder="Filter By Game Type"
            onChange={(e) => setGameType(e.target.value)}
          >
            <option value="Cricket">Cricket</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
          </Select>
          <Input
            mt="4px"
            maxW="xl"
            ml="20px"
            mr="10px"
            type={"text"}
            name="language"
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Search Events"
          />
          <Button mt="4px" onClick={() => handlesearch(text)}>
            Search
          </Button>
        </Flex>
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
            <EventCard
              key={event._id}
              title={event.title}
              desc={event.desc}
              gameType={event.gameType}
              startAt={event.startAt}
              endAt={event.endAt}
              organiserId={event.userId}
              userId={user?._id}
              event={event}
              image={event.img}
              eventId={event._id}
              players={event.players}
              pendingPlayers={event.pending}
              playersLimit={event.playersLimit}
              pending={event.pending.includes(user?.username)}
              rejected={event.rejected.includes(user?.username)}
              confirmed={event.players.includes(user?.username)}
              handleBook={() => handleClick(event._id, event)}
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

export default AllEvents;
