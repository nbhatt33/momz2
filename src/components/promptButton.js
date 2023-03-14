import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function PromptButtom({ title, modeValue, ...rest }) {
  return (
      <Button
          mode={modeValue}
          {...rest}
          style={styles.button}
          contentStyle={styles.buttonContainer}
      >
        {title}
      </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 5,
    // writingDirection: 'rtl',
    // wordWrap: 'break-word',
    // fontSize: 10,
    // width: .7 * width,
  },
  buttonContainer: {
    // flexDirection: 'row',
    writingDirection: 'rtl',
    wordWrap: 'break-word',
    fontSize: 10,
    width: .7 * width,
  },
});