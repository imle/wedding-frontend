import React from "react";

interface Props {
}

interface State {
}

class Schedule extends React.Component<Props, State> {
  state: State = {};

  handleClose = () => {
    this.setState({selected: null});
  };

  render() {
    return (
      <>

      </>
    );
  }
}

export default Schedule;