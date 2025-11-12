import { useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData();
  }, [id])

  const loadData = async () => {
    try {
      const stored = await AsyncStorage.getItem("tasks");
      const tasks = stored ? JSON.parse(stored) : []
      const foundTask = tasks.find((task) => task.id === id.toString())
      console.log("foundTask ", foundTask)
      setTask(foundTask)
    } catch (error) {
      console.log("Error loading tasks:", error);
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (!task) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>Task not found!</Text>
        <Link href="/">← Back to tasks</Link>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Task ID: {task.id}</Text>
      <Text>Task Title: {task.title}</Text>
      <Link href="/">← Back</Link>
    </View>
  );
}
