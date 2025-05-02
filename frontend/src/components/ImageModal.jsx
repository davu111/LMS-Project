import { motion } from 'framer-motion';
import { useEffect } from 'react';

function ImgaeModal({ score, onClose, onImport }) {
  return (
    <>
      {score.images.map((img, i) => (
        <img key={i} src={img} alt="" />
      ))}

      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Đóng khi click bên ngoài
      >
        <motion.div
          className="relative bg-white p-6 rounded-lg shadow-lg w-[clamp(1rem,90vw,60rem)] h-[clamp(1rem,90vh,50rem)] flex overflow-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()} // Ngăn đóng khi click vào nội dung
        >
          {score.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-contain"
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}

export default ImgaeModal;
