import React from "react";
import styled from "@emotion/styled";
import Box from "@material-ui/core/Box";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import {ImageListItemData} from "../data/gallery";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";

interface Props {
  images: ImageListItemData[];
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
              {this.props.images.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    alt={item.title}
                    srcSet={`${item.img}?w=800&fit=crop&auto=format 1x,
                             ${item.img}?w=800&fit=crop&auto=format&dpr=2 2x`}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Container>
        </Hidden>
        <Hidden smDown mdUp>
          <Container maxWidth={"lg"}>
            <ImageList variant="masonry" cols={2} gap={8}>
              {this.props.images.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    alt={item.title}
                    srcSet={`${item.img}?w=800&fit=crop&auto=format 1x,
                             ${item.img}?w=800&fit=crop&auto=format&dpr=2 2x`}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Container>
        </Hidden>
        <Hidden mdDown>
          <Container maxWidth={"xl"}>
            <ImageList variant="masonry" cols={3} gap={8}>
              {this.props.images.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    alt={item.title}
                    srcSet={`${item.img}?w=800&fit=crop&auto=format 1x,
                             ${item.img}?w=800&fit=crop&auto=format&dpr=2 2x`}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Container>
        </Hidden>
      </>
    );
  }
}

export default Gallery;