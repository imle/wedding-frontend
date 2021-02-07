import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {ImageList, ImageListItem} from "@material-ui/core";
import {ImageListItemData} from "../data/gallery";
import Box from "@material-ui/core/Box";

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

  srcset = (image: string, size: number, rows = 1, cols = 1): string => {
    return `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format 1x,
            ${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`;
  }

  render() {
    const {classes} = this.props;

    const maxWidth = 500;
    const gap = 4;
    const columns = 4;
    const height = (maxWidth - gap * (columns - 1)) / columns + 1;

    console.log(maxWidth, gap, columns, height);

    return (
      <Container className={classes.root} maxWidth={"xl"}>
        <Box width={maxWidth}>
          <ImageList variant="quilted" gap={gap} cols={columns} rowHeight={height} className={classes.root}>
            {this.props.images.map((item) => (
              <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                  srcSet={this.srcset(item.img, height, item.rows, item.cols)}
                  alt={item.title}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        {/*{this.state.loaded ? gallery : <Skeleton variant={"rectangular"} width={100} height={100}/>}*/}
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Gallery);