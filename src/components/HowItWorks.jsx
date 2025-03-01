import React from "react";
import { motion } from "framer-motion";

import PropTypes from "prop-types";

const Image = ({ src, alt, width, height, className }) => (
  <img src={src} alt={alt} width={width} height={height} className={className} />
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

const steps = [
  {
    title: "Find Your Delivery Partner",
    description:
      "Post your delivery request on Peership, and our system will match you with a trusted traveler going the same way.",
  },
  {
    title: "Hand Over the Package",
    description:
      "Meet your verified Peership traveler at the agreed pickup location. Ensure proper packaging and share necessary delivery details for a smooth transaction.",
  },
  {
    title: "Track & Stay Updated",
    description:
      "Follow the journey of your package in real-time. Stay in touch with the delivery partner through our secure messaging system.",
  },
  {
    title: "Delivery & Payment",
    description:
      "Your package is safely delivered to the recipient’s doorstep. Confirm the delivery and complete the payment securely within the app.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#007BFF] to-[#28A745] text-transparent bg-clip-text">
            How it Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to start delivering or sending packages
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">

        <div className="grid md:grid-cols-4 gap-10 relative items-start">
  {steps.map((step, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex flex-col items-center text-center group h-full"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-8 shadow-lg relative z-10 w-full min-h-[400px] flex flex-col justify-between"
      >
        <div className="w-12 h-12 bg-[#007BFF] text-white text-lg font-bold rounded-full flex items-center justify-center mb-3 mx-auto">
          {index + 1}
        </div>
        <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
        <p className="text-gray-700 flex-grow">{step.description}</p>
      </motion.div>

      {index < steps.length - 1 && (
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.2 }}
          className="absolute left-full top-1/2 h-1 w-16 bg-[#007BFF] hidden md:block"
          style={{ transform: "translateY(-50%)" }}
        />
      )}
    </motion.div>
  ))}
</div>



          {/* Image Section Adjusted */}
          <div className="mt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Image
                src="/How_It_Works.png"
                alt="How PeerShip Works"
                width={600}
                height={450}
                className="mx-auto rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;