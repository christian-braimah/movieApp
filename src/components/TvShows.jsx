import * as React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image , TouchableOpacity} from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { fetchTvShow } from '../services/fetchTvShow';
import { useNavigation } from '@react-navigation/native';

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


    return (
        <View style={style.container}>
            <View style={style.picker}>
                <Picker
                selectedValue={showType}
                onValueChange={(value, index) => setShowType(value)}
                testID="category-picker"
                style={{ height: 50, width: '100%' }} 
                itemStyle={{ height: 54, color: '#000'}}
                >
                    <Picker.Item label="Popular" value="popular" />
                    <Picker.Item label="On the air" value="on_the_air" />
                    <Picker.Item label="Airing Today" value="airing_today" />
                    <Picker.Item label="Top Rated" value="top_rated" />
                </Picker>
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
    }
});