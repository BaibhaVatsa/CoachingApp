import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

/**
 * specifies styling for modal
 * @return {css}
 */
function getModalStyle() {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  } as React.CSSProperties;
}

const styles: object = {
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: 8
  }
};

interface Props {
  classes: {
    paper: string
  }
}

/**
 * Modal when User does not Complete Tone Rating in Climate Observation
 * @class EmptyToneRating
 */
class EmptyToneRating extends React.Component<Props, {}> {
  state = {
    open: true
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal open={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              <Typography variant="h4" gutterBottom>
                Incomplete Observation
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                You have not completed your observation yet.
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Please choose one of the five <strong>tone ratings</strong>{" "}
                before pressing <strong>Confirm Rating</strong>.
              </Typography>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(EmptyToneRating);
