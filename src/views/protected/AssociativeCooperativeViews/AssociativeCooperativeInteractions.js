import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/context";
import { connect } from "react-redux";
import CenterMenu from "../../../components/AssociativeCooperativeComponents/CenterMenuAssocCoop";
import { deleteAllCenters } from "../../../state/actions/associative-cooperative";
import Recs from "./AssociativeCooperativeRecs";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 0
  }
};

class AssociativeCooperativeInteractions extends React.Component {
  state = {
    auth: true,
    ratingIsOpen: false,
    ratings: [],
    climateType: false,
    completeEnabled: false,
    recs: true,
  };
  
  handleRecsModal = open => {
    if (open) {
      this.setState({ recs: true });
    } else {
      this.setState({ recs: false });
    }
  };

  handleRatingModal = () => {
    this.setState({ ratingIsOpen: true });
  };

  handleClickAway = () => {
    this.setState({ help: false });
  };

  handleRatingConfirmation = rating => {
    this.setState({ ratingIsOpen: false });

  };
  handleCompleteButton = enable => {
    this.setState({ completeEnabled: enable });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <FirebaseContext.Consumer>
          {firebase => (
            <AppBar
              firebase={firebase}
              classes={{ root: this.props.classes.grow }}
            />
          )}
        </FirebaseContext.Consumer>
        {this.state.recs ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <Recs
                open={true}
                onClose={this.handleRecsModal}
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        )}
        <main style={{ flex: 1 }}>
          <FirebaseContext.Consumer>
            {firebase => 
              <CenterMenu
                teacherId={this.props.location.state.teacher.id}
                firebase={firebase}
                onStatusChange={this.handleCompleteButton}
              />
            }
          </FirebaseContext.Consumer>
        </main>
      </div>
    );
  }
}

AssociativeCooperativeInteractions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteAllCenters }
)(withStyles(styles)(AssociativeCooperativeInteractions));