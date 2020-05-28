import React from 'react';
import {useFile} from '../entryState';
import {MediaPlayer} from './MediaPlayer';

import classNames from 'classnames';
import styles from "./VideoPlayer.module.css";


/**
 * Render video file in MediaPlayer.
 *
 * @param {Object} props
 * @param {number} props.id - Perma id of the video file.
 */
export function VideoPlayer(props) {
  let videoFile = useFile({collectionName: 'videoFiles', permaId: props.id});

  if (videoFile && videoFile.isReady) {
    const processedSources = processSources(videoFile);
    return (
      <div className={styles.root}>
        <MediaPlayer className={classNames(styles.video_player, {[styles.backdrop]: !props.interactive})}
                     type={'video'}
                     sources={processedSources}
                     {...props}
                     />
      </div>
    );
  }
  else{
    return null;
  }
}

VideoPlayer.defaultProps = {
  interactive: false,
  controls: true
};


function processSources(videoFile) {
  return [
    {
      type: 'video/mp4',
      src: `${videoFile.urls['high']}?u=1`
    }
  ];
}