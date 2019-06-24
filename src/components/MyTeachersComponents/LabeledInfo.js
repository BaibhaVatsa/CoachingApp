import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


function LabeledInfo(props) {

  const styles = {
    container: {
      //borderStyle: 'solid',
      //borderWidth: 2,
      //borderColor: '#FD8328',
      flexGrow: 1
    },
    labelStyle: {
      fontSize: '0.7em',
      marginBottom: '0.6em',
      marginTop: '0em'
    },
    fieldStyle: {
      marginBottom: '0.6em',
      marginTop: '0em'
    }
  };

  const { container, labelStyle, fieldStyle } = styles;

  const { label, field } = props;

  return(
    <div style={ container }>
      <p style={ labelStyle }>{label}:</p>
      <p style={ fieldStyle }>{field.split('\\n').map((item,key) => {
        return <Fragment key={key}>{item}<br/></Fragment>
      })}</p>
    </div>
  )
}

LabeledInfo.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired
};


export default LabeledInfo;