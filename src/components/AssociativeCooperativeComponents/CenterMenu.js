import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  addNewCenter,
  incrementCenterCount
} from "../../state/actions/associative-cooperative";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  }
});

const VisitCenterButton = ({ centerName, visitCount, onClick }) => {
  let hsl = Math.max(82 - 4 * visitCount, 54);

  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        minHeight: 150,
        minWidth: 150,
        backgroundColor: `hsl(247, 92%, ${hsl}%`
      }}
      onClick={onClick}
    >
      {centerName}
      <br />
      <br />
      {visitCount}
    </Button>
  );
};

class NewCenterDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a New Center</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new center.
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={cn => (this.centerName = cn)}
            margin="dense"
            id="center-name"
            label="Center Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => this.props.handleSubmit(this.centerName.value)}
            color="primary"
          >
            Add Center
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class CenterMenu extends React.Component {
  state = {
    addDialog: false
  };

  handleClickOpen = () => {
    this.setState({ addDialog: true });
  };

  handleClose = () => {
    this.setState({ addDialog: false });
  };

  handleAddCenter = centerName => {
    this.props.addNewCenter(centerName);
    this.handleClose();
  };

  // Entry point for a center visit.
  handleCenterVisit = centerName => {
    let success = true;
    /*
      Add logic here for the center rating pop up. 
      If the submission succeeds, then we call finishCenterVisit to add to the visit count.
    */
    if (success) {
      this.finishCenterVisit(centerName);
    }
  };

  // Exit point for a center visit.
  finishCenterVisit = centerName => {
    this.props.incrementCenterCount(centerName);
  };

  render() {
    return (
      <Grid container spacing={40}>
        <NewCenterDialog
          open={this.state.addDialog}
          handleClose={this.handleClose}
          handleSubmit={this.handleAddCenter}
        />
        {this.props.centers.map((center, index) => (
          <Grid item xs={3}>
            <VisitCenterButton
              centerName={center.name}
              visitCount={center.count}
              onClick={() => this.handleCenterVisit(center.name)}
            />
          </Grid>
        ))}
        <Grid item xs={3}>
          <Button
            variant="contained"
            style={{
              minHeight: 150,
              minWidth: 150,
              backgroundColor: grey[400]
            }}
            onClick={this.handleClickOpen}
          >
            Add Center <br /> <br /> +
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    centers: state.associativeCenterState.associativeCenters
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { addNewCenter, incrementCenterCount }
  )(CenterMenu)
);
