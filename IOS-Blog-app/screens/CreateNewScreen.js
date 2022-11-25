import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { BlogContext } from "../context/BlogContext";

const CreateNewScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("none");
  const [modalVisible, setModalVisible] = useState(false);
  const { state, login } = useContext(BlogContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  console.log(category);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const postBlog = async (e) => {
    const fd = new FormData();

    if (name == "" || message == "" || image == "" || category == "none") {
      Alert.alert("Please fill the required fields!");
    } else {
      setLoading(true);
      fd.append("name", name);
      fd.append("message", message);
      fd.append("image", image);
      fd.append("category", category);
      fd.append("email", login.email);
      await axios
        .post("http://localhost:8081/custom/api/v1/blog/postblog", fd)
        .then((res) => {
          setLoading(false);
          navigation.navigate("Home");
        })
        .catch((err) => console.log(err));

      setImage("");
      setMessage("");
      setName("");
      setCategory("");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ActivityIndicator animating={loading} />
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.form}
          >
            <View
              style={{
                height: 35,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 20,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  opacity: 0.4,
                  fontWeight: "bold",
                }}
              >
                Create new blog
              </Text>

              <Button title="Submit" color={"blue"} onPress={postBlog} />
            </View>

            <TouchableOpacity onPress={pickImage} style={styles.pickBtn}>
              <Text style={{ fontWeight: "bold" }}>Pick Image</Text>
            </TouchableOpacity>

            <TextInput
              onChangeText={(text) => setName(text)}
              style={styles.inputName}
              placeholder="Name"
              value={name}
            />
            <TextInput
              onChangeText={(text) => setMessage(text)}
              multiline={true}
              numberOfLines={4}
              style={styles.inputMessage}
              placeholder="Message"
              value={message}
            />

            <TouchableOpacity
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Select Category</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        ) : (
          <View
            style={{
              height: 300,
              marginHorizontal: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              You are not logged in
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Account")}
              style={{
                marginTop: 15,
                borderRadius: 10,
                borderWidth: 1,
                width: 150,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 17, color: "blue" }}>Go to login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        presentationStyle="pageSheet"
      >
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        >
          <Picker.Item label="None" value="none" />
          <Picker.Item label="Nature" value="nature" />
          <Picker.Item label="Technology" value="tech" />
        </Picker>

        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Select</Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateNewScreen;

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

  form: {
    flex: 1,
    marginHorizontal: 10,
  },

  inputName: {
    height: 40,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },

  inputMessage: {
    height: 200,
    fontSize: 15,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  pickBtn: {
    height: 40,
    backgroundColor: "rgba(0,0,255,0.1)",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    borderRadius: 20,
    padding: 10,
    height: 50,
    borderStyle: "solid",
    borderWidth: "0.2",
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
  },

  textStyle: {
    opacity: 0.5,
    color: "blue",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
});
