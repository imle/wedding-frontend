import React from "react";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import pb from "./photos/logos/pb.svg";
import we from "./photos/logos/we.svg";
import ws from "./photos/logos/ws.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface Props {

}

const Root = styled(Container)`
  padding-top: ${props => props.theme.spacing(4)};
  padding-bottom: ${props => props.theme.spacing(4)};
`;

const Registry: React.FC<Props> = () => {
  return (
    <Root>
      <Box pb={2}>
        <Typography variant={"h4"}>Registry</Typography>
        <Divider orientation="horizontal"/>
      </Box>
      <Box pb={2}>
        <Typography>
          We are lucky enough to already have nearly everything we need for this new chapter together!
          However, for friends and family who have expressed an interest,
          we have created a gift registry for your convenience below.
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Link href={"https://www.potterybarn.com/registry/p7bmvfb7xz/registry-list.html"}>
            <Card variant={"outlined"}>
              <CardMedia
                component="img"
                height="140"
                image={pb}
              />
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link href={"https://www.westelm.com/registry/p7bmvfb7xz/registry-list.html"}>
            <Card variant={"outlined"}>
              <CardMedia
                component="img"
                height="140"
                image={we}
              />
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link href={"https://www.williams-sonoma.com/registry/p7bmvfb7xz/registry-list.html"}>
            <Card variant={"outlined"}>
              <CardMedia
                component="img"
                height="140"
                image={ws}
              />
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Root>
  );
};

export default Registry;
