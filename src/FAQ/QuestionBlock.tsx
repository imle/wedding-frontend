import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import styled from "@emotion/styled";

interface Props {
  question: React.ReactNode;
  answer: React.ReactNode;
}

const GridContainer = styled(Grid)`
  ${props => props.theme.breakpoints.up("sm")} {
    padding: ${props => props.theme.spacing(2)};
  }
`;

const QuestionBlock: React.FC<Props> = (props) => {
  return (
    <>
      <Hidden smUp>
        <Divider orientation="horizontal" flexItem sx={{ml: 2, mr: 2}}/>
      </Hidden>
      <GridContainer container display={"flex"} alignItems={"center"}>
        <Grid item xs={12} sm sx={{p: 3}}>
          <Typography align={"center"} variant={"h4"}>Question</Typography>
          <Typography align={"center"} variant={"h5"}>
            {props.question}
          </Typography>
        </Grid>
        <Hidden xsDown>
          <Divider orientation="vertical" flexItem/>
        </Hidden>
        <Grid item xs={12} sm sx={{p: 3}}>
          <Typography align={"center"} variant={"h4"}>Answer</Typography>
          <Typography align={"center"} variant={"h6"}>
            {props.answer}
          </Typography>
        </Grid>
      </GridContainer>
    </>
  );
}

export default QuestionBlock;
