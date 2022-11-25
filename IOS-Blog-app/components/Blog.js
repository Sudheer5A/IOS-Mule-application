import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Blog = ({ name, image, message }) => {
  return (
    <View style={[styles.container, styles.boxWithShadow]}>
      <Image
        style={styles.img}
        resizeMode="cover"
        source={{ uri: `data:image/jpeg;base64,${image}` }}
      ></Image>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.message}>{`${message.substring(0, 60)}...`}</Text>
    </View>
  );
};

export default Blog;

const styles = StyleSheet.create({
  container: {
    height: 230,
    width: 200,
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
