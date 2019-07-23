import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import YesNoDialog from "../../components/Shared/YesNoDialog";
import angryFace from "../../assets/icons/1-ex-negative-cqref.png";
import irritatedFace from "../../assets/icons/2-negative-cqref.png";
import neutralFace from "../../assets/icons/3-flat-cqref.png";
import positiveInterestFace from "../../assets/icons/4-pleasant-cqref.png";
import excitedFace from "../../assets/icons/5-vibrant-cqref.png";

function getModalStyle() {
  return {
    position: "fixed",
    top: `35%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  }
});

class RatingModal extends React.Component {
  state = {
    rating: 0,
    value: "undefined"
  };

  handleAngerClick = event => {
    if (this.state.value !== "Anger") {
      this.setState({ value: "Anger" });
      this.setState({ rating: 1 });
    }
  };

  handleIrritationClick = () => {
    if (this.state.value !== "Irritation") {
      this.setState({ value: "Irritation" });
      this.setState({ rating: 2 });
    }
  };

  handleNeutralClick = () => {
    if (this.state.value !== "Neutral") {
      this.setState({ value: "Neutral" });
      this.setState({ rating: 3 });
    }
  };

  handlePositiveInterestClick = () => {
    if (this.state.value !== "Positive Interest") {
      this.setState({ value: "Positive Interest" });
      this.setState({ rating: 4 });
    }
  };

  handleExcitementClick = () => {
    if (this.state.value !== "Excitement") {
      this.setState({ value: "Excitement" });
      this.setState({ rating: 5 });
    }
  };

  /*
        N.B. You must wrap this "modal" component in a modal of your own.
        This is for performance reasons, cf. https://material-ui.com/utils/modal/#performance
     */
  render() {
    const { classes } = this.props;

    return (
      <div style={getModalStyle()} className={classes.paper}>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="flex-start"
        >
          <Typography variant="h6" gutterBottom>
            Teacher Tone Rating
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Please rate the teacher's current tone.
          </Typography>
          <div style={{ height: 20 }} />
          <Grid container direction={"row"} justify={"space-between"}>
            <Grid item>
              <Button
                onClick={this.handleAngerClick}
                variant={this.state.value === "Anger" ? "outlined" : "text"}
              >
                <img alt="angry face" src={angryFace} width="100vw" />
              </Button>
              <Typography variant={"h6"} align={"center"}>
                Anger
              </Typography>
              <Typography variant={"body1"} align={"center"}>
                (yelling, sarcasm)
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={this.handleIrritationClick}
                variant={
                  this.state.value === "Irritation" ? "outlined" : "text"
                }
              >
                <img alt="irritated face" src={irritatedFace} width="100vw" />
              </Button>
              <Typography variant={"h6"} align={"center"}>
                Irritation
              </Typography>
              <Typography variant={"body1"} align={"center"}>
                (grimacing, eye-rolling)
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={this.handleNeutralClick}
                variant={this.state.value === "Neutral" ? "outlined" : "text"}
              >
                <img alt="neutral face" src={neutralFace} width="100vw" />
              </Button>
              <Typography variant={"h6"} align={"center"}>
                Neutral
              </Typography>
              <Typography variant={"body1"} align={"center"}>
                (no facial expression)
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={this.handlePositiveInterestClick}
                variant={
                  this.state.value === "Positive Interest" ? "outlined" : "text"
                }
              >
                <img
                  alt="positive interest face"
                  src={positiveInterestFace}
                  width="100vw"
                />
              </Button>
              <Typography variant={"h6"} align={"center"}>
                Positive Interest
              </Typography>
              <Typography variant={"body1"} align={"center"}>
                (smiling, nodding)
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={this.handleExcitementClick}
                variant={
                  this.state.value === "Excitement" ? "outlined" : "text"
                }
              >
                <img alt="excited face" src={excitedFace} width="100vw" />
              </Button>
              <Typography variant={"h6"} align={"center"}>
                Excitement
              </Typography>
              <Typography variant={"body1"} align={"center"}>
                (laughing, enthusiastic voice)
              </Typography>
            </Grid>
          </Grid>
          <div style={{ height: 20 }} />
          <Grid
            container
            alignItems={"center"}
            justify={"center"}
            direction={"row"}
            style={{spacing: 4}}
          >
            <Grid item xs={3} />
            <Grid item xs={3}>
              <Button variant="contained" onClick={this.props.handleRatingConfirmation.bind(this,this.state.rating)} style={{backgroundColor:"#0988ec", fontSize:"15px", padding:"5px"}}>
                Confirm Rating
              </Button>
            </Grid>
            <Grid item xs={3}>
              <YesNoDialog
                buttonText={"Skip Rating"}
                buttonVariant={"contained"}
                buttonColor={"#e55529"}
                backgroundColor={"#fff"}
                buttonStyle={{ margin: 10 }}
                dialogTitle={`Are you sure you want to skip this rating? This option should only be used in exceptional circumstances.`}
                onAccept={this.props.handleRatingConfirmation}
                onAcceptParams={0}
                shouldOpen={true}
              />
              </Grid>
            <Grid item xs={3} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

RatingModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RatingModal);
