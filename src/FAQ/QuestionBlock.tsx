import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import Box from "@mui/material/Box";

interface Props {
  question: React.ReactNode;
  answer: React.ReactNode;
}

const QuestionBlock: React.FC<Props> = (props) => {
  return (
    <Box pb={2}>
      <Hidden smUp>
        <Divider orientation="horizontal" flexItem/>
      </Hidden>
      <Grid container display={"flex"} alignItems={"center"}>
        <Grid item xs={12} sm={5}>
          <Box p={2}>
            <Typography align={"center"} variant={"h4"}>Question</Typography>
            <Typography align={"center"} variant={"h5"}>
              {props.question}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Box display={"flex"}>
            <Hidden smDown>
              <Divider orientation="vertical" flexItem sx={{my: 2}}/>
            </Hidden>
            <Box p={2} flexGrow={1}>
              <Typography align={"center"} variant={"h4"}>Answer</Typography>
              <Typography align={"center"} variant={"h6"}>
                {props.answer}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default QuestionBlock;
