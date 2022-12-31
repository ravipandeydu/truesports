import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookedCard from "../Components/BookedCard";
import { getAllEvents } from "../Redux/events/events.actions";

const MyBookedEvents = () => {
  const token = useSelector((state) => state.auth.user).token;
  const user = useSelector((state) => state.auth.user).user;
  const myevents = useSelector((state) => state.events.data).filter(
    (event) =>
      event.pending.includes(user.username) ||
      event.players.includes(user.username) ||
      event.rejected.includes(user.username)
  );
  const myeventsAccepted = useSelector((state) => state.events.data).filter(
    (event) => event.players.includes(user.username)
  );
  const myeventsPending = useSelector((state) => state.events.data).filter(
    (event) => event.pending.includes(user.username)
  );
  const myeventsRejected = useSelector((state) => state.events.data).filter(
    (event) => event.rejected.includes(user.username)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents(token));
  }, []);
  return (
    <Box align="center">
      <Heading my={"40px"}>My Booked Events</Heading>
      <Tabs isFitted maxW={"2xl"} variant="enclosed">
        <TabList>
          <Tab>All</Tab>
          <Tab>Accepted</Tab>
          <Tab>Pending</Tab>
          <Tab>Rejected</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {myevents.map((event) => (
              <BookedCard
                key={event._id}
                title={event.title}
                desc={event.desc}
                gameType={event.gameType}
                startAt={event.startAt}
                endAt={event.endAt}
                organiserId={event.userId}
                userId={user._id}
                players={event.players}
                pending={event.pending.includes(user.username)}
                rejected={event.rejected.includes(user.username)}
                confirmed={event.players.includes(user.username)}
                handleBook={() => handleClick(event._id, event)}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {myeventsAccepted.map((event) => (
              <BookedCard
                key={event._id}
                title={event.title}
                desc={event.desc}
                gameType={event.gameType}
                startAt={event.startAt}
                endAt={event.endAt}
                organiserId={event.userId}
                userId={user._id}
                players={event.players}
                pending={event.pending.includes(user.username)}
                rejected={event.rejected.includes(user.username)}
                confirmed={event.players.includes(user.username)}
                handleBook={() => handleClick(event._id, event)}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {myeventsPending.map((event) => (
              <BookedCard
                key={event._id}
                title={event.title}
                desc={event.desc}
                gameType={event.gameType}
                startAt={event.startAt}
                endAt={event.endAt}
                organiserId={event.userId}
                userId={user._id}
                players={event.players}
                pending={event.pending.includes(user.username)}
                rejected={event.rejected.includes(user.username)}
                confirmed={event.players.includes(user.username)}
                handleBook={() => handleClick(event._id, event)}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {myeventsRejected.map((event) => (
              <BookedCard
                key={event._id}
                title={event.title}
                desc={event.desc}
                gameType={event.gameType}
                startAt={event.startAt}
                endAt={event.endAt}
                organiserId={event.userId}
                userId={user._id}
                players={event.players}
                pending={event.pending.includes(user.username)}
                rejected={event.rejected.includes(user.username)}
                confirmed={event.players.includes(user.username)}
                handleBook={() => handleClick(event._id, event)}
              />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyBookedEvents;
