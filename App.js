import { StyleSheet, ImageBackground } from 'react-native';
import bgImg from './assets/background.png';
import AuthScreen from './screens/AuthScreen.js';

const App = () => {
  return (
    <ImageBackground source={bgImg} style={styles.image}>
      <AuthScreen />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default App;