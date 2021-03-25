import React from "react";
import {ImageListItemData} from "../data/gallery";
import {Skeleton} from "@material-ui/core";
import ImageListItem from "@material-ui/core/ImageListItem";

interface Props {
  image: ImageListItemData;
  noLoad?: boolean;
}

interface State {
  loaded: boolean;
}

class SkeletonGalleryImageListItem extends React.Component<Props, State> {
  state: State = {
    loaded: false,
  };

  handleLoad = () => {
    console.log(this.props.image);
    this.setState({loaded: true});
  };

  render() {
    const imageElement = this.props.noLoad ?
      <></> :
      (
        <img
          onLoad={this.handleLoad}
          hidden={!this.state.loaded}
          alt={this.props.image.title}
          src={`${this.props.image.img}=w1400`}
          srcSet={`${this.props.image.img}=w800 800w,
               ${this.props.image.img}=w1400 1400w,
               ${this.props.image.img}=w2400 2400w`}
          sizes="(max-width: 800px) 800px,
             (max-width: 1400px) 1400px,
             2400px"
        />
      );

    if (!this.state.loaded) {
      return (
        <ImageListItem sx={{
          width: "100%",
        }}>
          <Skeleton variant="rectangular" sx={{
            display: "inline-block",
            width: "100%",
            height: 0,
            paddingBottom: `${this.props.image.aspectRatio * 100}%`,
          }}>
          </Skeleton>
          {imageElement}
        </ImageListItem>
      );
    }

    return (
      <ImageListItem>
        {imageElement}
      </ImageListItem>
    );
  }
}

export default SkeletonGalleryImageListItem;
