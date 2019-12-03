import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { lightGreen, white, deepOrange, orange, blue, indigo } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import ChildWaiting from "../../../assets/icons/ChildWaiting.svg"; 
import WaitinginLine from "../../../assets/icons/WaitinginLine.svg"; 
import Walking from "../../../assets/icons/Walking.svg"; 
import ClassroomRoutines from "../../../assets/icons/classroomRoutines.svg"; 
import bmi from "../../../assets/icons/BehaviorManagementDisruption.svg"; 
import { red } from '@material-ui/core/es/colors';
import other from "../../../assets/icons/other.svg"; 

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 130, 
    height: 130, 
    textAlign: 'center',
  },
  label: {
    flexDirection: 'column ', 
    textAlign: 'center'
  },
});

const raisedThemes = createMuiTheme({
  palette: {
    waitingColor: {
      backgroundColor: lightGreen[300], color:'#000',
      textColor: white,
      primaryTextColor: white,
      boxShadow: "8px 8px #a9a9a9"
    },
    travelingColor: {
      backgroundColor: orange[400], color: '#000',
      textColor: white, 
      primaryTextColor: white,
      boxShadow: "8px 8px #a9a9a9"
    },
    childWaitingColor: { 
      backgroundColor: deepOrange[400], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "8px 8px #a9a9a9"
    }, 
    classroomRoutinesColor: { 
      backgroundColor: blue[300], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "8px 8px #a9a9a9"
    }, 
    bmiColor: { 
      backgroundColor: red['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "8px 8px #a9a9a9"
    }, 
    otherColor: { 
      backgroundColor: indigo['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
      boxShadow: "8px 8px #a9a9a9"
    }
  }
})

const themes = createMuiTheme({
  palette: {
    waitingColor: { 
      backgroundColor: lightGreen[300], color: '#000',
      textColor: white, 
      primaryTextColor: white, 
    },
    travelingColor: { 
      backgroundColor: orange[400], color: '#000',
      textColor: white, 
      primaryTextColor: white,
    }, 
    childWaitingColor: { 
      backgroundColor: deepOrange[400], color: '#000',
      textColor: white,
      primaryTextColor: white, 
    }, 
    classroomRoutinesColor: { 
      backgroundColor: blue[300], color: '#000',
      textColor: white,
      primaryTextColor: white, 
    }, 
    bmiColor: { 
      backgroundColor: red['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
    }, 
    otherColor: { 
      backgroundColor: indigo['A200'], color: '#000',
      textColor: white,
      primaryTextColor: white, 
    }}, 
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
      textColor: white, 
      primaryTextColor: white, 
    },
  }, 
})


class TransitionTypeSel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.transitionEnded && this.props.transitionEnded) {
      this.setState({
        selected: null,
      });
    }
  };

  handleButtonChange = (type) => {
    this.props.handleTransitionType(type);
    this.setState({
      selected: type
    });
    if (type==="other") {
      this.props.handleNotes(true);
    }
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container alignItems="flex-start" direction={"row"}>
          <Grid item xs={6}
            align="center"
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item>
              <Button 
                onClick={() => this.handleButtonChange("waiting")}
                classes={{root: classes.button, label: classes.label}}
                variant="raised"
                style={this.state.selected==="waiting" ? raisedThemes.palette.waitingColor : themes.palette.waitingColor}
              >
                <img alt="Waiting in line" src={WaitinginLine} height='100' width='100'/>
              </Button>
            </Grid>
            <Grid item>
              Waiting in line/
              <br/>
              lining up
            </Grid>
            <br>
            </br>
            <Grid item>
              <Button 
                onClick={() => this.handleButtonChange("traveling")} 
                classes={{root: classes.button, label: classes.label}}
                variant="raised"
                style={this.state.selected==="traveling" ? raisedThemes.palette.travelingColor : themes.palette.travelingColor}
              >
                <img alt="Walking" src={Walking} height='100' width='100'/>
              </Button>
            </Grid>
            <Grid item>
              Traveling outside 
              <br />
              the classroom
            </Grid>
            <br>
            </br>
            <Grid item>
              <Button
                onClick={() => this.handleButtonChange("child waiting")}
                classes={{root: classes.button, label: classes.label}}
                variant="raised"
                style={this.state.selected==="child waiting" ? raisedThemes.palette.childWaitingColor : themes.palette.childWaitingColor}
              >
                <img alt="Child waiting" src={ChildWaiting} height='100' width='100'/>
              </Button>
            </Grid>
            <Grid item>
              Children waiting on teacher/materials
            </Grid>
          </Grid>
          <Grid item xs={6}
            align="center"
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item>
              <Button
                onClick={() => this.handleButtonChange("classroom routines")}
                classes={{root: classes.button, label: classes.label}}
                variant="raised"
                style={this.state.selected==="classroom routines" ? raisedThemes.palette.classroomRoutinesColor : themes.palette.classroomRoutinesColor}
              >
                <img alt="classroom routines" src={ClassroomRoutines} height='100' width='100'/>
              </Button>
            </Grid>
            <Grid item>
              Classroom routines
            </Grid>
            <br>
            </br>
            <br>
            </br>
            <Grid item>
              <Button 
                onClick={() => this.handleButtonChange("behavior management disruption")}
                classes={{root: classes.button, label: classes.label}}
                variant="raised"
                style={this.state.selected==="behavior management disruption" ? raisedThemes.palette.bmiColor : themes.palette.bmiColor}
              >
                <img alt="Behavior Management Disruption" src={bmi} height='100' width='100'/>
              </Button>
            </Grid>
            <Grid item>
              Behavior management 
              <br />
              disruption
            </Grid>
            <br>
            </br>
            <Grid item>
              <Button
                onClick={() => this.handleButtonChange("other")}
                classes={{root: classes.button, label: classes.label}}
                variant="raised"
                style={this.state.selected==="other" ? raisedThemes.palette.otherColor : themes.palette.otherColor}
              >
                <img alt="other" src={other} height='100' width='100'/>
              </Button>
            </Grid>
            <Grid item>
              Other
            </Grid>
            <br>
            </br>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TransitionTypeSel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransitionTypeSel)