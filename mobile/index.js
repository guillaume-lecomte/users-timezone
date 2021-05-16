import 'react-native-gesture-handler';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { App } from './src/App';
import { name as appName } from './app.json';

export default function Main() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
