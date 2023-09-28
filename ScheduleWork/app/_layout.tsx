import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(Drawer)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editUser"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="loadingModal"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="messageModal"
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="selectHoursModal" 
        options={{
          headerShown:false,
          presentation: 'transparentModal',
        }}
      />
    </Stack>
  );
}