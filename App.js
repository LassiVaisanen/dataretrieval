import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { firestore, query, onSnapshot, collection, MESSAGES, addDoc, serverTimestamp, orderBy } from './firebase/Config';
import Constants from 'expo-constants';
import { convertFirebaseTimeStampToJS } from './helpers/Functions'


export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setnewMessage] = useState("")

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {

        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const save = async() => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))
    setnewMessage("")
  }
  

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message) => (
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      
      <View>
        <TextInput placeholder='Enter message' value = {newMessage} onChangeText={text => setnewMessage(text)}></TextInput>
        <Button title="Save" onPress={save}></Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1, borderRadius: 5, 
    marginLeft: 10,
    marginRight: 10
  },
  messageInfo: {
    fontSize: 12,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'bottom',
    justifyContent: 'bottom',
  }
});
