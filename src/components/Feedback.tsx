import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, AlertCircle } from "lucide-react";
interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    }

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [navigationRating, setNavigationRating] = useState(0);
  const [issues, setIssues] = useState("");
  const [comment, setComment] = useState("");

interface FeedbackData {
    rating: number;
    navigationRating: number;
    issues: string;
    comment: string;
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const feedbackData: FeedbackData = { rating, navigationRating, issues, comment };
    console.log(feedbackData);
    handleClose();
};

  const handleClose = () => {
    setShowForm(false);
    setRating(0);
    setNavigationRating(0);
    setIssues("");
    setComment("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            {!showForm ? (
              <div className="text-center">
                <div className="mx-auto mb-4 text-red-600">
                  <AlertCircle className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-4">
                  Help us improve your experience!
                </h3>
                <p className="text-gray-600 mb-6">
                  Would you like to share quick feedback about our website?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Sure
                  </button>
                  <button
                    onClick={handleClose}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How would you rate your overall experience?
                  </label>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className={`p-2 rounded-full ${
                          rating >= num
                            ? "text-red-600 bg-red-50"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How easy was it to navigate our website?
                  </label>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNavigationRating(num)}
                        className={`p-2 rounded-full ${
                          navigationRating >= num
                            ? "text-red-600 bg-red-50"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Did you encounter any issues while navigating?
                  </label>
                  <textarea
                    value={issues}
                    onChange={(e) => setIssues(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={2}
                    placeholder="Optional..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any additional comments?
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={3}
                    placeholder="Optional..."
                  />
                </div>

                <div className="text-sm text-gray-500">
                  <AlertCircle className="h-4 w-4 inline-block mr-1" />
                  Your feedback is anonymous. We can't see who wrote this.
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-gray-600 hover:text-gray-800 px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;