import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";

export default function SettingsScreen() {
  const [counter, setCounter] = useState(10);

  return (
    <View>
      <Text>SettingsScreen Test</Text>
      <View>
        <View>
          <Text style={{ marginVertical: 20 }}>Soundtest</Text>
          <Button mode="contained" onPress={() => playSound()}>
            Soundtest
          </Button>
        </View>
        <View>
          <Text style={{ marginVertical: 20 }}>Timertest</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Counter</Text>
            <Text>{counter}</Text>
            <Button onPress={() => startCounter()}>Start</Button>
            <Button onPress={() => stop()}>Stop</Button>
          </View>
          <UHR pause={pause}></UHR>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
