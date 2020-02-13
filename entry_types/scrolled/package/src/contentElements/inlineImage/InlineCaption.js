import React from 'react';

import {Text} from 'pageflow-scrolled/frontend';

import styles from './InlineCaption.module.css';

export function InlineCaption(props) {
  if (props.text) {
    return (
      <div className={styles.root}>
        <Text scaleCategory="caption">
          {props.text}
        </Text>
      </div>
    );
  }
  else {
    return null;
  }
}