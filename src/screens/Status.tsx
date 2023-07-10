import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Status = () => {
  const [statusData, setStatusData] = useState(STATUSDATA)

  useEffect(() => {
    setStatusData(STATUSDATA)
  }, [])

  const combinedStatusData = [
    {'title': 'Recent updates', data: statusData.filter(item => item.viewed === false)},
    {'title': 'Viewed updates', data: statusData.filter(item => item.viewed === true)},
  ]
  
  return (
    <View style={styles.container}>
      <View style={styles.myStatusContainer}>
        <View>
          <Image source={require('../../assets/images.jpeg')} style={styles.image} />
        </View>
        <View>
          <Text style={styles.myStatusHeading}>My status</Text>
          <Text style={styles.myStatusSubtext}>Tap to add and update</Text>
        </View>
      </View>

      <FlatList
        data={combinedStatusData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <Text style={styles.viewedStatus}>{item.title}</Text>
            <FlatList
              data={item.data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.viewedStatusContainer}>
                  <View>
                    <Image source={item.photos} style={styles.image}/>
                  </View>
                  <View>
                    <Text style={styles.myStatusHeading}>{item.name}</Text>
                    <Text style={styles.myStatusSubtext}>{item.time}</Text>
                  </View>
                </View>
              )}
            />
          </>
        )}
      />
      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => ('#')}
      >
        <FontAwesome5 name='pen' size={18} color='grey' />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => ('#')}
      >
        <FontAwesome5 name='camera' size={20} color='white' />
      </TouchableOpacity>
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });