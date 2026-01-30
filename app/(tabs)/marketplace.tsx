import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEV_PICKS = [1, 2, 3, 4];
const CATEGORIES = ['Productivity', 'Health', 'Finance', 'Learning'];

export default function MarketplaceScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <ThemedText type="title">Marketplace</ThemedText>
                </View>

                {/* Dev Picks */}
                <View style={styles.sectionHeader}>
                    <ThemedText type="subtitle">Dev Picks</ThemedText>
                    <Ionicons name="arrow-forward" size={20} color="#007AFF" />
                </View>

                <FlatList
                    horizontal
                    data={DEV_PICKS}
                    keyExtractor={(item) => item.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.devCard}>
                            <View style={styles.cardImagePlaceholder} />
                            <ThemedText style={styles.cardTitle}>Template {item}</ThemedText>
                        </TouchableOpacity>
                    )}
                />

                {/* Categories */}
                {CATEGORIES.map((cat) => (
                    <View key={cat} style={styles.categoryContainer}>
                        <View style={styles.sectionHeader}>
                            <ThemedText type="subtitle">{cat}</ThemedText>
                            <Ionicons name="arrow-forward" size={20} color="#007AFF" />
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
                            {[1, 2, 3].map(i => (
                                <View key={i} style={styles.smallCard} />
                            ))}
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { padding: 20 },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    horizontalList: { paddingHorizontal: 20, paddingBottom: 20 },
    devCard: {
        width: 140,
        height: 140,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginRight: 15,
        padding: 10,
        justifyContent: 'flex-end',
    },
    cardImagePlaceholder: {
        flex: 1,
        backgroundColor: '#e1e1e1',
        borderRadius: 8,
        marginBottom: 8,
    },
    cardTitle: { fontSize: 14, fontWeight: '600' },
    categoryContainer: { marginBottom: 20 },
    catScroll: { paddingLeft: 20 },
    smallCard: {
        width: 100,
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginRight: 12,
    },
});