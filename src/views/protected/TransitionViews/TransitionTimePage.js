import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TransitionTimeHelp from "./TransitionTimeHelp";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TransitionTimer from "./TransitionTimer";
import TransitionLog from "./TransitionLog";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import AppBar from "../../../components/AppBar";
import Notes from "../../../components/Notes";
import { connect } from "react-redux";
import { resetTransitionTime } from "../../../state/actions/transition-time";
// import TransitionTimeRecs from "./TransitionTimeRecs";
import TransitionTypeSel from "./TransitionTypeSel";
import Dashboard from "../../../components/Dashboard";

const styles = {
  root: {
    flexGrow: 1,
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

/**
 * transition time observation tool
 * @class TransitionTimePage
 */
class TransitionTimePage extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      anchorEl: null,
      help: false,
      notes: false,
      recs: true,
      transitionType: "",
      open: false,
      transitionEnded: false
    };

    // this.handleTransitionType = this.handleTransitionType.bind(this);
  }

  /**
   * @param {string} type
   */
  handleTransitionType = type => {
    if (this.state.transitionEnded) {
      this.setState({ transitionEnded: false });
    }
    this.setState({ transitionType: type });
  };

  /**
   * @param {boolean} open
   */
  handleRecsModal = open => {
    if (open) {
      this.setState({ recs: true });
    } else {
      this.setState({ recs: false });
    }
  };

  handleEndTransition = () => {
    this.setState({ transitionEnded: true });
    this.setState({ transitionType: null });
  };

  /**
   * @param {boolean} open
   */
  handleNotes = open => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };

  handleClickAwayHelp = () => {
    this.setState({ help: false });
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        {this.state.help ? (
          <ClickAwayListener onClickAway={this.handleClickAwayHelp}>
            <TransitionTimeHelp />
          </ClickAwayListener>
        ) : this.state.notes ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <Notes
                open={true}
                onClose={this.handleNotes}
                color="#094492"
                text="Transition Time Notes"
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer> /* : this.state.recs ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <Recs
                open={true}
                onClose={this.handleRecsModal}
                firebase={firebase}
              />
            )}
          </FirebaseContext.Consumer>
        )  */
        ) : (
          <div />
        )}
        <main style={{ flex: 1 }}>
          <Grid container spacing={16} alignItems="center">
            <Grid item xs={3}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <Dashboard
                  magic8="Transition Time"
                  color="#094492"
                  infoDisplay={<TransitionLog />}
                  infoPlacement="center"
                  completeObservation={true}
                />
              </Grid>
            </Grid>
            <Grid item xs={4} justify="center">
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <TransitionTypeSel
                  handleTransitionType={this.handleTransitionType}
                  handleNotes={this.handleNotes}
                  transitionType={this.state.transitionType}
                  transitionEnded={this.state.transitionEnded}
                />
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Grid
                container
                alignItems={"center"}
                justify={"center"}
                direction={"column"}
              >
                <FirebaseContext.Consumer>
                  {firebase => (
                    <TransitionTimer
                      teacherId={this.props.location.state.teacher.id}
                      firebase={firebase}
                      typeSelected={
                        this.state.transitionType === null ? false : true
                      }
                      handleEndTransition={this.handleEndTransition}
                    />
                  )}
                </FirebaseContext.Consumer>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

TransitionTimePage.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(null, { resetTransitionTime })(
  withStyles(styles)(TransitionTimePage)
);
