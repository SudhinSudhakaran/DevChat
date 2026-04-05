import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {copilot, walkthroughable, CopilotStep} from 'react-native-copilot';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
 import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
 

import I18n from '../../i18n';
import { Colors, Fonts } from '../../constants';
import { navigate } from '../../utils/NavigationUtils';
 

// Types
interface RootState {
  userLogin: {
    user: any;
 
    locale: string;
  };
}

interface BottomTabProps {
  state: {
    index: number;
  };
  start?: () => void;
}

// Walkthrough wrapper
const CopilotText = walkthroughable(Text);

const INACTIVE_COLOR = '#614604';
const {height, width} = Dimensions.get('screen');

interface TitleSessionProps {
  name: string;
  isActive: boolean;
}

const TitleSession: React.FC<TitleSessionProps> = ({name, isActive}) => {
  return (
    <Text
      style={[
        styles.titleText,
        {
          color: isActive ? Colors.WHITE_COLOR : INACTIVE_COLOR,
          fontFamily: isActive ? Fonts.INTER_BOLD : Fonts.INTER_MEDIUM,
        },
      ]}>
      {I18n.t(name)}
    </Text>
  );
};

const BottomTab: React.FC<BottomTabProps> = props => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

 
const {language,isShowWalkThrough }= useSelector((state: RootState) => state.ui);
  useEffect(() => {
    

    return () => {
     
    };
  }, []);

  useEffect(() => {
    if (isShowWalkThrough) {
      props.start?.();
    }
  }, [isShowWalkThrough]);










  
  return (
    <View
      style={Platform.OS === 'ios' ? styles.iosContainer : styles.container}>
      
      {/* Home */}
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => navigate('Tabs',{screen:'Chat'})}>
        <CopilotStep
          text={I18n.t('Explore_Chat')}
          order={1}
          name={I18n.t('ChatScreen')}>
          <CopilotText>
            <AntDesign
              name="wechat"
              size={28}
              color={
                props.state.index === 0 ? Colors.WHITE_COLOR : INACTIVE_COLOR
              }
            />
          </CopilotText>
        </CopilotStep>
        <TitleSession
          name="Chat"
          isActive={props.state.index === 0}
        />
      </TouchableOpacity>

      {/* Festivals */}
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => navigate('Tabs',{screen:'Friends'})}>
        <CopilotStep
          text={I18n.t('View_Friends')}
          order={2}
          name={I18n.t('Friends')}>
          <CopilotText>
            <FontAwesome5
              name="users"
              size={25}
              color={
                props.state.index === 1 ? Colors.WHITE_COLOR : INACTIVE_COLOR
              }
            />
          </CopilotText>
        </CopilotStep>
        <TitleSession
          name="Friends"
          isActive={props.state.index === 1}
        />
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.contentContainer}
        onPress={() => navigate('Tabs',{screen:'Profile'})}>
        <CopilotStep
          text={I18n.t(
            'Signup_to_personalize_experience_access_your_Profile',
          )}
          order={3}
          name={I18n.t('Your_profile')}>
          <CopilotText>
            <Ionicons
              name="person"
              size={25}
              color={
                props.state.index === 2 ? Colors.WHITE_COLOR : INACTIVE_COLOR
              }
            />
          </CopilotText>
        </CopilotStep>
        <TitleSession
          name="Profile"
          isActive={props.state.index === 2}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY_COLOR,
    height: 60,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 3,
    alignSelf: 'center',
  },
  iosContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY_COLOR,
    height: 71,
    borderBottomWidth: 1,
    borderColor: Colors.BLUR_COLOR,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 50,
    alignSelf: 'center',
   
  },
  titleText: {
    fontFamily: Fonts.INTER_REGULAR,
    fontSize: 15,
    marginLeft: 4,
  },
});