import React from "react";
import * as ics from "ics";
import {format} from "date-fns";
import styled from "@emotion/styled";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";

const DateTimeTypography = styled(Typography)`
  ${props => props.theme.breakpoints.down("md")} {
    font-size: medium;
  }

  ${props => props.theme.breakpoints.down("sm")} {
    font-size: smaller;
  }
`;

const TitleGridItem = styled(Grid)`
  ${props => props.theme.breakpoints.down("sm")} {
    position: relative;
  }
`;

const TitleTypography = styled(Typography)`
  ${props => props.theme.breakpoints.down("sm")} {
    text-align: left;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const DescriptionTypography = styled(Typography)`
  text-align: justify;

  ${props => props.theme.breakpoints.down("sm")} {
    text-align: left;
  }
`;

interface Props {
  title: string;
  prettyLocation: string;
  address: string;
  description: string;
  start: Date;
  duration: ics.DurationObject;
}

const ScheduleEvent: React.FC<Props> = (props) => {
  const obj = ics.createEvent({
    title: props.title,
    location: props.address,
    description: props.description,
    start: [
      props.start.getFullYear(),
      props.start.getMonth() + 1,
      props.start.getDate(),
      props.start.getHours(),
      props.start.getMinutes(),
    ],
    duration: props.duration,
  });
  let url: string | undefined = undefined;
  if (obj.value) {
    url = URL.createObjectURL(new Blob([obj.value], {
      type: "text/calendar",
    }));
  }

  return (
    <Grid container p={1} pb={2}>
      <Grid item xs={3}>
        <DateTimeTypography variant={"h6"} ml={1} mr={0.5}>
          <Link type={"button"} href={url}>
            {format(props.start, "MMM d @ h:mm a")}
          </Link>
        </DateTimeTypography>
      </Grid>
      <TitleGridItem item xs={9}>
        <TitleTypography variant={"h6"} ml={0.5} mr={1}>
          {props.title}
        </TitleTypography>
      </TitleGridItem>
      <Grid item xs={12}>
        <Divider orientation="horizontal" sx={{borderBottomWidth: 2}}/>
      </Grid>
      <Grid item xs={3}/>
      <Grid item xs={9} mt={1}>
        <DescriptionTypography ml={0.5} mr={1}>
          <span>{props.description}</span>
          <br/>
          <br/>
          <span>{props.prettyLocation}</span>
        </DescriptionTypography>
      </Grid>
    </Grid>
  );
}

export default ScheduleEvent;
