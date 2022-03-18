import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import QuestionBlock from "./QuestionBlock";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

const Root = styled(Container)`
  padding-top: ${props => props.theme.spacing(2)};
  padding-bottom: ${props => props.theme.spacing(4)};
`;

interface Props {
  date_of_wedding: Date;
}

interface State {
}

class FAQ extends React.Component<Props, State> {
  render() {
    return (
      <Root maxWidth="lg">
        <Box pb={2}>
          <Typography variant={"h4"}>FAQs</Typography>
          {/*<Hidden smDown>*/}
          {/*  <Divider orientation="horizontal"/>*/}
          {/*</Hidden>*/}
        </Box>
        <QuestionBlock
          question={`Why are there so many bees everywhere?`}
          answer={`
            Among early Imles, the name often appears as “Ihmle” and “Imlin” and is likely related to the archaic German word “Imme” (“bee”). 
            We have embraced our beekeeping relatives and hidden bees throughout our wedding. “Bee” on the lookout for them and tell us how many you find!
          `}
        />
        <QuestionBlock
          question={`How do I pronounce Savannah's new last name?`}
          answer={`
            Imle (i • mul)
          `}
        />
        <QuestionBlock
          question={`What do I do with the recipe card in my invitation?`}
          answer={`
            Please bring the recipe card enclosed in your invitation to the wedding.
            There will be a table with a box for you to place your card in upon arrival.
            If you are unable to celebrate with us, feel free to mail the card to us separately.
          `}
        />
        <QuestionBlock
          question={`How should I get to the venue?`}
          answer={`
            If you are staying at the Grand Hyatt, it is only an 8 minute walk to the venue!
            However, if you would prefer, there will be a shuttle to take you there and back.
            Atlanta is also a popular place to use a ridesharing service.
            But, if you prefer to drive, there is a complimentary valet on-site.
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
          question={`How can I get to the hotel from the airport?`}
          answer={`
            The fastest way would be on the MARTA train's Red line via Buckhead Station.
            However, if you don't want to rent a car, you can always use a ride share service!
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
            Come dressed to impress in your favorite semi-formal attire!
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
          question={`What should I do if I have food allergies or other dietary restrictions?`}
          answer={`
            A number of guests have some form of dietary restrictions that we have taken into account!
            The food will be similar to a buffet style and there should be something for everyone! 
          `}
        />
        <QuestionBlock
          question={`Is the venue ADA friendly?`}
          answer={`
            The first floor of our venue is fully ADA compliant, however, during cocktail hour,
            the second floor of the venue will be open and is only accessible by stairs.
          `}
        />
      </Root>
    );
  }
}

export default FAQ;
