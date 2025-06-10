import React, { useState } from 'react';
import { Alert, Linking, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Contact {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export default function HomeScreen() {
  // Sample contacts data
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'John Doe', company: 'Tech Corp', phone: '(555) 123-4567', email: 'john@techcorp.com' },
    { id: 2, name: 'Jane Smith', company: 'Design Studio', phone: '(555) 987-6543', email: 'jane@designstudio.com' },
    { id: 3, name: 'Mike Johnson', company: 'Sales Inc', phone: '(555) 456-7890', email: 'mike@salesinc.com' },
    { id: 4, name: 'Sarah Wilson', company: 'Marketing Pro', phone: '(555) 321-0987', email: 'sarah@marketingpro.com' },
  ]);

  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchText.toLowerCase())
  );

  const addNewContact = () => {
    // For now, just add a sample contact
    const newContact: Contact = {
      id: contacts.length + 1,
      name: 'New Contact',
      company: 'Your Company',
      phone: '(555) 000-0000',
      email: 'new@contact.com'
    };
    setContacts([...contacts, newContact]);
  };

  const openContactDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedContact(null);
  };

  const handleCall = () => {
    if (selectedContact?.phone) {
      const phoneNumber = selectedContact.phone.replace(/[^\d]/g, '');
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleEmail = () => {
    if (selectedContact?.email) {
      Linking.openURL(`mailto:${selectedContact.email}`);
    }
  };

  const handleEdit = () => {
    Alert.alert('Edit Contact', 'Edit functionality coming soon!');
  };

  const handleDelete = () => {
    if (!selectedContact) return;
    
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${selectedContact.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            setContacts(contacts.filter(c => c.id !== selectedContact.id));
            closeModal();
          }
        }
      ]
    );
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
          <TouchableOpacity 
            key={contact.id} 
            style={styles.contactCard}
            onPress={() => openContactDetails(contact)}
          >
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

      {/* Contact Details Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.backButton} onPress={closeModal}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedContact && (
              <>
                {/* Contact Avatar */}
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                  <Text style={styles.contactNameLarge}>{selectedContact.name}</Text>
                  <Text style={styles.contactCompanyLarge}>{selectedContact.company}</Text>
                </View>

                {/* Contact Information */}
                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Contact Information</Text>
                  
                  <TouchableOpacity style={styles.infoRow} onPress={handleCall}>
                    <View style={styles.infoIcon}>
                      <Text style={styles.iconText}>📞</Text>
                    </View>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Phone</Text>
                      <Text style={styles.infoValue}>{selectedContact.phone}</Text>
                    </View>
                    <Text style={styles.actionText}>Call</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.infoRow} onPress={handleEmail}>
                    <View style={styles.infoIcon}>
                      <Text style={styles.iconText}>✉️</Text>
                    </View>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Email</Text>
                      <Text style={styles.infoValue}>{selectedContact.email}</Text>
                    </View>
                    <Text style={styles.actionText}>Email</Text>
                  </TouchableOpacity>

                  <View style={styles.infoRow}>
                    <View style={styles.infoIcon}>
                      <Text style={styles.iconText}>🏢</Text>
                    </View>
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Company</Text>
                      <Text style={styles.infoValue}>{selectedContact.company}</Text>
                    </View>
                  </View>
                </View>

                {/* Notes Section */}
                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Notes</Text>
                  <Text style={styles.notesText}>No notes yet. Tap edit to add notes about this contact.</Text>
                </View>

                {/* Actions */}
                <View style={styles.actionsSection}>
                  <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
                    <Text style={styles.actionButtonText}>Edit Contact</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete Contact</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  editButton: {
    padding: 10,
  },
  editButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '600',
    color: 'white',
  },
  contactNameLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  contactCompanyLarge: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    backgroundColor: 'white',
    marginBottom: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoIcon: {
    width: 40,
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
    marginLeft: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  actionText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  notesText: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  deleteButtonText: {
    color: 'white',
  },
});