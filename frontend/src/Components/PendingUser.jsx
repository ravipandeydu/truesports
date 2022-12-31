import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const PendingUser = (props) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.username}</Heading>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="green" onClick={props.handleApprove}>
            Approve
          </Button>
          <Button variant="solid" colorScheme="red" onClick={props.handleReject}>
            Reject
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PendingUser;
