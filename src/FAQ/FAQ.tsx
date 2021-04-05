import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import QuestionBlock from "./QuestionBlock";

interface Props {
  date_of_wedding: Date;
}

interface State {
}

class FAQ extends React.Component<Props, State> {
  render() {
    return (
      <Container maxWidth="md">
        <Grid container sx={{p: 3}}>
          <Grid item xs={12}>
            <Typography align={"center"} variant={"h3"}>FAQs</Typography>
            {/*<Typography align={"center"} variant={"body1"}>*/}
            {/*  Please checkout our venue's new COVID-19 resources page for more*/}
            {/*  details on how our wedding will be handled for the new date.*/}
            {/*  Please stay tuned as this may get updated as new guidance is*/}
            {/*  released by Texas Health and Human Services.*/}
            {/*</Typography>*/}
          </Grid>
        </Grid>
        <QuestionBlock
          question={`How should I get to the venue?`}
          answer={`
            If you are staying at the Grand Hyatt, it is only an 8 minute walk to the venue!
            Atlanta is also a popular place to use a ridesharing service.
            However, if you prefer to drive, there is a complimentary valet onsite.
          `}
        />
        <QuestionBlock
          question={`Is there parking at the venue?`}
          answer={`
            YES! Though you are required to use the complimentary valet if you drive, 
            and will not be able to keep your car parked at the venue overnight.
          `}
        />
        <QuestionBlock
          question={`Will the ceremony be inside or outside?`}
          answer={`
            Weather permitting, the ceremony will be held outside. 
            If the weather does not cooperate, it will be moved indoors.
          `}
        />
        <QuestionBlock
          question={`What time should I arrive?`}
          answer={`
            Please arrive at least 15 minutes before the ceremony starts or 
            you will not be allowed up the driveway until it is finished.
            Keep in mind that our venue is in the heart of Buckhead, 
            so you will want to factor traffic into your travel time.
          `}
        />
        <QuestionBlock
          question={`What should I wear?`}
          answer={`
            Come dressed to impress in your favorite formal attire!
          `}
        />
        <QuestionBlock
          question={`Can I bring a date?`}
          answer={`
            Feel free to reach out to us if you would like to bring a guest
            that was not formally invited on your wedding invitation.
          `}
        />
        <QuestionBlock
          question={`Are children allowed?`}
          answer={`
            Of course!
          `}
        />
        <QuestionBlock
          question={`What if I have food allergies or other dietary restrictions?`}
          answer={`
            Our caterer is very accommodating so please let us know of any
            dietary restrictions on your RSVP so we can make the necessary arrangements. 
          `}
        />
        <QuestionBlock
          question={`Is the venue ADA friendly?`}
          answer={`
            The first floor of our venue is fully ADA compliant, however, during cocktail hour,
            the second floor of the venue will be open and is only accessible by stairs.
          `}
        />
      </Container>
    );
  }
}

export default FAQ;
