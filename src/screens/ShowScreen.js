import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { AntDesign } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  const blogPost = state.find(
    (blogPost) => blogPost.id === navigation.getParam('id')
  );

  console.log(blogPost);

  return (
    <View>
      <Text>{blogPost.title}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
        <AntDesign
          name="edit"
          size={24}
          color="black"
          style={{ marginRight: 25 }}
        />
      </TouchableOpacity>
    ),
  };
};

const style = StyleSheet.create({});

export default ShowScreen;
