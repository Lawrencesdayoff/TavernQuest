import * as React from 'react';
import { Stack } from 'expo-router';
import { Slot } from 'expo-router';
import { SessionProvider } from '../components/ctx';

export default function RootLayout() {
  return (

    <SessionProvider>
      <Slot />
    </SessionProvider>

  );
}
