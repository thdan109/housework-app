import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("<YOUR_ACCESSTOKEN>");

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});

const MapGL = () =>{
   return (
      // <View style={styles.page}> 
      //   <View style={styles.container}>
      //     <MapboxGL.MapView style={styles.map} />
      //   </View>
      // </View>
   <View style={{flex:1, backgroundColor: 'green'}}> 

   </View>
      )
}

export default MapGL;