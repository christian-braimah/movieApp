import * as React from 'react';
import { useState } from 'react';
import { 
    View, 
    TextInput, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    FlatList,
    Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchThroughSearch } from '../services/fetchThroughSearch';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; 


export default function SearchResults() {
    const navigation = useNavigation(); 

    
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState("multi");
    const [searchData, setSearchData] = useState([]); 

    
    const handleSearch = async () => {
        if (query.trim() === '') return; 
        try {
            const data = await fetchThroughSearch(query, searchType);
            setSearchData(data.results);
        } catch (error) {
            console.error("Couldn't fetch data from search", error);
        }
    };

    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <View style={style.container}>
            <Text>Search Movie / TV Show Name</Text>
            <View style={style.searchBox}>
                <TextInput
                    style={style.input}
                    placeholder="e.g., Inception, The Office..."
                    value={query}
                    onChangeText={setQuery}
                />

            </View>

            <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
                <View style={{ flex: 1, flexDirection:"column"}}>
                    <Text>Choose Search Type</Text>
                    <Picker
                        selectedValue={searchType}
                        onValueChange={(value) => setSearchType(value)}
                        testID="category-picker"
                        style={{ height: 'auto', width: '100%' }} 
                        itemStyle={{ height: 54, color: '#000'}}
                        >
                            <Picker.Item label="Multi" value="multi" />
                            <Picker.Item label="Movie" value="movie" />
                            <Picker.Item label="TV" value="tv" />
                    </Picker>

                    <View>
                    <TouchableOpacity style={style.button} onPress={handleSearch}>
                            <MaterialIcons name="search" size={20} color="#ffff" />
                            <Text style={style.btnText}>Search</Text>
                    </TouchableOpacity>
                </View>
                </View>

                
                

            </View>

            {!searchData.length >0 ? 
            (<View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center"}}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Please initiate a search</Text>
    
                </View>): 
            (
                
                        <FlatList
                    data={searchData} 
                    keyExtractor={(item) => item.id.toString()}
                    initialNumToRender={10}
                    renderItem={({ item }) => {

                        const searchTitle = item?.name ?? item?.original_title
                        return (
                            <View style={{paddingTop:15}}>
                                <View style={style.movieItem}>
                                    {item.poster_path ? <Image
                                        source={{uri:`${imageBaseUrl}${item.poster_path}`}}
                                        style={style.posterImage}
                                    />: <View style={style.posterImage}>
                                        <Text>No Image Available</Text>
                                        </View>}
                                    
                                    <View style={style.textContainer}>
                                        <Text style={style.title}>{searchTitle}</Text>
                                        <Text style={style.text}>Release Date: {item.release_date}</Text>
                                        <Text style={style.text}>Popularity: {item.popularity}</Text>
                                        <TouchableOpacity
                                            style={style.detailsButton}
                                            onPress={() => navigation.navigate('Details', { id: item.id, type: item.media_type || searchType})}
                                        >
                                            <Text style={style.btnText}>More Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>
                            </View>
                        );
                    }}
                />
            )}


        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
    },
    horizontal: { 
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    button: {
        padding: 10,
        backgroundColor: "#84370B",
        borderRadius: 5,
        marginTop:5,
        height: 40,
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: 'center',
        gap: 5
    },
    detailsButton: {
        padding: 10,
        marginTop: 5,
        backgroundColor: "#84370B",
        borderRadius: 5,
        width: "60%",
    },
    btnText: {
        color: "white",
        textAlign: "center"
    },
    movieItem: {
        marginBottom: 15,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 15,
        flex:1,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    textContainer: {
        flex: 1,
        flexShrink: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    posterImage: {
        width: 100,
        height: 150,
        borderRadius: 5,
    }
});