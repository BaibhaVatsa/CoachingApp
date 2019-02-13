import React from "react";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import InfoIcon from "@material-ui/icons/Help";
import EditIcon from "@material-ui/icons/Edit";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import spreadsheetData from "../../../SPREADSHEET_SECRETS";
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import { ImmortalDB } from "immortal-db";
import cyan from "@material-ui/core/colors/teal";

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
    },
    viewButtons: {
        minWidth: 150,
        textAlign: "center"
    }
};

const COLOR_1 = "#F9A796";
const COLOR_2 = "#FFE79D";
const COLOR_3 = "#4DEDBC";

let getHexFromType = type => {
    switch (type) {
        case "Wait Time":
            return COLOR_1;
        case "Inside Classroom":
            return COLOR_2;
        case "Outside Classroom":
            return COLOR_3;
        default:
            return "#FFFFFF";
    }
};

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
        onSummary: true,
        onList: false,
        onTrends: false,
        onNextSteps: false,
        iFrameSRC: ""
    };

    componentDidMount() {
        console.log(this.props.location.state);
    }

    handleAppend(entry) {
        let newEntries = this.state.entries;
        entry.type = this.state.type;
        newEntries.push(entry);
        this.setState({ entries: newEntries });

        this.handleSpreadsheetAppend(entry);

        this.handleDBinsert(entry);
    }

    handleTypeChange(newType) {
        this.setState({ type: newType });
        this.changeHex(newType);
    }

    changeHex = (type) => {
        let mHex = getHexFromType(type);
        this.setState({hex: mHex})
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

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
        if (this.state.onSummary == false){
            this.setState({ onSummary: true });
            this.setState({ onList: false });
            this.setState({ onTrends: false });
            this.setState({ onNextSteps: false });
            this.setState({ iFrameSRC: ""});
        }
    };

    listClick = () => {
        if (this.state.onList == false){
            this.setState({ onSummary: false });
            this.setState({ onList: true });
            this.setState({ onTrends: false });
            this.setState({ onNextSteps: false });
            this.setState({ iFrameSRC: ""});
        }
    };

    trendsClick = () => {
        if (this.state.onTrends == false){
            this.setState({ onSummary: false });
            this.setState({ onList: false });
            this.setState({ onTrends: true });
            this.setState({ onNextSteps: false })
            this.setState({ iFrameSRC: "https://datastudio.google.com/embed/reporting/1gajoLOQyrnFx7QGPTa6iHTEBOy_3Qhoz/page/IRsg"});
        }
    };

    nextStepsClick = () => {
        if (this.state.onNextSteps == false){
            this.setState({ onSummary: false });
            this.setState({ onList: false });
            this.setState({ onTrends: false });
            this.setState({ onNextSteps: true });
            this.setState({ iFrameSRC: ""});
        }
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <FirebaseContext.Consumer>
                    {firebase => <AppBar firebase={firebase} />}
                </FirebaseContext.Consumer>
                <main style={{ flex: 1 }}>
                    <Grid container spacing={16} justify="center">
                      <List>
                        <ListItem>
                            <form>
                                <FormControl variant="filled" className={classes.viewButtons}>
                                    <InputLabel htmlFor="filled-age-simple">Date</InputLabel>
                                    <Select
                                        input={<FilledInput name="age" id="filled-age-simple" />}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </ListItem>
                        <ListItem>
                          <Button size= "large"
                                  color= {"secondary"}
                                  variant = {this.state.onSummary ? "contained" : "outlined"}
                                  className={classes.viewButtons}
                                  onClick={this.summaryClick}>
                          Summary
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button size= "large"
                                  color= {"primary"}
                                  variant = {this.state.onList ? "contained" : "outlined"}
                                  className={classes.viewButtons}
                                  onClick={this.listClick}>
                          List Detail
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button size= "large"
                                  color= {"secondary"}
                                  variant = {this.state.onTrends ? "contained" : "outlined"}
                                  className={classes.viewButtons}
                                  onClick={this.trendsClick}>
                          Trends
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button size= "large"
                                  color= {"inherit"}
                                  variant = {this.state.onNextSteps ? "contained" : "outlined"}
                                  className={classes.viewButtons}
                                  onClick={this.nextStepsClick}>
                          Next Steps
                          </Button>
                        </ListItem>
                      </List>
                      <iframe src={this.state.iFrameSRC}
                              width="600px"
                              height="425px"
                              id="myId"
                              className="myClassname"
                              display="initial"
                              position="relative"
                              allowFullScreen/>
                    </Grid>
                </main>
            </div>
        );
    }
}

TransitionResults.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionResults);
