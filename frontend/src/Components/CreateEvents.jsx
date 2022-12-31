import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const CreateEvents = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function handleSave() {
    props.handleSubmit();
    onClose();
  }
  return (
    <>
      <Button onClick={onOpen}>Create Event</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Card maxW="lg">
              <CardBody>
                <FormLabel>Category</FormLabel>
                <Select
                  mt="4px"
                  maxW="xl"
                  mr="100px"
                  name="gameType"
                  placeholder="Select option"
                  onChange={props.handleChange}
                >
                  <option value="Cricket">Cricket</option>
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                </Select>
                <FormLabel>Title</FormLabel>
                <Input name="title" onChange={props.handleChange} />
                <FormLabel>Desc</FormLabel>
                <Textarea
                  // value={message}
                  name="desc"
                  onChange={props.handleChange}
                  type="text"
                />
                <FormLabel>Image</FormLabel>
                <Input name="img" onChange={props.handleChange} />
                <FormLabel>Player Limit</FormLabel>
                <Input
                  // value={event.playersLimit}
                  name="playersLimit"
                  onChange={props.handleChange}
                  type="number"
                />
                <FormLabel>Start At</FormLabel>
                <Input
                  type="datetime-local"
                  name="startAt"
                  onChange={props.handleChange}
                />
                <FormLabel>End At</FormLabel>
                <Input
                  type="datetime-local"
                  name="endAt"
                  onChange={props.handleChange}
                />
              </CardBody>
              {/* <Divider />
              <CardFooter>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={props.handleSubmit}
                >
                  Submit
                </Button>
              </CardFooter> */}
            </Card>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEvents;
