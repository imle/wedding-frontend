import React from "react";
import {differenceInCalendarDays} from "date-fns";

interface Props {
  day: Date;
}

class Countdown extends React.Component<Props> {
  render() {
    const now = new Date();

    return (
      <React.Fragment>
        {differenceInCalendarDays(this.props.day.getTime(), now.getTime())} days to go!
      </React.Fragment>
    );
  }
}

export default Countdown;
