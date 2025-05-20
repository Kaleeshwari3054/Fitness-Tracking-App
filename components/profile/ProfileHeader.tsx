import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { UserCircle } from 'lucide-react-native';

type ProfileHeaderProps = {
  name: string;
  setName: (name: string) => void;
  editMode: boolean;
};

export default function ProfileHeader({ name, setName, editMode }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <UserCircle size={80} color={Colors.primary} />
      </View>
      
      {editMode ? (
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
          autoCapitalize="words"
        />
      ) : (
        <Text style={styles.name}>{name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${Colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: Colors.text,
  },
  nameInput: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: Colors.text,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 200,
  },
});