import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SearchBlog = ({ name, image, message, id }) => {
  const navigation = useNavigation();
  const item = {
    name,
    image,
    message,
    id,
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Blog", { item })}>
      <View style={[styles.container, styles.boxWithShadow]}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: `data:image/jpeg;base64,${image}` }}
        ></Image>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.message}>{`${message.substring(0, 160)}...`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchBlog;

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 350,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 10,
    backgroundColor: "white",
    marginVertical: 10,
  },

  boxWithShadow: {
    shadowColor: "#000",
    shadowOffset: { width: -8, height: -14 },
    shadowOpacity: 0.8,
    shadowRadius: 9,
  },

  img: {
    height: "50%",
    borderRadius: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 10,
    marginHorizontal: 15,
  },

  message: {
    marginHorizontal: 15,
  },
});
