import React from "react";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import {ImageListItemData} from "./data/gallery";
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
    const imageList = this.props.images.map((item) => (
      <ImageListItem key={item.img}>
        <img
          alt={item.title}
          src={`${item.img}=w1400`}
          srcSet={`${item.img}=w800 800w,
                   ${item.img}=w1400 1400w`}
          sizes="(max-width: 800px) 800px,
                 1400px"
        />
      </ImageListItem>
    ));

    return (
      <>
        <Hidden smUp>
          <Container maxWidth={"lg"}>
            <ImageList variant="masonry" cols={1} gap={8}>
              {imageList}
            </ImageList>
          </Container>
        </Hidden>
        <Hidden smDown mdUp>
          <Container maxWidth={"lg"}>
            <ImageList variant="masonry" cols={2} gap={8}>
              {imageList}
            </ImageList>
          </Container>
        </Hidden>
        <Hidden mdDown>
          <Container maxWidth={"xl"}>
            <ImageList variant="masonry" cols={3} gap={8}>
              {imageList}
            </ImageList>
          </Container>
        </Hidden>
      </>
    );
  }
}

export default Gallery;