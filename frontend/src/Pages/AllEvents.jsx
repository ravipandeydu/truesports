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
  searchEvents,
  postEvents,
} from "../Redux/events/events.actions";
import Pagination from "../Components/Pagination";

const AllEvents = () => {
  const token = useSelector((state) => state.auth.user).token;
  const user = useSelector((state) => state.auth.user).user;
  const loading = useSelector((state) => state.events.loading);
  console.log(user);
  const events = useSelector((state) => state.events.data);
  console.log(events);
  const [gameType, setGameType] = useState("");
  console.log(gameType);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(events.length / perPage);
  let end = page * perPage;
  let start = end - perPage;
  let paginatedEvents = events.slice(start, end);
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents(token, gameType));
  }, [gameType]);

  const handleClick = (eventId, event) => {
    // if (event.userId !== user._id) {
    dispatch(
      bookEvents(eventId, {
        ...event,
        pending: [...event.pending, user.username],
      })
    ).then(() => {
      dispatch(getAllEvents(token, gameType));
    });
    // }
  };

  const handlesearch = async (r) => {
    // if (r == "") {
    //   getjobs();
    // } else {
    // let res = await axios.get(`http://localhost:8080/event/search?q=${r}`);
    // console.log(res.data);
    // setData(res.data);
    // }
    // e.preventDefault();
    dispatch(
      searchEvents(r)
    )
    // .then(() => {
    //   dispatch(getAllEvents(token, gameType));
    // });
  };

  // if (loading) {
  //   return (
  //     <Flex
  //       w="100vw"
  //       h={"100vh"}
  //       mx={"auto"}
  //       align={"center"}
  //       justify={"center"}
  //       bg={"rgba(245,250,254,.5)"}
  //       backgroundBlendMode={"hard-light"}
  //       position={"absolute"}
  //       top={"0"}
  //       left={"0"}
  //     >
  //       <Image
  //         borderRadius={"50%"}
  //         src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
  //       />
  //     </Flex>
  //   );
  // }

  return (
    <Box align="center">
      <Flex my={"40px"}>
        {/* <Select
          mt="4px"
          maxW="sm"
          ml="20px"
          mr="100px"
          placeholder="Filter By Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">FullStack</option>
        </Select> */}
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
        <Button mt="4px" onClick={()=>handlesearch(text)}>Search</Button>
      </Flex>
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
              userId={user._id}
              event={event}
              eventId={event._id}
              players={event.players}
              pendingPlayers={event.pending}
              playersLimit={event.playersLimit}
              pending={event.pending.includes(user.username)}
              rejected={event.rejected.includes(user.username)}
              confirmed={event.players.includes(user.username)}
              handleBook={() => handleClick(event._id, event)}
            />
          ))}
        </Box>
        // {/* )} */
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
