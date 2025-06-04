import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartItem, ShippingInfo } from '../MultiStepCheckout';

interface OrderSummaryProps {
  orderId: string | null;
  cartItems: CartItem[];
  shippingInfo: ShippingInfo;
  totalAmount: number;
  onComplete: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderId,
  cartItems,
  shippingInfo,
  totalAmount,
  onComplete,
}) => {
  const [trackingNumber, setTrackingNumber] = useState<string>('');

  useEffect(() => {
    // Simulate generating tracking number
    const generateTrackingNumber = () => {
      const tracking = `TW${Date.now().toString().slice(-8)}`;
      setTrackingNumber(tracking);
    };

    generateTrackingNumber();
  }, []);

  const handleShareOrder = async () => {
    try {
      await Share.share({
        message: `Order Confirmation\nOrder ID: ${orderId}\nTracking: ${trackingNumber}\nTotal: ${totalAmount.toFixed(2)} USDC`,
        title: 'Order Confirmation',
      });
    } catch (error) {
      console.error('Error sharing order:', error);
    }
  };

  const handleTrackOrder = () => {
    Alert.alert(
      'Order Tracking',
      `Your order ${orderId} is being prepared for shipment. You will receive email notifications for all status updates.\n\nTracking Number: ${trackingNumber}`,
      [{ text: 'OK' }]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Need help with your order? Our support team is here to assist you 24/7.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Email Support', onPress: () => console.log('Email support') },
        { text: 'Live Chat', onPress: () => console.log('Live chat') },
      ]
    );
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.successBadge}>
            <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
            <Text style={styles.successText}>Order Placed Successfully!</Text>
          </View>
        </View>

        {/* Order Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Ionicons name="receipt-outline" size={20} color="#4CAF50" />
                <Text style={styles.infoLabel}>Order ID</Text>
              </View>
              <Text style={styles.infoValue}>{orderId}</Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Ionicons name="calendar-outline" size={20} color="#4CAF50" />
                <Text style={styles.infoLabel}>Order Date</Text>
              </View>
              <Text style={styles.infoValue}>
                {new Date().toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Ionicons name="card-outline" size={20} color="#4CAF50" />
                <Text style={styles.infoLabel}>Total Paid</Text>
              </View>
              <Text style={[styles.infoValue, styles.totalValue]}>
                ${totalAmount.toFixed(2)} USDC
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Ionicons name="time-outline" size={20} color="#4CAF50" />
                <Text style={styles.infoLabel}>Est. Delivery</Text>
              </View>
              <Text style={styles.infoValue}>
                {estimatedDelivery.toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Items Ordered */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items Ordered</Text>
          <View style={styles.itemsContainer}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <View style={styles.itemImagePlaceholder}>
                  <Ionicons name="image-outline" size={24} color="#999" />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                  <Text style={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Shipping Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>{shippingInfo.fullName}</Text>
            <Text style={styles.addressText}>{shippingInfo.address}</Text>
            <Text style={styles.addressText}>
              {shippingInfo.city}, {shippingInfo.postalCode}
            </Text>
            <Text style={styles.addressText}>{shippingInfo.country}</Text>
            {shippingInfo.phone && (
              <Text style={styles.addressText}>{shippingInfo.phone}</Text>
            )}
          </View>
        </View>

        {/* Tracking Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tracking Information</Text>
          <View style={styles.trackingCard}>
            <View style={styles.trackingHeader}>
              <Ionicons name="location" size={24} color="#4CAF50" />
              <Text style={styles.trackingNumber}>#{trackingNumber}</Text>
            </View>
            <Text style={styles.trackingStatus}>Order Confirmed</Text>
            <Text style={styles.trackingDescription}>
              Your order has been confirmed and is being prepared for shipment.
              You'll receive an email notification when it ships.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleTrackOrder}>
            <Ionicons name="location-outline" size={20} color="#4CAF50" />
            <Text style={styles.actionButtonText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShareOrder}>
            <Ionicons name="share-outline" size={20} color="#4CAF50" />
            <Text style={styles.actionButtonText}>Share Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleContactSupport}>
            <Ionicons name="chatbubble-outline" size={20} color="#4CAF50" />
            <Text style={styles.actionButtonText}>Support</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Settings */}
        <View style={styles.notificationSection}>
          <Text style={styles.notificationTitle}>Stay Updated</Text>
          <Text style={styles.notificationText}>
            We'll send you email notifications about your order status, shipping
            updates, and delivery confirmation.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.doneButton} onPress={onComplete}>
          <Text style={styles.doneButtonText}>Continue Shopping</Text>
          <Ionicons name="storefront" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successBadge: {
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    width: '100%',
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginTop: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalValue: {
    color: '#4CAF50',
    fontWeight: '700',
  },
  itemsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  addressCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  addressName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  trackingCard: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  trackingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trackingNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginLeft: 10,
  },
  trackingStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  trackingDescription: {
    fontSize: 14,
    color: '#2e7d32',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 90,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginTop: 5,
  },
  notificationSection: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: 8,
  },
  notificationText: {
    fontSize: 14,
    color: '#1976d2',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
});

export default OrderSummary;