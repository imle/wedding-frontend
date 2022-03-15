import React from "react";
import * as ics from "ics";
import {useTheme} from '@mui/material/styles';
import {format} from "date-fns";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Hidden from "@mui/material/Hidden";
import {useMediaQuery} from "@mui/material";

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
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

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
    <Grid container p={1} pb={2} alignItems="baseline">
      <Hidden smDown>
        <Grid item xs={5} sm={3}>
          <Typography variant={mdUp ? "h6" : "body2"} ml={1} mr={0.5}>
            <Link type={"button"} href={url}>
              {format(props.start, "MMM d @ h:mm a")}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={7} sm={9}>
          <Typography variant={"h6"} ml={0.5} mr={1}>
            {props.title}
          </Typography>
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12} display={"flex"} alignItems="baseline">
          <Typography variant={"body2"} ml={1} mr={0.5}>
            <Link type={"button"} href={url}>
              {format(props.start, "MMM d @ h:mm a")}
            </Link>
          </Typography>
          <Typography variant={"h6"} ml={0.5} mr={1} align={"right"} flexGrow={1}>
            {props.title}
          </Typography>
        </Grid>
      </Hidden>
      <Grid item xs={12}>
        <Divider orientation="horizontal"/>
      </Grid>
      <Grid item xs={0} sm={3}/>
      <Grid item xs={12} sm={9} mt={1}>
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
