import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const DATA = [
    {
      id: 1,
      // userId: 1,
      username: 'User 1',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      description: 'This is a post description',
      imageUrl: 'https://www.bootdey.com/image/580x520/FF00FF/000000',
      like: '1000',
      cmt: '23',
      share: '530',
    },
    {
      id: 2,
      // userId: 2,
      username: 'User 2',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar6.png',
      description: 'Another post',
      imageUrl: null,
      like: '435',
      cmt: '20',
      share: '100',
    },

    {
      id: 3,
      // userId: 1,
      username: 'User 1',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      description: 'This is a post description',
      imageUrl: 'https://www.bootdey.com/image/580x520/32CD32/000000',
      like: '103',
      cmt: '31',
      share: '50',
    },
  ];

  const [data, setData] = useState(DATA);
  const [likeStatus, setLikeStatus] = useState({});
  const [cmtStatus, setCmtStatus] = useState({});
  const [shareStatus, setShareStatus] = useState({});
  
  const initializeLikes = () => {
    const initialLikes = {};
    DATA.forEach((post) => {
      initialLikes[post.id] = parseInt(post.like);
    });
    return initialLikes;
  };
  const [likes, setLikes] = useState(initializeLikes());
  const [cmts, setCmts] = useState(() => {
    const initialCmts = {};
    DATA.forEach((post) => {
      initialCmts[post.id] = parseInt(post.cmt); // Convert like count to an integer
    });
    return initialCmts;
  });
  const [shares, setShares] = useState(() => {
    const initialShares = {};
    DATA.forEach((post) => {
      initialShares[post.id] = parseInt(post.share); // Convert like count to an integer
    });
    return initialShares;
  });
  

  const handleLike = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              like: likeStatus[id] ? item.like - 1 : item.like + 1,
            }
          : item
      )
    );
  
    setLikeStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
  
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: likeStatus[id] ? prevLikes[id] - 1 : prevLikes[id] + 1,
    }));
  };

  const handleCmt = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              cmt: cmtStatus[id] ? item.cmt - 1 : item.cmt + 1,
            }
          : item
      )
    );

    setCmts((prevCmts) => ({
      ...prevCmts,
      [id]: cmtStatus[id] ? prevCmts[id] - 1 : prevCmts[id] + 1,
    }));
  };

  const handleShare = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              share: shareStatus[id] ? item.share - 1 : item.share + 1,
            }
          : item
      )
    );

    setShares((prevShares) => ({
      ...prevShares,
      [id]: shareStatus[id] ? prevShares[id] - 1 : prevShares[id] + 1,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.navbar}>
        <Text style={styles.header}>Social Media Feed</Text>
      </View>
      
      <View style={styles.postListContainer}>
      {
        DATA.map((post) => 
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.avatarUrl }} style={styles.postAvatar} />
            <Text style={styles.postUsername}>{post.username}</Text>
          </View>
          <Text style={styles.postDescription}>{post.description}</Text>
          {post.imageUrl && (
            <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
          )}
          <View style={styles.postFooter}>
            <Text style={styles.postButton}>{likes[post.id] ? likes[post.id] : post.like} Likes</Text>
            <Text style={styles.postButton}>{cmts[post.id] ? cmts[post.id] : post.cmt} Comments</Text>
            <Text style={styles.postButton}>{shares[post.id] ? shares[post.id] : post.share} Shares</Text>
          </View>
          <View
            style={{
              borderBottomColor: '#808080',
              borderBottomWidth: StyleSheet.hairlineWidth,}}
          />
          <View style={styles.postFooter}>
            <TouchableOpacity style={styles.postButton} onPress={() => handleLike(post.id)}>
              <Icon style={[styles.postButtonIcon, { color: likeStatus[post.id] ? 'blue' : '#808080' },]} name="thumbs-up" />
              <Text style={[styles.postButtonText, { color: likeStatus[post.id] ? 'blue' : '#808080' },]}>Likes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postButton} onPress={() => handleCmt(post.id)}>
              <Icon style={styles.postButtonIcon} name="comment" />
              <Text style={styles.postButtonText}>Comments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postButton} onPress={() => handleShare(post.id)}>
              <Icon style={styles.postButtonIcon} name="share" />
              <Text style={styles.postButtonText}>Shares</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  navbar: {
    backgroundColor: '#2596be',
    // height: 50,
    padding: 10,
    // width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontSize:20,
    fontStyle: 'bold',
  },

  userContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor:'#fff',
    height:'100%',
  },
  userItem: {
    marginRight: 10,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  statusUserName:{
    marginTop:5,
    fontSize:12,
    color:'#483D8B',
    width:60,
    textAlign:'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postListContainer:{
    paddingTop:20,
    paddingHorizontal:15,
  },
  postCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius:5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  postUsername: {
    flex: 1,
  },
  postDate: {
    fontSize: 12,
    color:'#A9A9A9',
  },
  postDescription:{
    fontSize:16,
  },
  postImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  postFooter: {
    flexDirection: 'row',
    marginTop: 10,
    margin: 5,
    justifyContent: 'space-between',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 10,
    color: 'grey',
  },
  postButtonText:{
    color:'#808080'
  },
  postButtonIcon: {
    paddingRight: 5,
    color: '#808080',
  },
});