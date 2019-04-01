import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { HorizontalBar, Line } from "react-chartjs-2";

const styles = {
    //idk how this works
};

/**
 * specifies data sets (and formatting) for the teacher behaviors details horizontal bar
 * @type {{datasets: *[], labels: string[][]}}
 */
const teacherBehaviorsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class TeacherBehaviorsDetailsHorizontalBar extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <HorizontalBar data={teacherBehaviorsData}
                           width="650"
                           height="400"/>
        );
    }
}

TeacherBehaviorsDetailsHorizontalBar.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(TeacherBehaviorsDetailsHorizontalBar);