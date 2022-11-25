import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import { BlogProvider } from "./context/BlogContext";
import CreateNewScreen from "./screens/CreateNewScreen";
import SearchScreen from "./screens/SearchScreen";
import BlogScreen from "./screens/BlogScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <BlogProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="NewBlog" component={CreateNewScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Blog" component={BlogScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BlogProvider>
  );
}
export default App;
