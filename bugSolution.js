```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        //Check if jsonData is an array before setting state
        if(Array.isArray(jsonData)){
          setData(jsonData);
        } else {
          setError(new Error('Invalid data format from API'));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />; 
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  //Check if data is an array before rendering
  if(Array.isArray(data) && data.length > 0){
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id}
        />
      );
  } else {
    return <Text>No data to display</Text>;
  }
};

export default MyComponent; 
```