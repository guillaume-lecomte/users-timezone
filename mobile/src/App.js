import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootNavigator } from './RootNavigator';

export const App = () => {
  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
};
