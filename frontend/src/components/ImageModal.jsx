import { useState } from 'react';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function ImageModal({ score, onClose, onDone }) {
  const [tempScore, setTempScore] = useState(score);

  const handleChange = (e) => {
    const newScore = e.target.value;
    if (newScore >= 0 && newScore <= 100) setTempScore({ ...tempScore, score: newScore });
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/30 z-10"
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
          <div className="flex gap-4 w-full relative">
            {/* Cột ảnh - chiếm 4/5 chiều rộng */}
            <div className="w-[90%] flex flex-col gap-4 overflow-y-auto no-scrollbar">
              {score.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
              ))}
            </div>

            {/* Cột nhập điểm + nút Done - chiếm 1/5 chiều rộng */}
            <div className="w-[10%] flex flex-col gap-4 justify-center m-2">
              <input
                type="number"
                value={tempScore.score || ''}
                onChange={(e) => handleChange(e)}
                className="w-full p-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-xl no-spinner"
              />
              <button
                onClick={() => onDone(tempScore)}
                className="text-xl font-bold p-2 cursor-pointer rounded bg-indigo-700 text-white transition-all duration-300 hover:bg-white hover:text-indigo-700 hover:border-indigo-700 hover:border-2"
              >
                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default ImageModal;
