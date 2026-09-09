import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { TimerProvider } from './src/context/TimerContext';

function App() {
  return (
    <SafeAreaProvider>
      <TimerProvider>
        <AppNavigator />
      </TimerProvider>
    </SafeAreaProvider>
  );
}

export default App;
