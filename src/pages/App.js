import React from 'react';
import ToDoPage from './ToDoPage/ToDoPage';
import ListPage from './ListPage/ListPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {

  const Stack = createNativeStackNavigator()
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
name='ListPage'
component={ListPage}
options={{title: 'Liste Sayfası'}}>

</Stack.Screen>
        <Stack.Screen
name='ToDoPage'
component={ToDoPage}
options={({ route }) => ({ title: route.params.text })}>
</Stack.Screen>



      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
  
}


export default App;
