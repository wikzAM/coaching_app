import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// Mock Data
const CHATS = [
  { id: '1', name: 'Coach AI', message: 'Ready for your daily download?', time: '2m' },
  { id: '2', name: 'Nutrition Bot', message: 'You logged 3 meals today.', time: '1h' },
  { id: '3', name: 'Life Guide', message: 'Remember to meditate.', time: '1d' },
];

export default function ChatListScreen() {
  const router = useRouter();

  const renderChatRow = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.row}
      // We will create this route in Phase 3
      onPress={() => router.push(`/chat/${item.id}` as Href)} // href just for now
    >
      <View style={styles.avatarPlaceholder}>
        <Ionicons name="person" size={24} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.topRow}>
          <ThemedText type="subtitle">{item.name}</ThemedText>
          <ThemedText style={styles.timeText}>{item.time}</ThemedText>
        </View>
        <ThemedText style={styles.previewText} numberOfLines={1}>{item.message}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title">Chat</ThemedText>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderChatRow}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listContent: { paddingHorizontal: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  timeText: { fontSize: 12, color: '#999' },
  previewText: { color: '#666', marginTop: 4 },
});