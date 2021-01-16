import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ImageGallery, {ReactImageGalleryItem} from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  appBar: {
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

interface Props extends WithStyles<typeof styles> {
  images: ReactImageGalleryItem[];
}

interface State {
  selected: null | number;
}

const images = [
  {
    original: 'https://picsum.photos/id/1018/1600/960/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1600/960/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1600/960/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

class Gallery extends React.Component<Props, State> {
  state: State = {
    selected: null,
  };

  handleClose = () => {
    this.setState({selected: null});
  };

  render() {
    const {classes} = this.props;

    return (
      <Container className={classes.root} maxWidth={"xl"}>
        <ImageGallery
          items={images}
          slideInterval={6000}
          autoPlay
          lazyLoad
          infinite
        />
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Gallery);