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
        start: 0
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
                clearInterval(this.timer);
                let end = new Date();
                this.setState({ time: 0 });
                this.props.handleAppend(end.toLocaleString());
            } else {
                const startTime = Date.now() - this.state.time;
                this.timer = setInterval(() => {
                    this.setState({ time: Date.now() - startTime });
                });
            }
            return { isOn: !state.isOn };
        });
    };

    onCancel = () => {
        clearInterval(this.timer);
        this.setState({
            isOn: false,
            time: 0,
            percentage: 0
        });
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        setTimeout(() => {
            this.setState({ percentage: this.state.isOn ? 100 : 0 });
        }, 100);

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
                        {this.state.isOn
                            ? "End Transition"
                            : "Start New Transition"}
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
