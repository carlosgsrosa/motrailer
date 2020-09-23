import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function Toggle() {
  const [data, setData] = useState([
    {id: 1, name: 'ONE', status: true},
    {id: 2, name: 'TWO', status: false},
    {id: 3, name: 'THREE', status: true},
    {id: 4, name: 'FOUR', status: false},
  ]);

  const toggle = (id) => {
    const cloneData = [...data];
    cloneData.filter((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
    });
    setData(cloneData);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#999999'}}>
      <ScrollView>
        <View style={{padding: 15}}>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => <Item {...item} toggle={toggle} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Item = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#cccccc',
        flexDirection: 'row',
        padding: 20,
      }}>
      <Text style={{flex: 1}}>{props.name}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: props.status ? 'green' : 'red',
          padding: 5,
          borderRadius: 5,
        }}
        onPress={() => props.toggle(props.id)}>
        <Text style={{color: '#ffffff', fontWeight: '400', fontSize: 17}}>
          {String(props.status)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
