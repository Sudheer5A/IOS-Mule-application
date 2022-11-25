import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  RefreshControl,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Blog from "../components/Blog";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState();
  const [filteredData, setFilteredData] = useState();
  const { blogData, setRefresh, refresh, login, state } =
    useContext(BlogContext);

  const filteredSearch = () => {
    setFilteredData(
      blogData?.filter((item) =>
        item?.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    navigation.navigate("Search", { filteredData });

    setSearch("");
  };

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsReglar: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
  });

  let categoryList = [
    {
      categoryName: "Tech",
      categoryImg:
        "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      categoryName: "Nature",
      categoryImg:
        "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },

    {
      categoryName: "Beauty",
      categoryImg:
        "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Blog", { item })}>
        <Blog name={item.name} image={item.image} message={item.message} />
      </TouchableOpacity>
    );
  };

  console.log(login);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          style={{ height: 30, width: 30 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/1069/1069210.png",
          }}
        ></Image>
        <TouchableOpacity
          onPress={() => navigation.navigate("Account")}
          style={styles.accountBtn}
        >
          {state ? (
            <Image
              source={{ uri: login.picture }}
              style={{ height: "100%", width: "100%" }}
            />
          ) : (
            <AntDesign name="user" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 20,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={(text) => setSearch(text)}
          onSubmitEditing={filteredSearch}
          value={search}
        ></TextInput>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        scrollEnabled
        style={{ height: 1000 }}
      >
        <View style={styles.categories}>
          <Text style={styles.catHeader}>Categories</Text>
          <View style={styles.catList}>
            {categoryList.map((item) => (
              <TouchableOpacity key={item.categoryName} style={styles.catBtn}>
                <ImageBackground
                  blurRadius={3}
                  style={styles.catImg}
                  source={{ uri: item.categoryImg }}
                >
                  <Text
                    style={{
                      color: "white",
                      // fontFamily: "PoppinsMedium",
                      fontSize: 17,
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                  >
                    {item.categoryName}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.createNew}>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewBlog")}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",

                height: "100%",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 20,
              }}
            >
              <Ionicons name="add" size={30} color="blue" />
              <Text style={{ fontSize: 15, color: "blue" }}>New blog</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.blogsContainer}>
            <Text style={styles.containerTitle}>Trending</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              data={blogData}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  logo: {
    fontSize: 20,
    // fontFamily: "PoppinsMedium",
  },

  accountBtn: {
    height: 40,
    width: 40,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  blogsContainer: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 20,
  },

  searchBar: {
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.9)",
    height: 40,
    width: "90%",
    paddingHorizontal: 10,
    // fontFamily: "PoppinsLight",
  },

  categories: {
    height: 100,
    marginHorizontal: 20,
    marginTop: 20,
  },

  catHeader: {
    marginBottom: 15,
    fontSize: 30,
    fontWeight: "bold",
    opacity: 0.4,
  },

  catList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  catBtn: {
    height: 100,
    width: 100,
    borderRadius: 10,
    overflow: "hidden",
  },

  catImg: {
    height: "100%",
    width: "100%",
  },

  createNew: {
    marginVertical: 25,
    height: 40,
  },

  blogsContainer: {
    height: 350,
  },

  containerTitle: {
    marginBottom: 20,
    fontSize: 25,
    opacity: 0.4,
    // fontFamily: "PoppinsBold",
  },
});
