import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography/Typography';

/**
 * formatting for project advisor details
 * @class ProjectAdvisor
 */
class ProjectAdvisor extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return(
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h5" style={{fontFamily: "Arimo", textAlign: "center"}}>
            <strong>{this.props.person.name}</strong>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{fontFamily: "Arimo", textAlign: "center"}}>
            {this.props.person.role}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{fontFamily: "Arimo", textAlign: "center"}}>
            {this.props.person.job}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{fontFamily: "Arimo", textAlign: "center"}}>
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