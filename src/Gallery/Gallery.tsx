import React from "react";
import ImageList from "@material-ui/core/ImageList";
import {ImageListItemData} from "../data/gallery";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import SkeletonGalleryImageListItem from "./SkeletonGalleryImageListItem";

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
      <SkeletonGalleryImageListItem key={item.img} image={item}/>
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