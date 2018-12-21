import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import PropTypes from "prop-types";
import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import ms from "pretty-ms";

class TransitionTimer extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        anchorEl: null,
        percentage: 0,
        isOn: false,
        time: 0,
        start: 0,
        hasStarted: false
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onStart = () => {
        this.setState(state => {
            if (state.isOn) {
                this.setState({ hasStarted: false });
                clearInterval(this.timer);
                let end = new Date();
                this.props.handleAppend(end.toLocaleString());
            } else {
                this.setState({ hasStarted: true });
                const startTime = Date.now() - this.state.time;
                this.timer = setInterval(() => {
                    this.setState({ time: Date.now() - startTime });
                });
            }
            return { isOn: !state.isOn };
        });
    };

    onCancel = () => {
        // TODO(thomas): Unexpected behavior - possible bug in the circular progress bar code.
        // Steps to reproduce:
        // 1. Start the timer
        // 2. Without stopping the timer, select Cancel. The progress bar will not reset.
        // 3. Click Cancel for a second time. Progress bar correctly resets.
        clearInterval(this.timer);
        this.setState({
            isOn: false,
            time: 0,
            percentage: 0,
            hasStarted: false
        });
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        if (this.state.hasStarted) {
            setTimeout(() => {
                // @Cleanup
                // Since this is more of a stopwatch rather than a timer, we keep the progress
                // at 100% (to be aesthetically pleasing, I guess). Should remove this dependency
                // later to reduce bloat.
                this.setState({ percentage: 100 });
            }, 100);
        }

        return (
            <div style={{ width: 400, marginTop: 20 }}>
                <CircularProgressbar
                    percentage={this.state.percentage}
                    text={this.state.time === 0 ? "0:00" : ms(this.state.time)}
                    initialAnimation={false}
                    styles={{
                        path: { stroke: "rgba(29, 233, 182, 1)" },
                        text: { fill: "#000", fontSize: "16px" }
                    }}
                />
                <Grid
                    container
                    alignItems={"center"}
                    justify={"space-around"}
                    direction={"column"}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        aria-label="Start"
                        onClick={this.onStart}
                    >
                        {this.state.isOn ? "Stop" : "Start"}
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        aria-label="Cancel"
                        onClick={this.onCancel}
                    >
                        Cancel Transition
                    </Button>
                </Grid>
            </div>
        );
    }
}

TransitionTimer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default TransitionTimer;
