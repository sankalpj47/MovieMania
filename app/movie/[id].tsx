import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { fetchMovieDetails } from '@/services/api'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch'

const MovieDetails = () => {
  const {id}=useLocalSearchParams();

  const {data:movie,loading}=useFetch(()=>fetchMovieDetails({imdbID:id}));

  return (
    <View className='bg-primary flex-1  items-center'>
     <ScrollView contentContainerStyle={{ paddingTop: 60,
          paddingBottom: 60,
          paddingHorizontal: 20,
          alignItems: 'center',
      }}>
        <Image source={{ uri: movie?.Poster }}
          style={{ width: 320, height: 460, borderRadius: 12 }}
          resizeMode="cover" />

       <View>
      <View className='flex-col gap-1 pt-6 items-center' >
      <Text className=' font-medium text-white'>{movie?.Title}</Text>

      <View className='flex-row gap-4 '>
      <Text className=' font-light text-white'>{movie?.Year}</Text>
      <Text className=' font-light text-white'>{movie?.Runtime}</Text>
      </View>

      </View>
      </View>



      <View style={{marginTop:20,
        alignSelf:'stretch'
        }} className='flex-col gap-2'>
        <Text className='font-medium text-white'>Overview</Text>
        <Text className='font-light text-white'>{movie?.Plot}</Text>
      </View>


     </ScrollView>
    </View>
  )
}

export default MovieDetails

