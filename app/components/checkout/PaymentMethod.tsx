import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PaymentInfo } from '../MultiStepCheckout';

interface PaymentMethodProps {
  initialPayment: PaymentInfo;
  totalAmount: number;
  onSubmit: (info: PaymentInfo) => void;
  onBack: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  initialPayment,
  totalAmount,
  onSubmit,
  onBack,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>(
    initialPayment.method
  );
  const [cryptoAddress, setCryptoAddress] = useState(
    initialPayment.cryptoAddress || ''
  );
  const [cardDetails, setCardDetails] = useState(
    initialPayment.cardDetails || {
      number: '',
      expiryDate: '',
      cvv: '',
      name: '',
    }
  );
  const [errors, setErrors] = useState<any>({});

  const validateCrypto = (): boolean => {
    if (!cryptoAddress.trim()) {
      setErrors({ crypto: 'Crypto wallet address is required' });
      return false;
    }
    // Basic validation for crypto address format
    if (cryptoAddress.length < 20) {
      setErrors({ crypto: 'Invalid wallet address format' });
      return false;
    }
    return true;
  };

  const validateCard = (): boolean => {
    const newErrors: any = {};

    if (!cardDetails.number.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardDetails.number.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!cardDetails.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
    }

    if (!cardDetails.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardDetails.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (!cardDetails.name.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (paymentMethod === 'crypto') {
      if (validateCrypto()) {
        onSubmit({
          method: 'crypto',
          cryptoAddress,
        });
      } else {
        Alert.alert('Validation Error', 'Please check your crypto wallet address');
      }
    } else {
      if (validateCard()) {
        onSubmit({
          method: 'card',
          cardDetails,
        });
      } else {
        Alert.alert('Validation Error', 'Please check your card details');
      }
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const match = cleaned.match(/\d{4}/g);
    if (match) {
      return match.join(' ').substr(0, 19); // Limit to 4 groups of 4 digits
    }
    return cleaned;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="card-outline" size={24} color="#4CAF50" />
          <Text style={styles.title}>Payment Method</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>${totalAmount.toFixed(2)} USDC</Text>
        </View>

        <View style={styles.methodSelector}>
          <TouchableOpacity
            style={[
              styles.methodOption,
              paymentMethod === 'crypto' && styles.selectedMethod,
            ]}
            onPress={() => {
              setPaymentMethod('crypto');
              setErrors({});
            }}
          >
            <View style={styles.methodContent}>
              <Ionicons
                name="logo-bitcoin"
                size={24}
                color={paymentMethod === 'crypto' ? '#4CAF50' : '#666'}
              />
              <View style={styles.methodText}>
                <Text
                  style={[
                    styles.methodTitle,
                    paymentMethod === 'crypto' && styles.selectedMethodText,
                  ]}
                >
                  Cryptocurrency
                </Text>
                <Text style={styles.methodSubtitle}>
                  Pay with USDC via escrow
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.radioButton,
                paymentMethod === 'crypto' && styles.radioButtonSelected,
              ]}
            >
              {paymentMethod === 'crypto' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodOption,
              paymentMethod === 'card' && styles.selectedMethod,
            ]}
            onPress={() => {
              setPaymentMethod('card');
              setErrors({});
            }}
          >
            <View style={styles.methodContent}>
              <Ionicons
                name="card"
                size={24}
                color={paymentMethod === 'card' ? '#4CAF50' : '#666'}
              />
              <View style={styles.methodText}>
                <Text
                  style={[
                    styles.methodTitle,
                    paymentMethod === 'card' && styles.selectedMethodText,
                  ]}
                >
                  Credit/Debit Card
                </Text>
                <Text style={styles.methodSubtitle}>
                  Pay with Visa, Mastercard, etc.
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.radioButton,
                paymentMethod === 'card' && styles.radioButtonSelected,
              ]}
            >
              {paymentMethod === 'card' && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {paymentMethod === 'crypto' && (
          <View style={styles.paymentForm}>
            <Text style={styles.formTitle}>Crypto Payment Details</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>USDC Wallet Address *</Text>
              <TextInput
                style={[styles.input, errors.crypto && styles.inputError]}
                placeholder="Enter your USDC wallet address"
                value={cryptoAddress}
                onChangeText={(text) => {
                  setCryptoAddress(text);
                  if (errors.crypto) setErrors({});
                }}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.crypto && (
                <Text style={styles.errorText}>{errors.crypto}</Text>
              )}
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#2196F3" />
              <Text style={styles.infoText}>
                Funds will be held in escrow until order completion
              </Text>
            </View>
          </View>
        )}

        {paymentMethod === 'card' && (
          <View style={styles.paymentForm}>
            <Text style={styles.formTitle}>Card Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number *</Text>
              <TextInput
                style={[styles.input, errors.cardNumber && styles.inputError]}
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChangeText={(text) => {
                  const formatted = formatCardNumber(text);
                  setCardDetails(prev => ({ ...prev, number: formatted }));
                  if (errors.cardNumber) {
                    setErrors(prev => ({ ...prev, cardNumber: undefined }));
                  }
                }}
                keyboardType="numeric"
                maxLength={19}
              />
              {errors.cardNumber && (
                <Text style={styles.errorText}>{errors.cardNumber}</Text>
              )}
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Expiry Date *</Text>
                <TextInput
                  style={[styles.input, errors.expiryDate && styles.inputError]}
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChangeText={(text) => {
                    const formatted = formatExpiryDate(text);
                    setCardDetails(prev => ({ ...prev, expiryDate: formatted }));
                    if (errors.expiryDate) {
                      setErrors(prev => ({ ...prev, expiryDate: undefined }));
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <Text style={styles.errorText}>{errors.expiryDate}</Text>
                )}
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>CVV *</Text>
                <TextInput
                  style={[styles.input, errors.cvv && styles.inputError]}
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChangeText={(text) => {
                    setCardDetails(prev => ({ ...prev, cvv: text.replace(/\D/g, '') }));
                    if (errors.cvv) {
                      setErrors(prev => ({ ...prev, cvv: undefined }));
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
                {errors.cvv && (
                  <Text style={styles.errorText}>{errors.cvv}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cardholder Name *</Text>
              <TextInput
                style={[styles.input, errors.cardName && styles.inputError]}
                placeholder="Enter cardholder name"
                value={cardDetails.name}
                onChangeText={(text) => {
                  setCardDetails(prev => ({ ...prev, name: text }));
                  if (errors.cardName) {
                    setErrors(prev => ({ ...prev, cardName: undefined }));
                  }
                }}
                autoCapitalize="words"
              />
              {errors.cardName && (
                <Text style={styles.errorText}>{errors.cardName}</Text>
              )}
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#666" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.nextButtonText}>Review Order</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  amountContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4CAF50',
  },
  methodSelector: {
    marginBottom: 30,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 15,
  },
  selectedMethod: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodText: {
    marginLeft: 15,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  selectedMethodText: {
    color: '#4CAF50',
  },
  methodSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4CAF50',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  paymentForm: {
    flex: 1,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  inputError: {
    borderColor: '#FF5252',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#1976d2',
    marginLeft: 10,
    flex: 1,
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
  nextButton: {
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
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
});

export default PaymentMethod;