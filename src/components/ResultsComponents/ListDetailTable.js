import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Paper from "@material-ui/core/Paper/Paper";

const styles = {
  //idk how this works
};
class ListDetailTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper style={{width: '90%', overflowX: 'auto', marginRight: '10%'}}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{backgroundColor:'#3f51b5', color: 'white', fontSize: 14}}>Start Time</TableCell>
              <TableCell style={{backgroundColor:'#3f51b5', color: 'white', fontSize: 14}} align="right">Duration</TableCell>
              <TableCell style={{backgroundColor:'#3f51b5', color: 'white', fontSize: 14}} align="right">Notes</TableCell>
              <TableCell style={{backgroundColor:'#3f51b5', color: 'white', fontSize: 14}} align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(row => (
              <TableRow className={classes.row} key={row.id}>
                <TableCell component="th" scope="row">
                  {row.startTime}
                </TableCell>
                <TableCell align="right">{row.duration}</TableCell>
                <TableCell align="right">{row.notes}</TableCell>
                {row.type === 'INSIDE' ? <TableCell style={{backgroundColor:'#ffc107', color: 'black', fontSize: 14}}>{row.type}</TableCell>
                  : row.type === 'OUTSIDE' ? <TableCell style={{backgroundColor:'#f44336', color: 'black', fontSize: 14}}>{row.type}</TableCell>
                    : row.type === 'WAIT' ? <TableCell style={{backgroundColor:'#69f0ae', color: 'black', fontSize: 14}}>{row.type}</TableCell>
                      : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

ListDetailTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(ListDetailTable);