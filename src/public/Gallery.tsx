import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Gallery.css";

import {ImageTile} from "./data";
import Hidden from "@material-ui/core/Hidden";

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0.5),
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
  images: ImageTile[];
}

interface State {
  selected: null | number;
}

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
        <Hidden mdUp>
          <GridList cellHeight={160} cols={3}>
            {/*<GridList cellHeight={240} cols={2}>*/}
            {this.props.images.map((tile, i) => (
              <GridListTile key={i} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} onClick={() => this.setState({selected: i})}/>
              </GridListTile>
            ))}
          </GridList>
        </Hidden>
        <Hidden smDown>
          <GridList cellHeight={360} cols={3}>
            {/*<GridList cellHeight={240} cols={2}>*/}
            {this.props.images.map((tile, i) => (
              <GridListTile key={i} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} onClick={() => this.setState({selected: i})}/>
              </GridListTile>
            ))}
          </GridList>
        </Hidden>
        <Dialog fullScreen open={this.state.selected !== null} onClose={this.handleClose}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Gallery
              </Typography>
            </Toolbar>
          </AppBar>
          <Container>
            <Carousel interval={this.state.selected as number} useKeyboardArrows autoFocus showThumbs={false}>
              {this.props.images.map((tile, i) => (
                <div key={i}>
                  <h3>{tile.title}</h3>
                  <img
                    src={tile.img}
                    alt={tile.title}
                  />
                </div>
              ))}
            </Carousel>
          </Container>
        </Dialog>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Gallery);