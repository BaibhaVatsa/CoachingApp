import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Select from "@material-ui/core/Select";
import { ReactComponent as GenerateReportSVG } from "../../../assets/icons/generateReport.svg";
import TransitionTimeIcon from "../../../assets/icons/TransitionTime.svg";
import { withStyles } from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import { ImmortalDB } from "immortal-db";
import { VictoryPie } from "victory-pie";
import ListDetailTableTransitionResults from "../../../components/ResultsComponents/ListDetailTableTransitionResults.js";
import NotesListDetailTable from "../../../components/ResultsComponents/NotesListDetailTable";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import TransitionTimePie from "../../../components/ResultsComponents/TransitionTimePie";
import TransitionTrendsGraph from "../../../components/ResultsComponents/TransitionTrendsGraph";
import moment from 'moment';


const styles = {
  root: {
    flexGrow: 1,
    height: "100vh",
    flexDirection: "column"
  },
  main: {
    flex: 1,
    height: "90%",
    marginTop: "10vh"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  viewButtons: {
    minWidth: 150,
    textAlign: "center"
  },
  buttonsList: {
    position: "relative",
    top: "3vh"
  },
  title: {
    position: "relative",
    left: "33%",
    top: "10%"
  },
  secondTitle: {
    position: "relative",
    left: "40%",
    top: "10%"
  },
  chart: {
    position: "relative",
    left: "7%",
    top: "5%"
  },
  generateReport: {
    position: "relative",
    right: "10%",
    top: "76%",
    left: "10%"
  },
  resultsContent: {
      height: "60vh",
      position: "relative",
      top: "8vh"
  }
};

const ViewEnum = {
  SUMMARY: 1,
  LIST: 2,
  TRENDS: 3,
  NOTES: 4,
  NEXT_STEPS: 5
};

// dummy data for transition list detail table, when we read in from DB we can use custom id
let id = 0;

function createTransitionData(startTime, duration, notes, type) {
  id += 1;
  return { id, startTime, duration, notes, type };
}

function createNotesData(time, notes) {
  id += 1;
  return { id, time, notes };
}

const transitionData = [
  createTransitionData("08:32", "2m 3s", "Breakfast to am meeting", "INSIDE"),
  createTransitionData("08:44", "5m 10s", "Line up for bathroom", "OUTSIDE"),
  createTransitionData("09:01", "1m 7s", "T finding book", "WAIT"),
  createTransitionData("09:37", "1m 56s", "Rotating rooms", "WAIT"),
  createTransitionData("09:56", "3m 2s", "Cleanup after centers", "INSIDE")
];

const transitionNotes = [
  createNotesData("08:32", "Kiss your brain"),
  createNotesData("08:44", "Great super friend"),
  createNotesData("09:01", "Lots of good jobs"),
  createNotesData("09:37", "BD frown"),
  createNotesData("09:56", "Close down center conflict")
];

class TransitionResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleAppend = this.handleAppend.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  state = {
    auth: true,
    anchorEl: null,
    help: false,
    type: null,
    hex: "#FFFFFF",
    entries: [],
    dbCounter: 0, // @Hack @Temporary !!!
    view: ViewEnum.SUMMARY,
    sessionId: null,
    sessionDates: [],
  };

  componentDidMount() {
    console.log(this.props.location.state);
    let teacherId = this.props.location.state.teacher.id;
    console.log(this.props.location.state);
    this.handleDateFetching(this.props.location.state.teacher.id);
    console.log(teacherId);
    console.log("handle behavior count results fetching called");
  }

  handleAppend(entry) {
    let newEntries = this.state.entries;
    entry.type = this.state.type;
    newEntries.push(entry);
    this.setState({ entries: newEntries });

    this.handleSpreadsheetAppend(entry);

    this.handleDBinsert(entry);
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleTypeChange(newType) {
      this.setState({ type: newType });
      this.changeHex(newType);
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleHelpModal = () => {
    this.setState({ help: true });
  };

  handleClickAway = () => {
    this.setState({ help: false });
  };

  handleDBinsert = async entry => {
    // Once we integrate users, the user + some index will be the key for the DB.
    await ImmortalDB.set(
      JSON.stringify(this.state.dbCounter),
      JSON.stringify(entry)
    );

    this.setState({ dbCounter: this.state.dbCounter + 1 });
  };

  handleSpreadsheetAppend = entry => {
    let url = new URL(spreadsheetData.scriptLink),
      params = {
        sheet: "TransitionTime",
        del: "false",
        TrnStart: entry.start,
        TrnEnd: entry.end,
        TrnDur: entry.duration,
        TrnType: entry.type,
        TeacherID: this.props.location.state.key.id
      };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
      method: "POST",
      credentials: "include",
      mode: "no-cors",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => console.log("Success"))
      .catch(error => console.error("Error:", error));
  };


  summaryClick = () => {
    if (this.state.view !== ViewEnum.SUMMARY) {
      this.setState({ view: ViewEnum.SUMMARY });
    }
  };

  listClick = () => {
    if (this.state.view !== ViewEnum.LIST) {
      this.setState({ view: ViewEnum.LIST });
    }
  };

  trendsClick = () => {
    if (this.state.view !== ViewEnum.TRENDS) {
      this.setState({ view: ViewEnum.TRENDS });
    }
  };

  notesClick = () => {
    if (this.state.view !== ViewEnum.NOTES) {
      this.setState({ view: ViewEnum.NOTES });
    }
  };

  nextStepsClick = () => {
    if (this.state.view !== ViewEnum.NEXT_STEPS) {
      this.setState({ view: ViewEnum.NEXT_STEPS });
    }
  };

  handleDateFetching = (teacherId) => {
    console.log("handle date fetching called");
    let firebase = this.context;
    firebase.fetchTransitionSessionDates(teacherId).then(dates=>this.setState({
      sessionDates: dates
    }));

    console.log("Session Dates: " + this.state.sessionDates)

  };

  changeSessionId = (event) => {
    console.log("sessionId",event.target.value);
    this.setState({
      sessionId: event.target.value,
    }, () => {

    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <main>
          <Grid container spacing={0} justify="center" direction={"row"} alignItems={"center"}>
            <Grid container item xs={3}>
              <List className={classes.buttonsList}>
              <ListItem>
                <img src={TransitionTimeIcon} style={{width:"15vw", height:"10vh", position:"center"}} />
              </ListItem>
              <ListItem>
                <TextField
                  select
                  className={classes.viewButtons}
                  label="Date"
                  value={this.state.sessionId}
                  onChange={this.changeSessionId}
                  InputLabelProps={{ shrink: true }}>
                  {this.state.sessionDates.map(date=> {return <MenuItem id={date.id} value={date.id}>
                    <em>{moment(date.start.value).format("MMM Do YY HH:mm A")}</em>
                  </MenuItem>})}
                </TextField>
              </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    variant={
                      this.state.view === ViewEnum.SUMMARY
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.summaryClick}
                  >
                    Summary
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    variant={
                      this.state.view === ViewEnum.LIST
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.listClick}
                  >
                    List Detail
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    variant={
                      this.state.view === ViewEnum.TRENDS
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.trendsClick}
                  >
                    Trends
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color={"primary"}
                    variant={
                      this.state.view === ViewEnum.NOTES
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.notesClick}
                  >
                    Notes
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    size="large"
                    color= {"primary"}
                    variant={
                      this.state.view === ViewEnum.NEXT_STEPS
                        ? "contained"
                        : "outlined"
                    }
                    className={classes.viewButtons}
                    onClick={this.nextStepsClick}
                  >
                    Next Steps
                  </Button>
                </ListItem>
                <ListItem>
                  <IconButton className={classes.generateReport}>
                    <GenerateReportSVG
                      style={{
                        height: "10vh",
                        width: "10vh"
                      }}
                    />
                  </IconButton>
                </ListItem>
              </List>
            </Grid>
            <Grid container item xs={8} justify="center" direction={"row"} alignItems={"center"}>
                  <Typography variant={"h4"} alignItems={"center"} justify={"center"}>
                    Transition Time Results
                  </Typography>
                <Grid item xs={12} alignItems={"center"} justify={"center"}>
                  <Typography variant={"h7"} style={{ marginLeft: "20vw" }}>
                    Total Transition Time: {"30.2 minutes"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    {this.state.view === ViewEnum.SUMMARY ? (
                      <div className={classes.resultsContent}>
                        <TransitionTimePie/>
                      </div>
                    ) : this.state.view === ViewEnum.LIST ? (
                      <div className={classes.resultsContent}>
                        <ListDetailTableTransitionResults
                          data={transitionData}
                        />
                      </div>
                    ) : this.state.view === ViewEnum.TRENDS ? (
                      <div className={classes.resultsContent}
                      >
                        <TransitionTrendsGraph/>
                      </div>
                    ) : this.state.view === ViewEnum.NOTES ? (
                      <div className={classes.resultsContent}
                      >
                        <NotesListDetailTable data={transitionNotes} />
                      </div>
                    ) : this.state.view === ViewEnum.NEXT_STEPS ? (
                      <div className={classes.resultsContent} /> // replace this null with next steps content
                    ) : null}
                  </div>
                </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

TransitionResults.propTypes = {
  classes: PropTypes.object.isRequired
};

TransitionResults.contextType = FirebaseContext;
export default withStyles(styles)(TransitionResults);
