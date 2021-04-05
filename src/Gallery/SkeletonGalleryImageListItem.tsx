import React from "react";
import {ImageListItemData} from "../data/gallery";
import {ImageListItemBar, Skeleton} from "@material-ui/core";
import ImageListItem from "@material-ui/core/ImageListItem";

interface Props {
  image: ImageListItemData;
  noLoad?: boolean;
}

const SkeletonGalleryImageListItem: React.FC<Props> = (props) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const textElement = (
    <ImageListItemBar
      title={props.image.title}
      subtitle={props.image.subtitle}

    />
  );
  const imageElement = props.noLoad ? (
    <></>
  ) : (
    <img
      onLoad={() => setLoaded(true)}
      style={!loaded ? {display: "none"} : undefined}
      alt={props.image.title}
      src={`${props.image.img}=w1400`}
      srcSet={`${props.image.img}=w800 800w,
               ${props.image.img}=w1400 1400w,
               ${props.image.img}=w2400 2400w`}
      sizes="(max-width: 800px) 800px,
             (max-width: 1400px) 1400px,
             2400px"
      loading="lazy"
    />
  );

  if (!loaded) {
    return (
      <ImageListItem sx={{
        width: "100%",
      }}>
        <Skeleton variant="rectangular" sx={{
          display: "inline-block",
          width: "100%",
          height: 0,
          paddingBottom: `${props.image.aspectRatio * 100}%`,
        }}>
        </Skeleton>
        {imageElement}
        {textElement}
      </ImageListItem>
    );
  }

  return (
    <ImageListItem>
      {imageElement}
      {textElement}
    </ImageListItem>
  );
};

export default SkeletonGalleryImageListItem;
