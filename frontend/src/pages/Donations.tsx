import { CreditCard, IndianRupee, Wallet, Building2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

type DonationType = {
  id: string;
  name: string;
  description: string;
  minimumAmount: number;
};

const donationTypes: DonationType[] = [
  {
    id: 'annadanam',
    name: 'Annadanam',
    description: 'Contribute to feeding devotees',
    minimumAmount: 1100,
  },
  {
    id: 'renovation',
    name: 'Temple Renovation',
    description: 'Support temple maintenance and renovation',
    minimumAmount: 2100,
  },
  {
    id: 'pooja',
    name: 'Special Pooja',
    description: 'Sponsor temple rituals and ceremonies',
    minimumAmount: 501,
  },
];

export function Donations() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [step, setStep] = useState(1);
  const [donationComplete, setDonationComplete] = useState(false);
  const [donationId, setDonationId] = useState('');
  const [error, setError] = useState<string>('');

  const selectedDonationData = donationTypes.find((type) => type.id === selectedType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 1 && selectedType && amount) {
      if (parseFloat(amount) < (selectedDonationData?.minimumAmount || 0)) {
        setError(`Amount must be at least ₹${selectedDonationData?.minimumAmount}`);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!paymentMethod) {
        setError('Please select a payment method');
        return;
      }
      if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv)) {
        setError('Please fill in all card details');
        return;
      }
      if (paymentMethod === 'upi' && !upiId) {
        setError('Please enter a valid UPI ID');
        return;
      }

      const donationData = {
        donationType: selectedType,
        amount,
        paymentMethod,
        ...(paymentMethod === 'card' && { cardNumber, expiryDate, cvv }),
        ...(paymentMethod === 'upi' && { upiId }),
      };

      try {
        const response = await fetch('http://localhost:3000/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(donationData),
        });

        const result = await response.json();

        if (response.ok) {
          setDonationId(result.donationId);
          setDonationComplete(true);
        } else {
          setError(result.message || 'Failed to process donation');
        }
      } catch (err) {
        console.error('❌ Donation submission error:', err);
        setError('An error occurred while processing your donation');
      }
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardNumber(value);
  };

  const handleNewDonation = () => {
    setStep(1);
    setSelectedType('');
    setAmount('');
    setPaymentMethod('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setUpiId('');
    setDonationComplete(false);
    setDonationId('');
    setError('');
  };

  if (donationComplete && selectedDonationData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-20 w-20 text-green-500 animate-bounce" />
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
              Donation Successful!
            </h1>
            <p className="mt-4 text-xl text-gray-600 font-light">
              Thank you for your generous contribution. May you be blessed with prosperity and peace.
            </p>
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-3xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              Donation Details
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <span className="text-gray-600 font-medium">Donation ID</span>
                <span className="font-semibold text-gray-900">{donationId}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <span className="text-gray-600 font-medium">Donation Type</span>
                <span className="font-semibold text-gray-900">{selectedDonationData.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <span className="text-gray-600 font-medium">Amount</span>
                <span className="font-semibold text-gray-900">₹{amount}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <span className="text-gray-600 font-medium">Payment Method</span>
                <span className="font-semibold text-gray-900">
                  {paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI' : 'Net Banking'}
                </span>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={handleNewDonation}
                className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-4 text-lg font-medium text-white shadow-md hover:from-orange-700 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Make Another Donation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
            Make a Donation
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-light">
            Support our temple's activities and receive divine blessings
          </p>
        </div>

        <div className="mt-12">
          <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-2xl shadow-2xl p-8">
            {error && (
              <div className="rounded-lg bg-red-100 p-4 border border-red-200">
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            )}

            {step === 1 && (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {donationTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`relative rounded-xl border p-6 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 ${
                        selectedType === type.id
                          ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-200'
                          : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IndianRupee className="h-6 w-6 text-orange-600" />
                          <div className="text-sm">
                            <p className="font-semibold text-gray-900">{type.name}</p>
                            <p className="text-gray-600">{type.description}</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-500 font-medium">
                        Minimum amount: ₹{type.minimumAmount}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Amount (₹)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
                      placeholder="Enter amount"
                      min={selectedDonationData?.minimumAmount || 1}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && selectedDonationData && (
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Donation Summary
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Type: {selectedDonationData.name}</p>
                    <p className="text-sm text-gray-600">Description: {selectedDonationData.description}</p>
                    <p className="text-sm font-medium text-gray-900">Amount: ₹{amount}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                      { id: 'card', icon: CreditCard, label: 'Credit/Debit Card' },
                      { id: 'upi', icon: Wallet, label: 'UPI' },
                      { id: 'netbanking', icon: Building2, label: 'Net Banking' },
                    ].map(({ id, icon: Icon, label }) => (
                      <div
                        key={id}
                        className={`relative rounded-xl border p-6 cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 ${
                          paymentMethod === id
                            ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-200'
                            : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod(id)}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-6 w-6 text-orange-600" />
                          <span className="text-sm font-medium text-gray-900">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="password"
                          id="cvv"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upi-id"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3 transition-all duration-200 hover:border-orange-400"
                      placeholder="username@upi"
                      required
                    />
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                    <p className="text-sm text-blue-800 font-medium">
                      You will be redirected to your bank's payment portal after clicking 'Complete Donation'.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 px-6 py-3 text-lg font-medium text-white shadow-md hover:from-orange-700 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {step === 1 ? 'Continue to Payment' : 'Complete Donation'}
              </button>
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full rounded-lg border border-gray-300 px-6 py-3 text-lg font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Back to Donation Selection
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}