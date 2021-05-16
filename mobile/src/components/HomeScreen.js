import React from 'react';
import { TouchableOpacity, View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Appbar, Avatar } from 'react-native-paper';

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
};

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header>
      {previous ? (
        <Appbar.BackAction onPress={navigation.pop} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Avatar.Image
            size={40}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_960_720.png',
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content title={previous ? title : null} />
    </Appbar.Header>
  );
};

export default function HomeScreen({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header>
              {previous ? (
                <Appbar.BackAction onPress={navigation.goBack} />
              ) : (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => {
                    navigation => navigation.openDrawer();
                  }}>
                  <Avatar.Image
                    size={40}
                    source={{
                      uri: 'https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_960_720.png',
                    }}
                  />
                </TouchableOpacity>
              )}
              <Appbar.Content
                title={title === 'Home' ? 'Home' : title}
                titleStyle={{
                  fontSize: 18,
                }}
              />
            </Appbar.Header>
          );
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: 'Home' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerTitle: 'Details' }}
      />
    </Stack.Navigator>
  );
}
