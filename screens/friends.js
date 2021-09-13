import React, { useState, useContext, useCallback } from 'react';
import { ActivityIndicator, View, Text, Image, FlatList, SectionList, TouchableHighlight, TouchableOpacity, StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from '../components/Searchbar';
// import { Container } from '../styleComponents/MessagesStyles';
import { Container, Card, UserImg
    , UserImgWrapper, UserInfo, UserName
    , SendAtText, MainTextWrapper, TopTextWrapper
    , BottomTextWrapper, 
    FriendText,
    CheckIcon,
    RightTagWrapper,
    TextAlignWrapper,
    SectionHeaderWrapper,
    SectionHeader} 
from '../styleComponents/MessagesStyles';

// Context
import { AuthContext } from '../context/AuthContext';


export default function FriendsScreen({ navigation }) {
    const { user, onSignout } = useContext(AuthContext);
    let dataHolder = example;

    // states
    const [refreshing, setRefeshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState(dataHolder);
    const [profileImgUrl, setProfileImgUrl] = useState(user?.photoURL || undefined);

    const onRefresh = useCallback( async () => {
        setRefeshing(true);
        setRefeshing(false);
    }, [refreshing])

    const filterSearch = (text) => {
        const newData = dataHolder.filter(item => {
            const itemData = `${item.userName.toUpperCase()}`;
            return itemData.indexOf(text.toUpperCase()) > -1;
        });

        setData(newData);
    };


    const UserAvatar = () => {
        return (
            <TouchableHighlight style={{height:50, width:50, borderRadius:40, marginLeft:8,}} onPress={() => navigation.navigate('Profile')}>
                <Image style={{height:50, width:50, borderRadius:30}} source={profileImgUrl ? {uri:profileImgUrl} : require('../assets/profileImg/blank-profile-picture.png')}/>
            </TouchableHighlight>
        );
    }

    const AddButton = ({ item }) => {
        const [loading, setLoading] = useState(false);

        return (
            <TouchableOpacity activeOpacity={0.4} style={styles.addButton} onPress={() => {
                    // console.log('added: ' + item.userName + ' ' + item.friend);
                    setLoading(true);

                    // Update data array state
                    let updatedList = dataHolder.map(i => {
                        if (i.id === item.id)
                            return {...i, friend: true};
                        return i;
                    })
                    setData(updatedList);
                    dataHolder = updatedList; // Update data array holder
                    example = updatedList;
            
                    setLoading(false);
                }}>
                {!loading ? <Text style={{fontSize:18, color:'white'}}>+ add</Text> : <ActivityIndicator color='white'/>}
            </TouchableOpacity>
            // <TouchableHighlight 
            //     onPressIn={() => setIsPressed(true)}
            //     onPressOut={() => setIsPressed(false)}
            //     underlayColor='#0073CE'
            //     style={styles.addButton}>
            //     <Text style={{fontSize:18, color:isPressed ? 'white':'#0073CE'}}>+ add</Text>
            // </TouchableHighlight>
        );
    };

    return (
        <Container>
            <Header
                placement='left'
                leftComponent={UserAvatar()}
                centerComponent={{text:'Friends', style:{fontSize:24, fontWeight:'bold', color:'#fff'}}}
                // rightComponent={AddButton()}
                centerContainerStyle={{alignSelf:'center'}}
                rightContainerStyle={{alignSelf:'center'}}
                containerStyle={{
                    borderBottomWidth:0, 
                    shadowOpacity: 0, // This is for ios
                }}
            />
            <SectionList
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListHeaderComponent={
                    <SearchBar
                        onChangeText={text => {
                            filterSearch(text);
                            setSearchText(text);
                        }} 
                        onClear={() => {
                            setData(dataHolder);
                            setSearchText('');
                        }} />
                }
                sections={[
                    {title: 'Friends', data: data.filter(item => item.friend)},
                    {title: '', data: data.filter(item => !item.friend)},
                ]}
                keyExtractor={item => item.id}
                renderSectionHeader={({ section }) => (
                    <SectionHeaderWrapper>
                        <SectionHeader />
                    </SectionHeaderWrapper>
                )}
                renderItem={({ item }) => (
                    <Card activeOpacity={0.5} onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.userImg}/>
                            </UserImgWrapper>

                            <MainTextWrapper>
                                <TextAlignWrapper>
                                    <TopTextWrapper>
                                        <UserName numberOfLines={1}>{item.userName}</UserName>
                                        {
                                            !item.friend ? <AddButton item={item}/> :
                                                <RightTagWrapper>
                                                    <FriendText>friend</FriendText>
                                                    <CheckIcon name='checkmark-circle' size={24} color='#2089DC'/>
                                                </RightTagWrapper>
                                        }
                                        
                                    </TopTextWrapper>
                                </TextAlignWrapper>
                            </MainTextWrapper>
                        </UserInfo>
                    </Card>
                )}
            />
            {/* <FlatList
                keyboardShouldPersistTaps='handled'
                data={example}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => <SearchBar/>}

                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <Card activeOpacity={0.5} onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.userImg}/>
                            </UserImgWrapper>

                            <MainTextWrapper>
                                <TextAlignWrapper>
                                    <TopTextWrapper>
                                        <UserName numberOfLines={1}>{item.userName}</UserName>
                                        {
                                            !item.friend ? null :
                                                <RightTagWrapper>
                                                    <FriendText>friend</FriendText>
                                                    <CheckIcon name='checkmark-circle' size={24} color='#2089DC'/>
                                                </RightTagWrapper>
                                        }
                                        
                                    </TopTextWrapper>
                                </TextAlignWrapper>
                            </MainTextWrapper>
                        </UserInfo>
                    </Card>
                )}
            /> */}
        </Container>
    );
}

const styles = StyleSheet.create({
    addButton: {
        height: 30,
        width: 60,
        borderRadius: 10,
        marginRight: 8,
        backgroundColor: '#EA830B',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

let example = [
    {
        id: '3',
        userImg: require('../assets/profileImg/user-2.jpg'),
        userName: 'Boo',
        friend: true
    },
    {
        id: '1',
        userImg: require('../assets/profileImg/user-0.jpg'),
        userName: 'Bill',
        friend: true
    },
    {
        id: '2',
        userImg: require('../assets/profileImg/user-1.jpg'),
        userName: 'Thomas',
        friend: false
    },
    {
        id: '4',
        userImg: require('../assets/profileImg/user-3.jpg'),
        userName: 'Hammy',
        friend: true
    },
    {
        id: '5',
        userImg: require('../assets/profileImg/user-4.jpg'),
        userName: 'Mad lad',
        friend: false
    },
    {
        id: '6',
        userImg: require('../assets/profileImg/user-5.jpg'),
        userName: 'Internal state is not preserved when content scrolls out of the render window',
        friend: false
    },
    {
        id: '7',
        userImg: require('../assets/profileImg/user-6.jpg'),
        userName: 'Hammy1',
        friend: true
    },
    {
        id: '8',
        userImg: require('../assets/profileImg/user-7.jpg'),
        userName: 'Hammy2',
        friend: false
    },
    {
        id: '9',
        userImg: require('../assets/profileImg/user-8.jpg'),
        userName: 'Hammy3',
        friend: false
    },
    {
        id: '10',
        userImg: require('../assets/profileImg/user-10.jpg'),
        userName: 'Hammy4',
        friend: false
    },
    {
        id: '11',
        userImg: require('../assets/profileImg/user-11.jpg'),
        userName: 'Hammy5',
        friend: true
    },
    {
        id: '12',
        userImg: require('../assets/profileImg/user-12.jpg'),
        userName: 'Hammy6',
        friend: false
    },
];

// example.sort((a, b) => (a.userName > b.userName) ? 1 : -1);
example.sort((a, b) => a.userName > b.userName);