import { View, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import logo from './../assets/images/logo.png'
import Spinner from 'react-native-loading-spinner-overlay';

export default function LoadingModal() {
  const isPresented = router.canGoBack();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      {!isPresented && <Link href="../">Dismiss</Link>}
      <Image style={{width: 255, height: 70, marginTop: -70}} source={logo}/>
      <Spinner
          visible={true}
          color='#2b3'
          size={50}
          indicatorStyle={{marginBottom: -150}}
          textContent={'Ładowanie...'}
          textStyle={{color: 'black', fontSize: 12}}
        />
      <StatusBar style="light" />
    </View>
  );
}