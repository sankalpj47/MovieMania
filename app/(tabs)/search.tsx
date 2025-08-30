import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react'
import { images } from '@/constants/images'
import { Image } from 'react-native'
import { fetchMovies } from '@/services/api'
import { Link, useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'


const search = () => {
   const [searchQuery, setSearchQuery] = useState('');

const {
  data: movies,
  loading,
  error,
  refetch: loadMovies,
  reset
} = useFetch(() => fetchMovies({ query: searchQuery }),false);

useEffect(() => {


  const timeoutId =  setTimeout (async () => {
  if(searchQuery.trim()){
    await loadMovies();
  }
  else{
    reset()
  }
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
       <Image
      className="absolute z-0 w-full h-full"
      source={images.bg}
      resizeMode="cover" 
    />

      <ScrollView   className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
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
                      justifyContent: "center",
                      gap: 20,
                      marginTop: 5,
                      paddingRight: 3,
                      marginLeft: 10,
                      marginBottom: 10,
                    }}
    
                    className="mt-4 pb-32"
                    scrollEnabled={false}

                    ListHeaderComponent={
                       <>


                        <View className='w-full flex-row justify-center mt-20'>
                       <Image source={icons.logo} className=''/>
                        </View>
                       <View className='my-5 '>
                        <SearchBar placeholder="Search movies..." 
                        value={searchQuery}
                        onChangeText={(text: string)=>setSearchQuery(text)}
                        />

                       </View>

                       {loading && (
                        <ActivityIndicator size="large" color="#0000ff"/>
                       )}

                       {error && (
                         <Text className="text-red-500 px-5 my-3">Error: {error?.message}</Text>
                       )}

                       {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                        <Text className="text-white text-center my-3">
                          Search Result for {' '}
                          <Text className="text-accent">{searchQuery}</Text>
                        </Text>
                       )}

                       </>
                 
                    }


                    ListEmptyComponent={
                      !loading && !error ?(
                        <View className='mt-10 px-5'>
                          <Text className="text-white text-center">
                           {searchQuery.trim() ? `No results found` : "Search for a movie!"}

                          </Text>
                        </View>
                      ):null
                    }
                  />
                  </ScrollView>
    </View>
  )
}

export default search