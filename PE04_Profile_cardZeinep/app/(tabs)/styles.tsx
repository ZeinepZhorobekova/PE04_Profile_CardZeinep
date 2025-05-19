import { StyleSheet } from 'react-native';

/*
  Constant defining colors for light and dark themes.
*/
export const Colors = {
  dark: '#000000',  // using hex for clarity
  light: '#FFFFFF',
};

/*
  Base styles for container and box to avoid repetition.
*/
const baseContainerStyles = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const baseBoxStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  height: 150,
  width: 150,
};

/*
  Stylesheet for light theme using spread operator to inherit base styles.
*/
const lightStyleSheet = StyleSheet.create({
  container: {
    ...baseContainerStyles,
    backgroundColor: Colors.light,
  },
  box: {
    ...baseBoxStyles,
    borderColor: Colors.dark,
  },
});

/*
  Stylesheet for dark theme using spread operator.
*/
const darkStyleSheet = StyleSheet.create({
  container: {
    ...baseContainerStyles,
    backgroundColor: Colors.dark,
  },
  box: {
    ...baseBoxStyles,
    borderColor: Colors.light,
  },
});

/*
  Function to return stylesheet based on boolean useDarkTheme.
*/
export default function getStyleSheet(useDarkTheme) {
  return useDarkTheme ? darkStyleSheet : lightStyleSheet;
}
