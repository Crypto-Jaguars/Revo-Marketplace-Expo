import type React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface FarmingDetailsProps {
  details: string[];
}

const FarmingDetails: React.FC<FarmingDetailsProps> = ({ details }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farming Details</Text>
      <View style={styles.detailsList}>
        {details.map((detail, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <View key={index} style={styles.detailItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.detailText}>{detail}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsList: {
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2E8B57',
    marginRight: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default FarmingDetails;