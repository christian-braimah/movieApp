import * as React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image , TouchableOpacity} from 'react-native'
import { fetchTvShow } from '../services/fetchTvShow';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

export default function TvShows() {
    const [tvShow, setTvShow] = useState([]);
    const [showType, setShowType] = useState("popular")

    const navigation = useNavigation();
    
    useEffect(() => {
        const getTvShows = async () => {
            const showData = await fetchTvShow(showType);
            setTvShow(showData);
        };

        getTvShows();
    }, [showType]); 


    const imageBaseUrl = 'https://image.tmdb.org/t/p/w1280';

    const dropdownData =[
        {label:'Popular', value:'popular'},
        {label:'On the Air', value:'on_the_air'},
        {label:'Airing Today', value:'airing_today'},
        {label:'Top Rated', value:'top_rated'},
    ]


    return (
        <View style={style.container}>
            <View style={style.picker}>
            <Dropdown
                style={style.dropdown}
                data ={dropdownData}
                value={showType}
                labelField="label"
                valueField="value"
                placeholder={ "Now Playing"}
                searchPlaceholderTextColor={"#000000"}
                onChange={
                    item => setShowType(item.value)
                }
                />


            </View>
        
            <FlatList
                data={tvShow}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    
                <View style={style.movieItem}>
                    <Image
                    source={{ uri: `${imageBaseUrl}${item.poster_path}`}}
                    style={style.posterImage}
                    resizeMode="cover"
                    />
                    <View style={style.textContainer}>
                    <Text style={style.title}>{item.original_name}</Text>
                        <Text style={style.text}>Popularity: {item.popularity}</Text>
                        <Text style={style.text}>Release Date: {item.release_date}</Text>
                        <TouchableOpacity 
                                style={style.button}
                                onPress={() => navigation.navigate('Details', {id: item.id,type: 'tv'})}

                            >
                                <Text style={style.btnText}>More Details</Text>
                            </TouchableOpacity>
                    </View>
                        
                    </View>
                )}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        justifyContent: 'center',
    },
    picker:{
        marginBottom:20,
    },
    horizontal: { 
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    movieItem: {
        marginBottom: 15,
        paddingBottom: 10,
        flexDirection:"row",
        gap: "20",
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textContainer:{
        flex:1,
        flexShrink:1,
    }
    ,
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        
    },
    posterImage:{
        width: 100,
        height: 150,
        borderRadius: 5,
    },
    button:{
        padding:10,
        marginTop:5,
        textAlign:"center",
        backgroundColor:"#84370B",
        borderRadius:5,
        width:"50%"

    },
    btnText:{
        color:"white",
        textAlign:"center"
    },
    dropdown: {
        marginBottom:10,
        marginTop:10,
        height: 50,
        border: '#fefefe',
        borderWidth: 0.3,
        borderRadius:8,
        padding:10,
    }
});