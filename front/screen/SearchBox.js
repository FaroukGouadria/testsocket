import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EditProfile from './EditProfile';
import {useNavigation} from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styless.container}>
        <View style={styless.profile}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styless.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: 'https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-6/395409285_2446016072245128_156046743845502556_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RHUIhzmG4sgAb7ty8vo&_nc_ht=scontent.ftun10-1.fna&oh=00_AfDeeP1NyGa98wbE4hYLgX9VsVj8E0vxK7FVyV2dy9iPtA&oe=6621BCC4',
                }}
                style={styless.profileAvatar}
              />

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styless.profileAction}>
                  <FeatherIcon color="#fff" name="edit-3" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styless.profileName}>Ben mansour maram</Text>

            <Text style={styless.profileAddress}>Menzel temim , Nabeul</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styless.section}>
            <Text style={styless.sectionTitle}>Preferences</Text>

            <View style={styless.row}>
              <View style={[styless.rowIcon, {backgroundColor: '#007afe'}]}>
                <FeatherIcon color="#fff" name="moon" size={20} />
              </View>

              <Text style={styless.rowLabel}>Dark Mode</Text>

              <View style={styless.rowSpacer} />

              <Switch
                onValueChange={darkMode => setForm({...form, darkMode})}
                value={form.darkMode}
              />
            </View>
          </View>

          <View style={styless.section}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditProfile');

                // handle onPress
              }}
              style={styless.row}>
              <View style={[styless.rowIcon, {backgroundColor: '#32c759'}]}>
                <FeatherIcon color="#fff" name="flag" size={20} />
              </View>

              <Text style={styless.rowLabel}>Edit profil </Text>

              <View style={styless.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styless.row}>
              <View style={[styless.rowIcon, {backgroundColor: 'orange'}]}>
                <FeatherIcon color="#fff" name="mail" size={20} />
              </View>

              <Text style={styless.rowLabel}>Favorites Publications</Text>

              <View style={styless.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styless.row}>
              <View style={[styless.rowIcon, {backgroundColor: 'red'}]}>
                <FeatherIcon color="#fff" name="star" size={20} />
              </View>

              <Text style={styless.rowLabel}>Log out</Text>

              <View style={styless.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styless = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 95,
    height: 95,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
