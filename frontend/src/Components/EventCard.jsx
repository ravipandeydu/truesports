import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bookEvents } from "../Redux/events/events.actions";

const EventCard = (props) => {
  let startTime = new Date(`${props.startAt}`).toLocaleString();
  let startAtTime = new Date(`${props.startAt}`).getTime();
  let endTime = new Date(`${props.endAt}`).toLocaleString();
  let currentTime = new Date().getTime();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTime > startAtTime && props.pendingPlayers.length > 0) {
      dispatch(
        bookEvents(props.eventId, {
          ...props.event,
          pending: [],
        })
      );
    }
  }, []);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      maxW={"2xl"}
      mb="40px"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={props.image}
        alt={props.title}
      />
      <Stack>
        <CardBody align="left">
          {props.gameType === "Cricket" ? (
            <Badge colorScheme="green" fontSize={"14px"}>
              {props.gameType}
            </Badge>
          ) : props.gameType === "Football" ? (
            <Badge colorScheme="red" fontSize={"14px"}>
              {props.gameType}
            </Badge>
          ) : (
            <Badge colorScheme="purple" fontSize={"14px"}>
              {props.gameType}
            </Badge>
          )}
          <Heading size="md">{props.title}</Heading>
          <Text py="2" fontWeight={"500"}>
            {props.desc}
          </Text>
          <Text>
            <b>Seats :</b> {props.players.length}/{props.playersLimit}
          </Text>

          <Text py="2" justifyContent={"left"}>
            <b>Start At :</b> {startTime}
          </Text>
          <Text py="2">
            <b>End At :</b> {endTime}
          </Text>
        </CardBody>

        <CardFooter>
          {props.userId === props.organiserId ? (
            <Button
              variant="solid"
              colorScheme="blue"
              disabled
              onClick={props.handleClick}
            >
              My Event
            </Button>
          ) : currentTime > startAtTime ? (
            <Button variant="solid" bg="gray" color={"red"} disabled>
              Expired
            </Button>
          ) : props.players.length === props.playersLimit ? (
            <Button variant="solid" colorScheme="blue" disabled>
              Event Full
            </Button>
          ) : props.pending ? (
            <Button
              variant="solid"
              colorScheme="yellow"
              disabled
              onClick={props.handleClick}
            >
              Pending
            </Button>
          ) : props.rejected ? (
            <Button
              variant="solid"
              colorScheme="red"
              disabled
              onClick={props.handleClick}
            >
              Rejected
            </Button>
          ) : props.confirmed ? (
            <Button
              variant="solid"
              colorScheme="green"
              disabled
              onClick={props.handleClick}
            >
              Booked
            </Button>
          ) : (
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={props.handleBook}
            >
              Book
            </Button>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default EventCard;
