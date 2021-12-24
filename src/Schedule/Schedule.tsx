import React from "react";
import ScheduleEvent from "./Event";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

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
      <Container maxWidth="md">
        <Hidden mdUp>
          <Box p={1}>
            <Typography variant={"h4"}>Schedule</Typography>
            <Divider orientation="horizontal"/>
          </Box>
        </Hidden>
        <Hidden smDown>
          <Box p={1}/>
        </Hidden>
        <ScheduleEvent
          title={"Welcome Event"}
          prettyLocation={"The East Terrace at The Grand Hyatt, Buckhead GA"}
          address={"The Grand Hyatt\n3300 Peachtree Rd NE, Atlanta, GA 30305"}
          description={
            "Please come celebrate as we welcome all guests to our wedding weekend! Light refreshments, " +
            "including beer and wine will be served!"
          }
          start={new Date(2022, 4, 27, 19, 0)}
          duration={{hours: 2}}
        />
        <ScheduleEvent
          title={"Wedding Ceremony"}
          prettyLocation={"The Estate, Buckhead GA"}
          address={"The Estate\n3109 Piedmont Rd NE, Atlanta, GA  30305, United States"}
          description={
            "Attire for the wedding ceremony will be semi-formal. There will also be a complimentary valet onsite " +
            "for any guest who decides to drive. Remember that you cannot leave your car parked overnight. Cocktail " +
            "hour will immediately follow the ceremony and will be held inside the Estate."
          }
          start={new Date(2022, 4, 28, 17, 0)}
          duration={{hours: 1, minutes: 30}}
        />
        <ScheduleEvent
          title={"Reception"}
          prettyLocation={"The Estate, Buckhead GA"}
          address={"The Estate\n3109 Piedmont Rd NE, Atlanta, GA  30305, United States"}
          description={
            "Come ready to dance and eat to celebrate the new bride and groom! Don't forget to grab a selfie" +
            " at the photobooth to help commemorate the day!"
          }
          start={new Date(2022, 4, 28, 18, 30)}
          duration={{hours: 2}}
        />
      </Container>
    );
  }
}

export default Schedule;