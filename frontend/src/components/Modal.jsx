import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useState } from 'react';
function Modal({ title, onClose, handleSubmit }) {
  const [icon, setIcon] = useState(faQuestion);

  const handleConfirm = () => {
    handleSubmit();
    (title = 'Save') ? setIcon(faCheck) : setIcon(faXmark);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/10 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Đóng khi click bên ngoài
    >
      <motion.div
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl max-h-2xl flex flex-col"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()} // Ngăn đóng khi click vào nội dung
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="bg-white w-100 h-50 flex items-center justify-center">
          <motion.div
            key={icon.iconName} // Giúp Framer Motion nhận diện sự thay đổi
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          >
            <FontAwesomeIcon
              icon={icon}
              className={`text-5xl p-10 border-2 rounded-full ${
                icon === faQuestion
                  ? 'text-yellow-400 border-yellow-400'
                  : icon === faCheck
                  ? 'text-green-400 border-green-400'
                  : 'text-red-400 border-red-400'
              }`}
            />
          </motion.div>
        </div>
        <div className="text-center font-semibold mb-4">Are you sure to {title}?</div>
        <div className="flex flex-row-reverse gap-2">
          <div
            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-500"
            onClick={onClose}
          >
            No
          </div>
          <div
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-500"
            onClick={handleConfirm}
          >
            Yes
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
