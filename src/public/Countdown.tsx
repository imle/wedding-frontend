import React from "react";

interface Props {
  day: Date;
}

const one_day = 1000 * 60 * 60 * 24;

class Countdown extends React.Component<Props> {
  render() {
    const now = new Date();

    return (
      <React.Fragment>
        {Math.ceil((this.props.day.getTime() - now.getTime()) / (one_day))} days to go!
      </React.Fragment>
    );
  }
}

export default Countdown;
