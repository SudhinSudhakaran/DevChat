import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Components } from '../../../components';
import { Helper } from '../../../helpers/helper/Helper';
import { useSelector } from 'react-redux';
import { db } from '../../../../firebase/firebaseConfig';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';
import { responsiveHeight } from 'react-native-responsive-dimensions';

interface User {
  id: string;
  name: string;
  email: string;
  profile_pic?: string;
  uid: string;
  about?: string;
}

interface Props {
  route: {
    params: {
      user: User;
    };
  };
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  userId?: string;
  profile_pic?: string;
  senderName?: string;
}

const MessageScreen: React.FC<Props> = ({ route }) => {
  const { user } = route.params;

  const userDetails = useSelector((state: any) => state.user?.userDetails);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello 👋', sender: 'other' },
    { id: '2', text: 'Hi, how are you?', sender: 'me' },
    { id: '3', text: 'I am good!', sender: 'other' },
  ]);

  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const textRef = useRef('');
  const inputRef = useRef<TextInput>(null);


  useEffect(() => {
    createRoomIfNotExist();
let roomId = Helper.getRoomId(userDetails.uid, user.uid);
 const docRef = doc(db, 'rooms', roomId);
 const messageRef = collection(docRef, 'messages');
 const q = query(messageRef, orderBy('createdAt', 'asc'));
let unsub = onSnapshot(q, (snapshot) => {
   let allMessages = snapshot.docs.map((doc) => doc.data());
   setMessages([...allMessages  ]);
});

return () => unsub 
  }, [ ]);



    // ✅ Create room
  const createRoomIfNotExist =  async () => {
    if (!userDetails?.uid || !user?.uid) return;

    let roomId = Helper.getRoomId(userDetails.uid, user.uid);

    await setDoc(
      doc(db, 'rooms', roomId),
      {
        roomId,
        createdAt: Timestamp.now(),
      },
      { merge: true } // ✅ important fix
    );
  } 
  // ✅ Better auto scroll
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const sendMessage = async () => {
    if (!textRef.current.trim()) return;

  try {
 let roomId = Helper.getRoomId(userDetails.uid, user.uid);

const docRef = doc(db, 'rooms', roomId);
const messageRef =collection(docRef, 'messages');
const newDoc  = await addDoc(messageRef, {
  text: textRef.current,
 
  createdAt: Timestamp.now(),
  userId : userDetails.uid,
  profile_pic : userDetails.profile_pic || '',
  senderName : userDetails.name
});
  textRef.current = '';  
if(inputRef.current) {
  inputRef.current.clear();
}


  } catch (error) {
    console.log('Error sending message:', error);
  }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item?.userId === userDetails.uid;

    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.rightAlign : styles.leftAlign,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isMe ? styles.myBubble : styles.otherBubble,
          ]}
        >
          <Text style={[styles.text, { color: isMe ? '#fff' : '#000' }]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Components.Background>
      <Components.SafeAreaContainer>
        <Components.Header title={user?.name || 'Messages'} />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={80}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={scrollToBottom} // ✅ BEST way
          />

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
            ref={inputRef}
             
              onChangeText={text => (textRef.current = text)}
              placeholder="Type a message..."
              style={styles.input}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <Text style={{ color: '#fff' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Components.SafeAreaContainer>
    </Components.Background>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  messageContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },

  leftAlign: {
    justifyContent: 'flex-start',
  },

  rightAlign: {
    justifyContent: 'flex-end',
  },

  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 12,
  },

  myBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 0,
  },

  otherBubble: {
    backgroundColor: '#e5e5ea',
    borderBottomLeftRadius: 0,
  },

  text: {
    fontSize: 14,
  },

  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#ffffff',
    height: responsiveHeight(8)

  },

  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
  },

  sendBtn: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 20,
  },
});