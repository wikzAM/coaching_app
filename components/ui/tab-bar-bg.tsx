import { View } from 'react-native';

// (standard templates use BlurView)
export default function TabBarBackground() {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} />
    );
}

export function useBottomTabOverflow() {
    return 0;
}