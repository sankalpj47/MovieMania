import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, Text, View, Image, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";

export default function Index() {
  const router = useRouter();
     const [searchQuery, setSearchQuery] = useState('');
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() =>
    fetchMovies({
      query: searchQuery,
    })
  );
  
  return (

    <View className="flex-1 bg-primary">
   <Image
  className="absolute z-0 w-full h-full"
  source={images.bg}
  resizeMode="cover" 
/>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image className="mt-20 mb-5 mx-auto"  source={icons.logo} />

        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5 ">

            <SearchBar  onPress={() => router.push("/search")} placeholder="Search for a movie" value={searchQuery}  onChangeText={setSearchQuery} />
        
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

              <FlatList
                data={movies}

                renderItem={({ item }) => (
                  <Link  href={`/movie/${item.imdbID}`} asChild>
                  <TouchableOpacity>
                  <View style={{ width: 100 }}>
             
                      <Image
                        source={{ uri: item.Poster }}
                        className="w-28 h-36 rounded-md"
                        resizeMode="cover"
                      />
                 
                    <Text
                      className="text-white text-sm mt-2"
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {item.Title}
                    </Text>
                  </View>
                  </TouchableOpacity>
                  </Link>
                )}



                keyExtractor={(item) => item.imdbID} // 🔹 changed from item.id
                numColumns={3}


                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 3,
                  marginLeft: 5,
                  marginBottom: 10,
                }}

                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
