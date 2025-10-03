import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchMovieById } from "../services/fetchMovieById";
import { fetchShowById } from "../services/fetchTvShowById";

function Details() {
    const route = useRoute();

    const { id,type } = route.params;
    const [details, setDetails] = useState(null);

    // Fetching Movie Details
    useEffect(() => {
        const getDetails = async () => {
        try {
            let data;
            if(type === "movie"){
                data = await fetchMovieById(id);
            }else if(type === "tv"){
                data = await fetchShowById(id);
            }
            setDetails(data);
            
        } catch (error) {
            console.error("Failed to fetch movie details", error);
        }
        };
        getDetails();
    }, [id, type]);


    // Image URL 
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w1280';
    
    const title = details?.title ?? details?.name;

    return !details ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
        </View>
    ) : (
        <View
        style={{
            flex: 1,
            alignItems: "center",
            gap: 30,
            padding: 20,
            flexShrink: 1,
        }}
        >

        <Text style={style.title}>{title}</Text>

        <Image
            source={{ uri: `${imageBaseUrl}${details.poster_path}`}}
                        style={style.posterImage}
                        resizeMode="cover"
                        />
        <Text>{details.overview}</Text>
        <View style={{ flex: 1, flexDirection: "row", gap: 2 }}>
            <Text>Popularity: {details.popularity}</Text>
            <Text> | </Text>
            <Text>Release Date: {details.release_date}</Text>
        </View>
        </View>
    );
    }

    const style = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign:"center",
        marginBottom: 5,
    },
    posterImage:{
        aspectRatio:"3.5/5",
        width:"70%",
    }
    });

    export default Details;