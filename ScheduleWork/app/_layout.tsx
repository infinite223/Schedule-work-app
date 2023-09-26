import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="loadingModal"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'modal',
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="messageModal"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}