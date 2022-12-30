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
import React from "react";

const BookedCard = (props) => {
  let time = (text) => text.substring(11, 16);
  let day = (text) => text.substring(8, 10);
  let month = (text) => text.substring(5, 7);
  let year = (text) => text.substring(0, 4);
  let bg;
  if (props.pending) {
    bg = "yellow.100";
  } else if (props.rejected) {
    bg = "red.100";
  } else {
    bg = "green.100";
  }
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      bg={bg}
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

export default BookedCard;
