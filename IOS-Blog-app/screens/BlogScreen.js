import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { BlogContext } from "../context/BlogContext";
import axios from "axios";

const BlogScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { login } = useContext(BlogContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const deleteBlog = async () => {
    await axios
      .post(`http://localhost:8081/custom/api/v1/blog/removeblog?id=${item.id}`)
      .then((res) => navigation.navigate("Home"))
      .catch((err) => console.log(err.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-chevron-back" size={30} color="black" />
          <Text style={{ fontSize: 17 }}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.blogContainer}>
        <Text style={styles.blogTitle}>{item.name}</Text>
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.image}` }}
          resizeMode="cover"
          style={styles.blogImage}
        />

        <View style={styles.fnBtns}>
          <TouchableOpacity>
            <Ionicons name="add" size={35} color="black" />
          </TouchableOpacity>

          {login?.email == item.email ? (
            <TouchableOpacity onPress={deleteBlog}>
              <MaterialIcons name="delete-outline" size={30} color="red" />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <Text style={styles.blogMessage}>{item.message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  backBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  blogContainer: {
    marginHorizontal: 20,
    marginTop: 35,
  },

  blogTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },

  blogImage: {
    height: 200,
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 20,
  },

  blogMessage: {
    fontSize: 18,
    fontWeight: "400",
  },

  fnBtns: {
    height: 40,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },

  profileInfo: {
    marginBottom: 20,
  },
});
