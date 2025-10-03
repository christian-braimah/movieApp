import * as React from "react";
import { View, useWindowDimensions, StyleSheet} from "react-native";
import { TabView, SceneMap, TabBar} from "react-native-tab-view";
import Movies from '../components/Movies'
import TvShows from '../components/TvShows'
import SearchResults from "../components/SearchResults";


const renderScene = SceneMap({
    first:Movies,
    second: SearchResults,
    third:TvShows
})

const routes = [
    {key:"first", title:"Movies"},
    {key:"second", title:"Search Results"},
    {key:"third", title:"TV Shows"}
];

export default function TabNavigation(){
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    return(
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
            <TabBar
            {...props}
            style={styles.tab} 
            indicatorStyle={{ backgroundColor: '#F9A34B' }} 
            activeColor={'#F9A34B'} 
            inactiveColor={'#ffffff'}
            labelStyle={styles.label}
            />
        )}
        
        >
            
        </TabView>
    )
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: "#2C1202",
    },
    label:{
        fontSize:30
    }
  });