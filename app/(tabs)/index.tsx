import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  // Sample contacts data
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', company: 'Tech Corp', phone: '(555) 123-4567' },
    { id: 2, name: 'Jane Smith', company: 'Design Studio', phone: '(555) 987-6543' },
    { id: 3, name: 'Mike Johnson', company: 'Sales Inc', phone: '(555) 456-7890' },
    { id: 4, name: 'Sarah Wilson', company: 'Marketing Pro', phone: '(555) 321-0987' },
  ]);

  const [searchText, setSearchText] = useState('');

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchText.toLowerCase())
  );

  const addNewContact = () => {
    // For now, just add a sample contact
    const newContact = {
      id: contacts.length + 1,
      name: 'New Contact',
      company: 'Your Company',
      phone: '(555) 000-0000'
    };
    setContacts([...contacts, newContact]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Personal CRM</Text>
        <Text style={styles.subtitle}>{filteredContacts.length} contacts</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Add Contact Button */}
      <TouchableOpacity style={styles.addButton} onPress={addNewContact}>
        <Text style={styles.addButtonText}>+ Add New Contact</Text>
      </TouchableOpacity>

      {/* Contact List */}
      <ScrollView style={styles.contactList}>
        {filteredContacts.map(contact => (
          <TouchableOpacity key={contact.id} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactCompany}>{contact.company}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <View style={styles.contactActions}>
              <Text style={styles.contactInitials}>
                {contact.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  contactList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  contactCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: '#999',
  },
  contactActions: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInitials: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});