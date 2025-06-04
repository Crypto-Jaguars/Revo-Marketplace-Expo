// services/TrustlessWorkAPI.ts
import { CartItem, ShippingInfo, PaymentInfo } from '../components/MultiStepCheckout';

export interface EscrowPaymentRequest {
  amount: number;
  items: CartItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  orderId?: string;
}

export interface EscrowPaymentResponse {
  success: boolean;
  transactionId: string;
  orderId: string;
  escrowAddress?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'failed';
  message?: string;
}

export interface OrderStatusResponse {
  orderId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  transactionId: string;
  escrowStatus: 'locked' | 'released' | 'disputed';
  trackingNumber?: string;
  estimatedDelivery?: string;
  lastUpdated: string;
}

class TrustlessWorkAPI {
  private baseURL = 'https://api.trustlesswork.com'; // Replace with actual API URL
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' = 'POST',
    data?: any
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Version': '1.0',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('TrustlessWork API Error:', error);
      throw error;
    }
  }

  /**
   * Create an escrow payment for the order
   */
  async createEscrowPayment(
    paymentRequest: EscrowPaymentRequest
  ): Promise<EscrowPaymentResponse> {
    try {
      // Validate payment request
      this.validatePaymentRequest(paymentRequest);

      const requestData = {
        amount: paymentRequest.amount,
        currency: 'USDC',
        items: paymentRequest.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        shipping: {
          recipient: paymentRequest.shipping.fullName,
          address: paymentRequest.shipping.address,
          city: paymentRequest.shipping.city,
          postalCode: paymentRequest.shipping.postalCode,
          country: paymentRequest.shipping.country,
          phone: paymentRequest.shipping.phone,
        },
        payment: {
          method: paymentRequest.payment.method,
          walletAddress: paymentRequest.payment.cryptoAddress,
          // Don't send sensitive card data - handle via secure payment processor
        },
        metadata: {
          platform: 'Revo-Marketplace-Expo',
          timestamp: new Date().toISOString(),
          version: '1.0',
        },
      };

      // For demo purposes, simulate API response
      // In production, this would make actual API call
      const response = await this.simulateEscrowPayment(requestData);
      
      return response;
    } catch (error) {
      console.error('Failed to create escrow payment:', error);
      throw new Error('Payment processing failed. Please try again.');
    }
  }

  /**
   * Get order status and escrow information
   */
  async getOrderStatus(orderId: string): Promise<OrderStatusResponse> {
    try {
      return await this.makeRequest<OrderStatusResponse>(
        `/orders/${orderId}/status`,
        'GET'
      );
    } catch (error) {
      console.error('Failed to get order status:', error);
      throw new Error('Unable to retrieve order status.');
    }
  }

  /**
   * Confirm delivery and release escrow funds
   */
  async confirmDelivery(orderId: string, confirmationCode?: string): Promise<{
    success: boolean;
    message: string;
    releasedAmount: number;
  }> {
    try {
      return await this.makeRequest(`/orders/${orderId}/confirm-delivery`, 'POST', {
        confirmationCode,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to confirm delivery:', error);
      throw new Error('Unable to confirm delivery.');
    }
  }

  /**
   * Dispute an order (buyer protection)
   */
  async disputeOrder(orderId: string, reason: string, evidence?: any): Promise<{
    success: boolean;
    disputeId: string;
    message: string;
  }> {
    try {
      return await this.makeRequest(`/orders/${orderId}/dispute`, 'POST', {
        reason,
        evidence,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to create dispute:', error);
      throw new Error('Unable to create dispute.');
    }
  }

  /**
   * Get escrow balance for a wallet
   */
  async getEscrowBalance(walletAddress: string): Promise<{
    totalLocked: number;
    activeOrders: number;
    currency: string;
  }> {
    try {
      return await this.makeRequest(`/escrow/balance/${walletAddress}`, 'GET');
    } catch (error) {
      console.error('Failed to get escrow balance:', error);
      throw new Error('Unable to retrieve escrow balance.');
    }
  }

  /**
   * Validate payment request before processing
   */
  private validatePaymentRequest(request: EscrowPaymentRequest): void {
    if (!request.amount || request.amount <= 0) {
      throw new Error('Invalid payment amount');
    }

    if (!request.items || request.items.length === 0) {
      throw new Error('No items in order');
    }

    if (!request.shipping.fullName || !request.shipping.address) {
      throw new Error('Incomplete shipping information');
    }

    if (request.payment.method === 'crypto' && !request.payment.cryptoAddress) {
      throw new Error('Crypto wallet address required');
    }

    if (request.payment.method === 'card' && !request.payment.cardDetails) {
      throw new Error('Card details required');
    }
  }

  /**
   * Simulate escrow payment for demo purposes
   * In production, this would be replaced with actual API calls
   */
  private async simulateEscrowPayment(requestData: any): Promise<EscrowPaymentResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 95% success rate
        if (Math.random() > 0.05) {
          resolve({
            success: true,
            transactionId: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            orderId: `order_${Date.now()}`,
            escrowAddress: '0x1234567890abcdef1234567890abcdef12345678',
            status: 'confirmed',
            message: 'Payment successfully processed and locked in escrow',
          });
        } else {
          reject(new Error('Payment processing failed'));
        }
      }, 2000); // Simulate network delay
    });
  }

  /**
   * Webhook handler for order status updates
   */
  handleWebhook(webhookData: any): void {
    try {
      const { orderId, status, transactionId, event } = webhookData;

      switch (event) {
        case 'order.shipped':
          console.log(`Order ${orderId} has been shipped`);
          // Update local order status
          // Send push notification to user
          break;

        case 'order.delivered':
          console.log(`Order ${orderId} has been delivered`);
          // Trigger automatic escrow release after confirmation period
          break;

        case 'escrow.released':
          console.log(`Escrow funds released for order ${orderId}`);
          // Update payment status
          // Send confirmation to seller
          break;

        case 'dispute.created':
          console.log(`Dispute created for order ${orderId}`);
          // Notify relevant parties
          // Freeze escrow funds
          break;

        default:
          console.log(`Unknown webhook event: ${event}`);
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
    }
  }
}

// Export singleton instance
const trustlessWorkAPI = new TrustlessWorkAPI(
  process.env.TRUSTLESS_WORK_API_KEY || 'demo_api_key'
);

export default trustlessWorkAPI;

// Export utility functions
export const TrustlessWorkUtils = {
  /**
   * Format transaction ID for display
   */
  formatTransactionId: (txId: string): string => {
    return `${txId.slice(0, 8)}...${txId.slice(-8)}`;
  },

  /**
   * Calculate escrow fee (typically 1-3% of transaction)
   */
  calculateEscrowFee: (amount: number, feePercentage: number = 2): number => {
    return (amount * feePercentage) / 100;
  },

  /**
   * Generate QR code data for payment
   */
  generatePaymentQR: (amount: number, address: string, orderId: string): string => {
    return `ethereum:${address}?value=${amount}&data=${orderId}`;
  },

  /**
   * Validate USDC address format
   */
  validateUSDCAddress: (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  },

  /**
   * Get network fee estimate
   */
  getNetworkFeeEstimate: (network: 'ethereum' | 'polygon' | 'arbitrum' = 'polygon'): number => {
    const fees = {
      ethereum: 0.005, // ETH
      polygon: 0.001,  // MATIC
      arbitrum: 0.002, // ETH
    };
    return fees[network];
  },
};

// Export types for use in components
export type {
  EscrowPaymentRequest,
  EscrowPaymentResponse,
  OrderStatusResponse,
};