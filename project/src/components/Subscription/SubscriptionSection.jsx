import React, { useState } from 'react';
import { Check, Star, Crown, Shield, Zap, Users, CreditCard, Smartphone } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import LoadingSpinner from '../UI/LoadingSpinner';

const SubscriptionSection = () => {
  const { state } = useApp();
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const plans = [
    {
      id: 'free',
      name: 'Explorer',
      price: 0,
      billingPeriod: billingPeriod,
      icon: Users,
      description: 'Perfect for getting started with basic city navigation',
      buttonText: 'Current Plan',
      buttonStyle: 'bg-gray-100 text-gray-600 cursor-not-allowed',
      features: [
        { name: 'Basic housing search (up to 10 listings)', included: true },
        { name: 'Street navigation with turn-by-turn directions', included: true },
        { name: 'Shop locator with basic filters', included: true },
        { name: 'Public transportation routes', included: true },
        { name: 'Community reviews and ratings', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Advanced housing filters', included: false },
        { name: 'Premium listings access', included: false },
        { name: 'Real-time traffic updates', included: false },
        { name: 'Offline maps', included: false },
        { name: 'Priority customer support', included: false },
        { name: 'Exclusive deals and discounts', included: false }
      ]
    },
    {
      id: 'basic',
      name: 'Navigator',
      price: billingPeriod === 'monthly' ? 9.99 : 99.99,
      billingPeriod: billingPeriod,
      icon: Zap,
      description: 'Enhanced features for regular city explorers',
      buttonText: 'Upgrade to Navigator',
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      features: [
        { name: 'Unlimited housing search access', included: true },
        { name: 'Advanced housing filters & saved searches', included: true },
        { name: 'Premium shop directory with detailed info', included: true },
        { name: 'Real-time traffic updates', included: true },
        { name: 'Offline maps download', included: true },
        { name: 'Neighborhood safety ratings', included: true },
        { name: 'Email support within 24 hours', included: true },
        { name: 'Premium listings access', included: false },
        { name: 'Virtual tours for all properties', included: false },
        { name: 'Concierge service', included: false },
        { name: 'Exclusive deals and discounts', included: false },
        { name: 'Priority booking assistance', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'City Expert',
      price: billingPeriod === 'monthly' ? 19.99 : 199.99,
      billingPeriod: billingPeriod,
      icon: Crown,
      popular: true,
      description: 'Complete city living solution with premium perks',
      buttonText: 'Go Premium',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700',
      features: [
        { name: 'Everything in Navigator plan', included: true },
        { name: 'Premium listings with exclusive properties', included: true, premium: true },
        { name: 'Virtual tours for all properties', included: true, premium: true },
        { name: 'Personal concierge service', included: true, premium: true },
        { name: 'Exclusive deals and member discounts', included: true, premium: true },
        { name: 'Priority booking assistance', included: true, premium: true },
        { name: 'Advanced analytics and insights', included: true, premium: true },
        { name: 'Custom itinerary planning', included: true, premium: true },
        { name: '24/7 priority support', included: true, premium: true },
        { name: 'White-glove relocation assistance', included: true, premium: true },
        { name: 'Access to exclusive events', included: true, premium: true },
        { name: 'Personal city guide recommendations', included: true, premium: true }
      ]
    }
  ];

  const handlePlanSelection = (planId) => {
    if (planId === 'free') return;
    
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      // In a real app, this would handle the actual Stripe/PayPal integration
      alert(`Payment processed successfully for ${plans.find(p => p.id === selectedPlan)?.name} plan!`);
    }, 2000);
  };

  const currentPlan = state.user?.subscriptionTier || 'free';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your City Adventure
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Unlock the full potential of city living with our comprehensive plans designed for every explorer
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentPlan === plan.id;
          
          return (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl ${
                plan.popular 
                  ? 'border-purple-500 scale-105' 
                  : isCurrentPlan
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${
                    plan.popular 
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    {isCurrentPlan && (
                      <span className="text-sm text-blue-600 font-medium">Current Plan</span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      TK{plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600 ml-2">
                        /{billingPeriod === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && plan.price > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      Save TK{((plan.price * 12 / 10) - plan.price).toFixed(2)} annually
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handlePlanSelection(plan.id)}
                  disabled={isCurrentPlan}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isCurrentPlan ? plan.buttonStyle : plan.buttonStyle
                  }`}
                >
                  {isCurrentPlan ? 'Current Plan' : plan.buttonText}
                </button>

                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <Check className={`h-5 w-5 mt-0.5 mr-3 ${
                            feature.premium 
                              ? 'text-purple-600'
                              : 'text-green-600'
                          }`} />
                        ) : (
                          <div className="h-5 w-5 mt-0.5 mr-3 border-2 border-gray-300 rounded-full"></div>
                        )}
                        <span className={`text-sm ${
                          feature.included 
                            ? feature.premium
                              ? 'text-purple-700 font-medium'
                              : 'text-gray-700'
                            : 'text-gray-400'
                        }`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
            <p className="text-gray-600 text-sm">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the end of your billing cycle for downgrades.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
            <p className="text-gray-600 text-sm">
              Our Explorer plan is completely free forever. For premium plans, we offer a 14-day free trial so you can experience all features risk-free.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600 text-sm">
              We accept all major credit cards through Stripe, as well as PayPal. All payments are processed securely with industry-standard encryption.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
            <p className="text-gray-600 text-sm">
              Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your subscription, contact our support team for a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Complete Your Subscription
            </h3>
            
            {selectedPlan && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">
                    {plans.find(p => p.id === selectedPlan)?.name} Plan
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    TK{plans.find(p => p.id === selectedPlan)?.price}
                    <span className="text-sm text-gray-600">
                      /{plans.find(p => p.id === selectedPlan)?.billingPeriod}
                    </span>
                  </span>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">Credit Card (Stripe)</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <Smartphone className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">PayPal</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isProcessing ? (
                  <LoadingSpinner size="sm" color="text-white" />
                ) : (
                  'Complete Payment'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSection;