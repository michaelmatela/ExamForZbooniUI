import React from 'react';
import { View, Text, SectionList, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import countryCodes from '../../../assets/CountryCodes.json'

interface FullScreenModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (dialCode: string) => void;
}

const CountryCodeModal: React.FC<FullScreenModalProps> = ({ visible, onClose, onSelect }) => {
  const createSections = (data: { name: string; dial_code: string; code: string }[]) => {
    const sections: { title: string; data: { name: string; dial_code: string; code: string }[] }[] = [];

    // Group countries by their first letter
    data.forEach(item => {
      const firstLetter = item.name.charAt(0).toUpperCase();
      const sectionIndex = sections.findIndex(section => section.title === firstLetter);

      if (sectionIndex === -1) {
        sections.push({ title: firstLetter, data: [item] });
      } else {
        sections[sectionIndex].data.push(item);
      }
    });

    return sections.sort((a, b) => a.title.localeCompare(b.title));
  };

  const sectionsData = createSections(countryCodes);

  const handleItemClick = (dialCode: string) => {
    onSelect(dialCode);
    onClose(); 
  };

  const renderItem = ({ item }: { item: { name: string; dial_code: string; code: string } }) => (
    <TouchableOpacity onPress={() => handleItemClick(item.dial_code)} style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name} ({item.dial_code})</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>close</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select a Country</Text>
        </View>
        <SectionList
          sections={sectionsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.code} // Use country code as key
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    
    backgroundColor: 'white',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    marginLeft: 10,
    fontSize: 16,
    color: 'blue',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 50,
    textAlign: 'center', 
  },
  sectionHeader: {
    
    fontSize: 18,
    fontFamily: 'montserrat',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  itemText: {
    fontFamily: 'montserrat',
    fontSize: 16,
    color: 'black',
  },
});

export default CountryCodeModal;