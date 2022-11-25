import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SearchBlog from "../components/SearchBlog";

const SearchScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const blogsData = route.params.filteredData;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="ios-chevron-back" size={30} color="black" />
            <Text style={{ fontSize: 17 }}>Back</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginVertical: 20,
            marginHorizontal: 10,
            fontSize: 20,
            fontWeight: "bold",
            opacity: 0.4,
          }}
        >
          Search results for {}:
        </Text>
        <ScrollView contentContainerStyle={styles.blogsContainer}>
          {blogsData?.map((item) => {
            return (
              <SearchBlog
                name={item.name}
                message={item.message}
                image={item.image}
                id={item.id}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },

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

  blogsContainer: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
