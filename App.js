import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';



export default function App() {

  return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigation/>
        </NavigationContainer>
      </SafeAreaProvider>

      
  );
}

