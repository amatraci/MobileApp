import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import { useState, useEffect, Activity } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTasks();
    }, [])

    const loadTasks = async () => {
        try {
            const stored = await AsyncStorage.getItem("tasks");
            const loadedTasks = stored ? JSON.parse(stored) : [];
            setTasks(loadedTasks);

        } catch (error) {
            console.log("Error loading tasks:", error);
        }

    }

    const fetchExternalAPI = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
            const data = await response.json();
            const newTasks = data.map((item) => ({
                id: item.id.toString(),
                title: item.title
            }))

            const updatedTasks = [
                ...tasks,
                ...newTasks.filter((newItem) => !tasks.some((existingItem) => existingItem.id === newItem.id))
            ]

            await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setTasks(updatedTasks)

        } catch (error) {
            console.log("Error fetching external API:", error);
        }
    }

    const deleteTask = (id) => {
        setModalVisible(true);
        setSelectedTask(id);
    };

    const renderEmpty = () => (
        <Text style={styles.emptyText}>No tasks yet. Add your first task!</Text>
    );

    const renderHeader = () => (
        <View style={{ flex: 1 }}>
            <Text style={styles.listHeader}>Your Tasks</Text>
            <TouchableOpacity onPress={fetchExternalAPI}>
                <View style={styles.fetchBtn}>
                    <Text style={styles.fetchTitle}>Fetch External API</Text>
                </View>
            </TouchableOpacity>

        </View>
    );

    const renderFooter = () => (
        <Text style={styles.listFooter}>End of the list</Text>
    );

    const renderSeparator = () => (
        <View style={styles.separator} />
    );

    const handleModalCancel = () => {
        setModalVisible(false);
        setSelectedTask(null);
    }

    const handleModalClose = async () => {
        try {
            const updatedTasks = tasks.filter((item) => item.id !== selectedTask);
            await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
            setModalVisible(false);
            setSelectedTask(null);

        } catch (error) {
            console.log("Error deleting task:", error);
        }
    }
    return (
        <View style={{ flex: 1, width: '100%' }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    style={styles.container}
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <Link href={`/task/${item.id}`}>
                                <Text>{item.title}</Text>
                            </Link>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <Text style={{ color: "red" }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ItemSeparatorComponent={renderSeparator}
                    ListEmptyComponent={renderEmpty}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                />
            )}

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Do you want to delete this task?</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "100%", marginTop: 20 }}>
                            <TouchableOpacity onPress={handleModalCancel}>
                                <Text style={styles.modalCancelBtn}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleModalClose}>
                                <Text style={styles.modalBtn}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    row: { flexDirection: "row", marginBottom: 12 },
    input: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 10,
        height: 40
    },
    addBtn: {
        backgroundColor: "#007AFF",
        marginLeft: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        borderRadius: 8,
    },
    btnText: { color: "white", fontWeight: "bold" },
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "lightblue",
        padding: 12,
        borderRadius: 8,
        marginBottom: 4,
        elevation: 2,
    },
    separator: {
        height: 8,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#888",
    },
    listHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
    },
    listFooter: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 14,
        color: "#666",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "white",
        width: "80%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minHeight: 180
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#000'
    },
    modalBtn: {
        backgroundColor: "red",
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        borderRadius: 8
    },
    modalCancelBtn: {
        backgroundColor: "gray",
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        borderRadius: 8
    },
    fetchBtn: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        width: 150
    },
    fetchTitle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    }
});