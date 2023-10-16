import { Redirect, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function Layout() {
  return (
    <Provider store={store}>
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
        <Stack.Screen
          name="inviteWorkerModal" 
          options={{
            headerShown:false,
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="createGroup" 
          options={{
            headerShown:false,
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="editGroup" 
          options={{
            headerShown:false,
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="addUserToGroup" 
          options={{
            headerShown:false,
            presentation: 'transparentModal',
          }}
        />
      </Stack>
    </Provider>
  );
}