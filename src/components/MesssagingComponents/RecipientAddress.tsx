// A simple To: bar to input email address of the recipient
// Connected to database to show the list of the teachers the user can send to
import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class RecipentAddress extends React.Component<{}, {}> {
  render() {
    return (
        <form noValidate autoComplete="off">
        <div>
            <TextField
                id="outlined-basic"
                label="Outlined"
                margin="normal"
                variant="outlined"
                style={{width: "100%"}}
            />
        </div>
        </form>
    );
  }
}