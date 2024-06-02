import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation from React Navigation

export default function Formulaire() {
  const navigation = useNavigation(); // Get the navigation object

  const [form, setForm] = useState({
    publicationId: '123456',
    senderName: '',
    recipientName: '',
    claimContent: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSend = () => {
    console.log('Claim sent:', form);
    setIsModalVisible(true);
    setForm({
      publicationId: '123456',
      senderName: '',
      recipientName: '',
      claimContent: '',
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.goBack(); // Navigate back to the details screen
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <View style={styles.headerBack}>
              <FeatherIcon color="#1D2A32" name="chevron-left" size={30} />
            </View>

            <Text style={styles.title}>Claim Publication</Text>

            <Text style={styles.subtitle}>
              Fill in the fields below to claim a publication.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Publication ID</Text>
              <TextInput
                editable={false}
                style={styles.inputControl}
                value={form.publicationId}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <TextInput
                onChangeText={senderName => setForm({...form, senderName})}
                placeholder="Your Name"
                style={styles.inputControl}
                value={form.senderName}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Recipient's Name</Text>
              <TextInput
                onChangeText={recipientName =>
                  setForm({...form, recipientName})
                }
                placeholder="Publication Owner"
                style={styles.inputControl}
                value={form.recipientName}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Claim Content</Text>
              <TextInput
                multiline
                numberOfLines={4}
                onChangeText={claimContent => setForm({...form, claimContent})}
                placeholder="Type your claim here"
                style={[styles.inputControl, {height: 100}]}
                value={form.claimContent}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSend}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Send</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>

        {/* Custom Modal */}
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Claim sent successfully!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5dc',
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: 'relative',
    marginLeft: -16,
    marginBottom: 6,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#006400',
    borderColor: '#006400',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  // Modal styles
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#006400',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Details bar styles
  detailsBar: {
    backgroundColor: '#1D2A32',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  detailsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
});
