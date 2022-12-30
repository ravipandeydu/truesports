import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
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
  let time = (text) => text.substring(11, 16);
  let day = (text) => text.substring(8, 10);
  let month = (text) => text.substring(5, 7);
  let year = (text) => text.substring(0, 4);
  const dispatch = useDispatch();
  let eventId = props.eventId;
  let event = props.event;
  const handleApprove = (eventId, event, el) => {
    if (event.userId === user._id) {
      let remaining = event.pending.filter((e) => e.username === el);
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
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            {props.gameType === "Cricket" ? (
              <Badge colorScheme="green">{props.gameType}</Badge>
            ) : props.gameType === "Football" ? (
              <Badge colorScheme="red">{props.gameType}</Badge>
            ) : (
              <Badge colorScheme="purple">{props.gameType}</Badge>
            )}
            <Heading size="md">{props.title}</Heading>
            <Text py="2">{props.desc}</Text>
            <Text py="2">
              {time(props.startAt)} {day(props.startAt)}-{month(props.startAt)}-
              {year(props.startAt)}
            </Text>
            <Text py="2">
              {time(props.endAt)} {day(props.endAt)}-{month(props.endAt)}-
              {year(props.endAt)}
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
