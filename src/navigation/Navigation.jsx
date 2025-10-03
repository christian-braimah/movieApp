import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from "./tabNavigation";
import Details from "../components/Details";


const Stack = createNativeStackNavigator();

function HomeScreen() {
  return <TabNavigation />;
}

function Detail(){
    return(
        <Details/>
    )
}

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movies App"
        component={HomeScreen}
        options={{ headerShown: true, 
            headerStyle: {
            backgroundColor: '#2C1202',
            headerTintColor: '#ffffff',
            fontSize:20,
        },
        headerTitleStyle:{
            fontSize: 20,
            color: "#fff",
        },
        }}
        
      />
      <Stack.Screen
        name="Details"
        component={Detail}
        options={{ headerShown: true,
            headerTintColor: '#fff', 
            headerBackTitle: 'Back to list',
            headerStyle: {
            backgroundColor: '#2C1202',
            headerTintColor: '#ffffff',
            fontSize:20,
        },
        headerTitleStyle:{
            fontSize: 20,
            color: "#fff",
            headerTintColor: "#fff",
        },
        }}
      />
    </Stack.Navigator>
  );
}
