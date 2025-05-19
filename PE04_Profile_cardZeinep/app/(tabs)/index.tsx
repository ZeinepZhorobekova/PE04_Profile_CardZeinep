import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const cardsData = Array.from({ length: 6 }, (_, i) => ({
  id: i.toString(),
  name: 'John Doe',
  occupation: 'React Native Developer',
  description:
    'John is a really great JavaScript developer. He loves using JS to build React Native applications for iOS and Android.',
}));

export default function Index() {
  const [expandedCardId, setExpandedCardId] = useState(null);

  const toggleCard = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  // Calculate widths for cards dynamically
  const screenWidth = Dimensions.get('window').width;
  const cardMargin = 20;
  const numColumns = 2;
  const collapsedCardWidth = (screenWidth - cardMargin * (numColumns + 1)) / numColumns; // for spacing
  const expandedCardWidth = screenWidth * 0.8;

  const renderCard = ({ item }) => {
    const isExpanded = expandedCardId === item.id;
    return (
      <TouchableOpacity
        onPress={() => toggleCard(item.id)}
        activeOpacity={0.8}
        style={[
          styles.cardContainer,
          {
            width: isExpanded ? expandedCardWidth : collapsedCardWidth,
            height: isExpanded ? null : collapsedCardWidth, // square when collapsed
          },
          isExpanded ? {} : styles.collapsedCardContainer,
        ]}
      >
        <View style={styles.innerContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('/workspaces/CS624-PE-Tejasree-Kokkanti/PE04-profile_cards/assets/images/user.png')}
              style={isExpanded ? styles.profileImage : styles.collapsedProfileImage}
            />
          </View>
          {isExpanded && (
            <>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.occupation}>{item.occupation}</Text>
              <View style={styles.line} />
              <Text style={styles.description}>{item.description}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cardsData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        extraData={expandedCardId} // re-render on change
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
    // Use flex-start to avoid centering issues with FlatList
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  listContent: {
    paddingVertical: 30,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: '#2F95DC',
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 2,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  collapsedCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  innerContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  collapsedProfileImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  occupation: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  line: {
    width: 100,
    borderBottomColor: '#fff',
    borderBottomWidth: 1.5,
    marginBottom: 15,
  },
  description: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
  },
});
