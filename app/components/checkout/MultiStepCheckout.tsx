import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ShippingInformation from './checkout/ShippingInformation';
import PaymentMethod from './checkout/PaymentMethod';
import OrderReview from './checkout/OrderReview';
import TransactionConfirmation from './checkout/TransactionConfirmation';
import OrderSummary from './checkout/OrderSummary';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface PaymentInfo {
  method: 'crypto' | 'card';
  cryptoAddress?: string;
  cardDetails?: {
    number: string;
    expiryDate: string;
    cvv: string;
    name: string;
  };
}

interface MultiStepCheckoutProps {
  cartItems: CartItem[];
  onClose: () => void;
  onOrderComplete: (orderId: string) => void;
}

const MultiStepCheckout: React.FC<MultiStepCheckoutProps> = ({
  cartItems,
  onClose,
  onOrderComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'crypto',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const steps = [
    'Shipping',
    'Payment',
    'Review',
    'Confirmation',
    'Complete'
  ];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleShippingSubmit = (info: ShippingInfo) => {
    setShippingInfo(info);
    handleNext();
  };

  const handlePaymentSubmit = (info: PaymentInfo) => {
    setPaymentInfo(info);
    handleNext();
  };

  const handleOrderConfirm = async () => {
    setIsProcessing(true);
    try {
      // Simulate API call to Trustless Work API
      const response = await processEscrowPayment({
        amount: totalAmount,
        items: cartItems,
        shipping: shippingInfo,
        payment: paymentInfo,
      });
      
      setTransactionId(response.transactionId);
      setOrderId(response.orderId);
      handleNext();
    } catch (error) {
      console.error('Payment processing failed:', error);
      // Handle error state
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step, index) => (
        <View key={step} style={styles.stepItem}>
          <View
            style={[
              styles.stepCircle,
              index <= currentStep && styles.activeStep,
              index < currentStep && styles.completedStep,
            ]}
          >
            {index < currentStep ? (
              <Ionicons name="checkmark" size={16} color="#fff" />
            ) : (
              <Text
                style={[
                  styles.stepNumber,
                  index <= currentStep && styles.activeStepNumber,
                ]}
              >
                {index + 1}
              </Text>
            )}
          </View>
          <Text
            style={[
              styles.stepLabel,
              index <= currentStep && styles.activeStepLabel,
            ]}
          >
            {step}
          </Text>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.stepLine,
                index < currentStep && styles.completedStepLine,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ShippingInformation
            initialInfo={shippingInfo}
            onSubmit={handleShippingSubmit}
            onBack={onClose}
          />
        );
      case 1:
        return (
          <PaymentMethod
            initialPayment={paymentInfo}
            totalAmount={totalAmount}
            onSubmit={handlePaymentSubmit}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <OrderReview
            cartItems={cartItems}
            shippingInfo={shippingInfo}
            paymentInfo={paymentInfo}
            totalAmount={totalAmount}
            onConfirm={handleOrderConfirm}
            onBack={handleBack}
            isProcessing={isProcessing}
          />
        );
      case 3:
        return (
          <TransactionConfirmation
            transactionId={transactionId}
            orderId={orderId}
            onContinue={handleNext}
          />
        );
      case 4:
        return (
          <OrderSummary
            orderId={orderId}
            cartItems={cartItems}
            shippingInfo={shippingInfo}
            totalAmount={totalAmount}
            onComplete={() => onOrderComplete(orderId!)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>
      
      {renderStepIndicator()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>
    </SafeAreaView>
  );
};

// Mock function for Trustless Work API integration
const processEscrowPayment = async (orderData: any) => {
  // This would be replaced with actual Trustless Work API call
  return new Promise<{ transactionId: string; orderId: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        transactionId: `tx_${Date.now()}`,
        orderId: `order_${Date.now()}`,
      });
    }, 2000);
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  activeStep: {
    backgroundColor: '#4CAF50',
  },
  completedStep: {
    backgroundColor: '#2196F3',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeStepNumber: {
    color: '#fff',
  },
  stepLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  activeStepLabel: {
    color: '#333',
    fontWeight: '600',
  },
  stepLine: {
    position: 'absolute',
    top: 16,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: '#e0e0e0',
    zIndex: -1,
  },
  completedStepLine: {
    backgroundColor: '#4CAF50',
  },
  content: {
    flex: 1,
  },
});

export default MultiStepCheckout;