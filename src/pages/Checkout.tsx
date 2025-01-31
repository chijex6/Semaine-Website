import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { ChevronRight, MapPin, Truck, Package, CheckCircle, CreditCard, Check, Landmark, Hash, X, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { Toast, ToastType } from "../components/Toast";
import { CountdownTimer } from "../components/CountdownTimer";
const DELIVERY_FEES = {
  pickup: 0,
  lagos: {
    island: 2000,
    mainland: 1500
  },
  others: 3500
};
const STATES = ["Abuja", "Ogun", "Oyo", "Rivers", "Kano", "Enugu", "Delta"];
const POPULAR_STOPS = {
  Abuja: ["Wuse", "Garki", "Maitama", "Gwarinpa"],
  Ogun: ["Abeokuta", "Ijebu Ode", "Sagamu", "Ota"],
  Oyo: ["Ibadan", "Ogbomoso", "Oyo", "Iseyin"]
};
const LAGOS_AREAS = {
  island: ["Lekki", "Victoria Island", "Ikoyi", "Ajah"],
  mainland: ["Ikeja", "Yaba", "Surulere", "Maryland"]
};
const BANK_DETAILS = {
  accountName: "Semaine Security Ltd",
  bankName: "First Bank",
  accountNumber: "0123456789"
};
const USSD_CODE = "*737*8*9#";
export const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems
  } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false
  });
  const [hasTransferred, setHasTransferred] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);
  useEffect(() => {
    const savedAddress = localStorage.getItem("savedAddress");
    if (savedAddress) {
      setFormData(prev => ({
        ...prev,
        ...JSON.parse(savedAddress)
      }));
    }
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    locationType: "",
    state: "",
    lagosZone: "",
    bustop: "",
    address: "",
    deliveryMethod: ""
  });
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = formData.deliveryMethod === "pickup" ? 0 : formData.locationType === "lagos" ? DELIVERY_FEES.lagos[formData.lagosZone] : DELIVERY_FEES.others;
  const total = subtotal + deliveryFee;
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
              </div>
            </div>
          </motion.div>;
      case 2:
        return <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">
              Delivery Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => handleInputChange({
                  target: {
                    name: "locationType",
                    value: "lagos"
                  }
                })} className={`p-4 border rounded-lg text-center transition-all ${formData.locationType === "lagos" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
                    Lagos
                  </button>
                  <button onClick={() => handleInputChange({
                  target: {
                    name: "locationType",
                    value: "outside"
                  }
                })} className={`p-4 border rounded-lg text-center transition-all ${formData.locationType === "outside" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
                    Outside Lagos
                  </button>
                  <button onClick={() => handleInputChange({
                  target: {
                    name: "locationType",
                    value: "pickup"
                  }
                })} className={`p-4 border rounded-lg text-center transition-all ${formData.locationType === "pickup" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
                    Pickup
                  </button>
                </div>
              </div>
              {formData.locationType === "lagos" && <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zone
                    </label>
                    <select name="lagosZone" value={formData.lagosZone} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option value="">Select Zone</option>
                      <option value="island">Island</option>
                      <option value="mainland">Mainland</option>
                    </select>
                  </div>
                  {formData.lagosZone && <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area
                      </label>
                      <select name="bustop" value={formData.bustop} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="">Select Area</option>
                        {LAGOS_AREAS[formData.lagosZone].map(area => <option key={area} value={area}>
                            {area}
                          </option>)}
                      </select>
                    </div>}
                </>}
              {formData.locationType === "outside" && <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select name="state" value={formData.state} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option value="">Select State</option>
                      {STATES.map(state => <option key={state} value={state}>
                          {state}
                        </option>)}
                    </select>
                  </div>
                  {formData.state && <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bus Stop
                      </label>
                      <select name="bustop" value={formData.bustop} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="">Select Bus Stop</option>
                        {POPULAR_STOPS[formData.state].map(stop => <option key={stop} value={stop}>
                            {stop}
                          </option>)}
                      </select>
                    </div>}
                </>}
              {formData.locationType && formData.locationType !== "pickup" && <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Address
                  </label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Enter your detailed address" />
                </div>}
            </div>
          </motion.div>;
      case 3:
        return <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Payment</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              {cartItems.map(item => <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>)}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mt-2">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            {renderPaymentSection()}
          </motion.div>;
      default:
        return null;
    }
  };
  const renderPaymentSection = () => {
    return <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setPaymentMethod("card")} className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "card" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
            <CreditCard className="h-6 w-6" />
            <span>Pay with Card</span>
          </motion.button>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setPaymentMethod("bank")} className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "bank" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
            <Landmark className="h-6 w-6" />
            <span>Bank Transfer</span>
          </motion.button>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setPaymentMethod("ussd")} className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "ussd" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
            <Hash className="h-6 w-6" />
            <span>USSD</span>
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {paymentMethod && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} className="bg-gray-50 p-6 rounded-lg">
              {paymentMethod === "card" && <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-3 border rounded-md" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input type="text" placeholder="123" className="w-full p-3 border rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>}
              {paymentMethod === "bank" && <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-lg mb-4">
                      Bank Transfer Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600">Bank Name</span>
                        <span className="font-medium">
                          {BANK_DETAILS.bankName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600">Account Name</span>
                        <span className="font-medium">
                          {BANK_DETAILS.accountName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600">Account Number</span>
                        <span className="font-medium">
                          {BANK_DETAILS.accountNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!hasTransferred && <div className="bg-white p-6 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Time Remaining
                      </h4>
                      <CountdownTimer initialMinutes={30} onComplete={() => {
                showToast("Transfer time expired. Please try again.", "error");
                setPaymentMethod("");
              }} />
                    </div>}
                  <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => {
              setHasTransferred(true);
              showToast("Thank you! We will verify your transfer shortly.", "success");
            }} className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2" disabled={hasTransferred}>
                    <CheckCircle className="h-5 w-5" />
                    <span>
                      {hasTransferred ? "Transfer Confirmed" : "I Have Transferred"}
                    </span>
                  </motion.button>
                </div>}
              {paymentMethod === "ussd" && <div className="space-y-4">
                  <h3 className="font-semibold text-lg">USSD Code</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <p className="text-3xl font-bold text-gray-900 mb-4">
                      {USSD_CODE}
                    </p>
                    <p className="text-sm text-gray-500">
                      Dial this code on your phone to complete the payment
                    </p>
                  </div>
                </div>}
            </motion.div>}
        </AnimatePresence>
        <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200">
          <input type="checkbox" id="saveAddress" checked={saveAddress} onChange={e => setSaveAddress(e.target.checked)} className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
          <label htmlFor="saveAddress" className="text-sm text-gray-600">
            Save delivery address for future orders
          </label>
        </div>
        <motion.button whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} onClick={handleCancelOrder} className="w-full py-3 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
          <X className="h-5 w-5" />
          <span>Cancel Order</span>
        </motion.button>
      </div>;
  };
  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        if (formData.locationType === "pickup") return true;
        if (formData.locationType === "lagos") {
          return formData.lagosZone && formData.bustop && formData.address;
        }
        if (formData.locationType === "outside") {
          return formData.state && formData.bustop && formData.address;
        }
        return false;
      default:
        return true;
    }
  };
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(current => current + 1);
    } else {
      alert("Please fill in all required fields");
    }
  };
  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      showToast("Please select a payment method", "error");
      return;
    }
    if (paymentMethod === "bank" && !hasTransferred) {
      showToast("Please complete the bank transfer first", "warning");
      return;
    }
    handleSaveAddress();
    switch (paymentMethod) {
      case "card":
        showToast("Processing card payment...", "info");
        // Implement card payment logic
        break;
      case "bank":
        showToast("Order placed! We will process it once transfer is verified.", "success");
        break;
      case "ussd":
        showToast(`Please dial ${USSD_CODE} to complete your payment`, "info");
        break;
    }
  };
  const handleCancelOrder = () => {
    const confirm = window.confirm("Are you sure you want to cancel your order?");
    if (confirm) {
      navigate("/cart");
    }
  };
  const handleSaveAddress = () => {
    if (saveAddress) {
      const addressToSave = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        locationType: formData.locationType,
        state: formData.state,
        lagosZone: formData.lagosZone,
        bustop: formData.bustop,
        address: formData.address
      };
      localStorage.setItem("savedAddress", JSON.stringify(addressToSave));
    }
  };
  const showToast = (message: string, type: ToastType) => {
    setToast({
      message,
      type,
      isVisible: true
    });
    setTimeout(() => {
      setToast(prev => ({
        ...prev,
        isVisible: false
      }));
    }, 3000);
  };
  return <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-8">
                {[1, 2, 3].map(step => <React.Fragment key={step}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step <= currentStep ? "bg-red-600 text-white" : "bg-gray-200"}`}>
                      {step < currentStep ? <Check className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && <div className={`flex-1 h-1 mx-2 ${step < currentStep ? "bg-red-600" : "bg-gray-200"}`} />}
                  </React.Fragment>)}
              </div>
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
              <div className="flex justify-between mt-8">
                {currentStep > 1 && <button onClick={() => setCurrentStep(current => current - 1)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    Back
                  </button>}
                {currentStep < 3 ? <button onClick={handleNextStep} className="ml-auto px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Continue
                  </button> : <button onClick={handlePlaceOrder} className="ml-auto px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Place Order
                  </button>}
              </div>
            </div>
          </div>
          <div className="lg:sticky lg:top-8 h-fit">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cartItems.map(item => <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>)}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mt-2">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg mt-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={() => setToast(prev => ({
      ...prev,
      isVisible: false
    }))} />
    </div>;
};