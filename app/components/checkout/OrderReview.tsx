import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartItem, ShippingInfo, PaymentInfo } from '../MultiStepCheckout';

interface OrderReviewProps {
  cartItems: CartItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  totalAmount: number;
  onConfirm: () => void;
  onBack: () => void;
  isProcessing: boolean;
}

const OrderReview: React.FC<OrderReviewProps> = ({
  cartItems,
  shippingInfo,
  paymentInfo,
  totalAmount,
  onConfirm,
  onBack,
  isProcessing,
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="document-text-outline" size={24} color="#4CAF50" />
          <Text style={styles.title}>Review Your Order</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Shipping</Text>
            <Text style={styles.priceValue}>
              {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
            </Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax</Text>
            <Text style={styles.priceValue}>${tax.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)} USDC</Text>
          </View>
        </View>

        {/* Shipping Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={16} color="#666" />
              <Text style={styles.infoText}>{shippingInfo.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {shippingInfo.address}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="business-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {shippingInfo.city}, {shippingInfo.postalCode}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="flag-outline" size={16} color="#666" />
              <Text style={styles.infoText}>{shippingInfo.country}</Text>
            </View>
            {shippingInfo.phone && (
              <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={16} color="#666" />
                <Text style={styles.infoText}>{shippingInfo.phone}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.infoCard}>
            {paymentInfo.method === 'crypto' ? (
              <>
                <View style={styles.infoRow}>
                  <Ionicons name="logo-bitcoin" size={16} color="#666" />
                  <Text style={styles.infoText}>Cryptocurrency (USDC)</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="wallet-outline" size={16} color="#666" />
                  <Text style={styles.infoText} numberOfLines={1}>
                    {paymentInfo.cryptoAddress?.substring(0, 20)}...
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={styles.infoRow}>
                  <Ionicons name="card-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>Credit/Debit Card</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="person-outline" size={16} color="#666" />
                  <Text style={styles.infoText}>
                    {paymentInfo.cardDetails?.name}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="card" size={16} color="#666" />
                  <Text style={styles.infoText}>
                    **** **** **** {paymentInfo.cardDetails?.number.slice(-4)}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
          <View style={styles.securityText}>
            <Text style={styles.securityTitle}>Secure Escrow Payment</Text>
            <Text style={styles.securityDescription}>
              Your payment will be held securely in escrow until order completion
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.backButton, isProcessing && styles.disabledButton]} 
          onPress={onBack}
          disabled={isProcessing}
        >
          <Ionicons name="arrow-back" size={20} color="#666" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.confirmButton, isProcessing && styles.disabledButton]} 
          onPress={onConfirm}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.confirmButtonText}>Processing...</Text>
            </>
          ) : (
            <>
              <Text style={styles.confirmButtonText}>Complete Purchase</Text>
              <Ionicons name="checkmark" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginLeft: 12,
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
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemInfo: {
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
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 16,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#4CAF50',
    paddingTop: 15,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e8f5e8',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  securityText: {
    marginLeft: 12,
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 14,
    color: '#2e7d32',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default OrderReview;