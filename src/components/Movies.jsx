import * as React from 'react'
import { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';

import { View, 
    Text, 
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image }
from 'react-native'
import { fetchMovie } from '../services/fetchMovie';
import {
    useNavigation,
} from '@react-navigation/native';


const dropdownData =[
    {label:'Now Playing', value:'now_playing'},
    {label:'Popular', value:'popular'},
    {label:'Top Rated', value:'top_rated'},
    {label:'Upcoming', value:'upcoming'},
];


export default function Movies() {

    const navigation = useNavigation();

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [movieType, setMovieType] = useState("now_playing")

    
    useEffect(() => {
        const getMovies = async () => {
            const movieData = await fetchMovie(movieType);
            setMovies(movieData);
            setIsLoading(false); 
        };

        getMovies();
    }, [movieType]); 


    if (isLoading) {
        return (
            <View style={[style.container, style.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const imageBaseUrl = 'https://image.tmdb.org/t/p/w1280';


    return (
        <View style={style.container}>
            <View style={style.picker}>

                <Dropdown
                style={style.dropdown}
                data ={dropdownData}
                value={movieType}
                labelField="label"
                valueField="value"
                placeholder={ "Now Playing"}
                searchPlaceholderTextColor={"#000000"}
                onChange={
                    item => setMovieType(item.value)
                }
                />

            </View>
        
            <FlatList

                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    
                <View style={style.movieItem}>
                    <Image
                    source={{ uri: `${imageBaseUrl}${item.poster_path}`}}
                    style={style.posterImage}
                    resizeMode="cover"
                    />
                    <View style={style.textContainer}>
                        <Text style={style.title}>{item.title}</Text>
                        <Text style={style.text}>Popularity: {item.popularity}</Text>
                        <Text style={style.text}>Release Date: {item.release_date}</Text>
                        
                            <TouchableOpacity 
                                style={style.button}
                                onPress={() => navigation.navigate('Details', {id: item.id, type:'movie'})}

                            >
                                <Text style={style.btnText}>View Movie</Text>
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
        justifyContent:"flex-start"
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