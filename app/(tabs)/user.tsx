import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarLarge}>
                        <Ionicons name="person" size={40} color="#fff" />
                    </View>
                    <View style={styles.userInfo}>
                        <ThemedText type="title">USER</ThemedText>
                        <View style={styles.statBadge}>
                            <ThemedText style={styles.statText}>67 Points</ThemedText>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <ThemedText type="subtitle" style={{ marginBottom: 10 }}>MY TEMPLATES</ThemedText>
                    <View style={{ flexDirection: 'row' }}>
                        {[1, 2, 3].map(i => <View key={i} style={styles.miniCard} />)}
                    </View>
                </View>

                <View style={styles.menu}>
                    {['Settings', 'Help', 'Sign Out'].map((item) => (
                        <TouchableOpacity key={item} style={styles.menuItem}>
                            <ThemedText style={styles.menuText}>{item}</ThemedText>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    profileHeader: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ccc',
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfo: { justifyContent: 'center' },
    statBadge: {
        marginTop: 8,
        backgroundColor: '#007AFF',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    section: { padding: 20 },
    miniCard: {
        width: 60,
        height: 60,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    menu: { paddingHorizontal: 20 },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuText: { fontSize: 16 },
});