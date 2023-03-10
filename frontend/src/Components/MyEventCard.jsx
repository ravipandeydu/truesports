import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PendingUser from "./PendingUser";
import { useDispatch, useSelector } from "react-redux";
import { bookEvents, getMyEvents } from "../Redux/events/events.actions";

const MyEventCard = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.auth.user).user;
  const token = useSelector((state) => state.auth.user).token;
  let startTime = new Date(`${props.startAt}`).toLocaleString();
  let endTime = new Date(`${props.endAt}`).toLocaleString();
  const dispatch = useDispatch();
  let eventId = props.eventId;
  let event = props.event;
  const handleApprove = (eventId, event, el) => {
    if (event.userId === user._id) {
      let remaining = event.pending.filter((e) => e !== el);
      console.log(remaining);
      dispatch(
        bookEvents(eventId, {
          ...event,
          pending: remaining,
          players: [...event.players, el],
        })
      ).then(() => {
        dispatch(getMyEvents(token, user));
      });
    }
  };

  const handleReject = (eventId, event, el) => {
    if (event.userId === user._id) {
      let remaining = event.pending.filter((e) => e.username === el);
      console.log(remaining);
      dispatch(
        bookEvents(eventId, {
          ...event,
          pending: remaining,
          rejected: [...event.rejected, el],
        })
      ).then(() => {
        dispatch(getMyEvents(token, user));
      });
    }
  };
  return (
    <Box>
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
              <Badge colorScheme="green">{props.gameType}</Badge>
            ) : props.gameType === "Football" ? (
              <Badge colorScheme="red">{props.gameType}</Badge>
            ) : (
              <Badge colorScheme="purple">{props.gameType}</Badge>
            )}
            <Heading size="md">{props.title}</Heading>
            <Text py="2">{props.desc}</Text>
            <Text py="2" justifyContent={"left"}>
              <b>Start At :</b> {startTime}
            </Text>
            <Text py="2">
              <b>End At :</b> {endTime}
            </Text>
          </CardBody>
        </Stack>
        <Stack>
          {props.pending.length > 0 ? (
            <Alert status="info" onClick={onOpen}>
              <AlertIcon />
              <AlertTitle>{props.pending.length} Pending Requests</AlertTitle>
            </Alert>
          ) : (
            ""
          )}

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Pending Players</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {props.pending.map((el, i) => (
                  <PendingUser
                    key={i}
                    username={el}
                    handleApprove={() => handleApprove(eventId, event, el)}
                    handleReject={() => handleReject(eventId, event, el)}
                  />
                ))}
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Card>
    </Box>
  );
};

export default MyEventCard;
