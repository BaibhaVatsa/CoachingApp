import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';

class ProjectAdvisor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="subtitle1">
            <strong>{this.props.person.name}</strong>
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {this.props.person.role}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {this.props.person.job}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {this.props.person.affiliation}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

ProjectAdvisor.propTypes = {
  person: PropTypes.object.isRequired,
};
export default ProjectAdvisor;