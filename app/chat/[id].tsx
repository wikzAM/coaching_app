import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ChatDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Chat {id}</Text>
                <Ionicons name="settings-outline" size={24} color="black" />
            </View>

            <View style={styles.content}>
                <Text>Conversation UI goes here...</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});