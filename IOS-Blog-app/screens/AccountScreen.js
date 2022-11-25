import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { BlogContext } from "../context/BlogContext";
import { Ionicons } from "@expo/vector-icons";
import Blog from "../components/Blog";

WebBrowser.maybeCompleteAuthSession();

const AccountScreen = ({ navigation }) => {
  const [filteredData, setFilteredData] = useState([]);
  const { setLogin, login, state, setState, refresh } = useContext(BlogContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    if (state) {
      axios
        .get(
          `http://localhost:8081/custom/api/v1/blog/getuserblogs?email=${login.email}`
        )
        .then((res) => setFilteredData(res.data))
        .catch((err) => console.log("Get user blogs" + err.message));
    } else {
      console.log("Login");
    }

    return;
  }, [state]);

  // console.log(filteredData);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Blog", { item })}>
        <Blog
          name={item.name}
          message={item.message}
          image={item.image}
          id={item.id}
        />
      </TouchableOpacity>
    );
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: //<Your Expo client ID>// ,
    iosClientId: process.env.CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${authentication.accessToken}`
        )
        .then((response) => {
          setLogin(response.data);
          setState(true);
        })
        .catch((err) => console.log(err.message));
    }
  }, [response]);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="ios-chevron-back" size={30} color="black" />
          <Text style={{ fontSize: 17 }}>Back</Text>
        </TouchableOpacity>
      </View>

      {state ? (
        <View style={styles.profile}>
          <Image source={{ uri: login?.picture }} style={styles.profileImg} />
          <Text style={styles.profileName}>{login?.name}</Text>
        </View>
      ) : (
        <View style={styles.profile}>
          <Text style={styles.info}>You are not loggedin.</Text>
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
            style={{
              marginTop: 15,
              backgroundColor: "blue",
              width: 100,
              height: 35,
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "400" }}>Login</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.blogsContainer}>
        <Text style={styles.title}>Blogs you posted</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.id}
          data={filteredData}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

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

  profile: {
    height: 200,
    marginHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
  },

  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },

  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },

  info: {
    color: "rgba(0,0,0,0.4)",
    fontWeight: "bold",
    fontSize: 20,
  },

  blogsContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.4)",
    marginBottom: 20,
  },

  blogsContainer: {
    height: 300,
    marginTop: 20,
    marginHorizontal: 10,
  },
});
