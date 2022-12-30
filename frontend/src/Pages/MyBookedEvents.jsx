import { Box } from "@chakra-ui/react";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents(token));
  }, []);
  return (
    <Box>
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
          pending={event.pending.includes(user.username)}
          rejected={event.rejected.includes(user.username)}
          confirmed={event.players.includes(user.username)}
          handleBook={() => handleClick(event._id, event)}
        />
      ))}
    </Box>
  );
};

export default MyBookedEvents;
