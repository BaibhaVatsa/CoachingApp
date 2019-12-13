import React from "react";
import { DefaultPlayer as Video } from "react-html5video/dist";
import "react-html5video/dist/styles.css";
import PropTypes from "prop-types";

/**
 * specifies controls and default settings for demo video on landing page
 * @class DemoVideo
 */
class TrainingVideo extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return (
      <Video
        autoPlay
        loop
        muted
        controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
        poster="http://sourceposter.jpg"
        onCanPlayThrough={() => {
          // Do stuff
        }}
      >
        <source src={this.props.videoUrl} type="video/mp4" />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="http://source.vtt"
          default
        />
      </Video>
    );
  }
}

TrainingVideo.propTypes = {
  videoUrl: PropTypes.string
};

export default TrainingVideo;
