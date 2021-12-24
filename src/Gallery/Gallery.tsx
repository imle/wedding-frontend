import React from "react";
import ImageList from "@mui/material/ImageList";
import Hidden from "@mui/material/Hidden";
import Container from "@mui/material/Container";
import {small, medium, large} from "./layout";


interface Props {
}

interface State {
  selected: null | number;
  loaded: boolean;
}

class Gallery extends React.Component<Props, State> {
  state: State = {
    selected: null,
    loaded: false,
  };

  handleClose = () => {
    this.setState({selected: null});
  };

  render() {
    return (
      <>
        <Hidden smUp>
          <Container maxWidth={"lg"}>
            <ImageList variant="masonry" cols={1} gap={8}>
              {small}
            </ImageList>
          </Container>
        </Hidden>
        <Hidden smDown mdUp>
          <Container maxWidth={"lg"}>
            <ImageList variant="masonry" cols={2} gap={8}>
              {medium}
            </ImageList>
          </Container>
        </Hidden>
        <Hidden mdDown>
          <Container maxWidth={"xl"}>
            <ImageList variant="masonry" cols={3} gap={8}>
              {large}
            </ImageList>
          </Container>
        </Hidden>
      </>
    );
  }
}

export default Gallery;
