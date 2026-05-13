import { motion, AnimatePresence } from "framer-motion";
import AppButton from "./AppButton";
import PropTypes from "prop-types";

const HintModal = ({ isOpen, onConfirm, onCancel, pointCost }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className="bg-gray-800 p-6 rounded-xl max-w-sm mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold mb-4">Use Hint?</h3>
          <p className="text-gray-400 mb-4">
            This will remove one wrong answer from the options.
          </p>
          <p className="text-yellow-400 mb-6">Costs {pointCost} points</p>
          <div className="flex gap-3">
            <AppButton variant="ghost" onClick={onCancel} className="flex-1">
              Cancel
            </AppButton>
            <AppButton variant="primary" onClick={onConfirm} className="flex-1">
              Use Hint
            </AppButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

HintModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  pointCost: PropTypes.number.isRequired,
};

export default HintModal;
