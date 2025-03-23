
import React, { useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentGatewayProps {
  amount: number;
  onPaymentComplete: (paymentInfo: {
    id: string;
    method: string;
    last4?: string;
    timestamp: string;
  }) => void;
  isSubmitting: boolean;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  amount,
  onPaymentComplete,
  isSubmitting,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    // Validate payment information based on method
    if (paymentMethod === 'credit-card') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        setError('Please fill in all card details');
        setIsProcessing(false);
        return;
      }

      // Simple validation for card number format (16 digits)
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        setError('Card number must be 16 digits');
        setIsProcessing(false);
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        setError('Please enter a valid UPI ID (e.g. name@upi)');
        setIsProcessing(false);
        return;
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);

      // Generate payment receipt info
      const paymentInfo = {
        id: `PAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        method: paymentMethod,
        last4: paymentMethod === 'credit-card' ? cardNumber.slice(-4) : undefined,
        timestamp: new Date().toISOString(),
      };

      // After a short delay to show success message, call the completion handler
      setTimeout(() => {
        onPaymentComplete(paymentInfo);
      }, 1500);
    }, 2000);
  };

  const formatCardNumber = (input: string) => {
    const numbers = input.replace(/\D/g, '');
    const groups = [];
    
    for (let i = 0; i < numbers.length; i += 4) {
      groups.push(numbers.substring(i, i + 4));
    }
    
    return groups.join(' ').slice(0, 19); // Max 19 chars: 16 digits + 3 spaces
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <span>Payment Gateway</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-center py-6">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground">
              Your payment has been processed successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-4 mb-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex items-center gap-2">
                  <span>Credit or Debit Card</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi">UPI Payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="net-banking" id="net-banking" />
                <Label htmlFor="net-banking">Net Banking</Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'credit-card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input
                    id="card-name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry">Expiry Date</Label>
                    <Input
                      id="card-expiry"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-cvv">CVV</Label>
                    <Input
                      id="card-cvv"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      type="password"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your UPI ID to make payment directly from your bank account.
                </p>
              </div>
            )}

            {paymentMethod === 'net-banking' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You will be redirected to your bank's website to complete the payment.
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center gap-2 mt-6 mb-4">
              <Lock className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">
                Your payment information is secure and encrypted
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-2" 
              disabled={isProcessing || isSubmitting}
            >
              {isProcessing 
                ? 'Processing...' 
                : `Pay ₹${amount.toFixed(2)}`}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentGateway;
