import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto min-h-[650px] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#007BFF] to-[#28A745] text-transparent bg-clip-text">
            About Us
          </h2>
        </motion.div>

        {/* Two Boxes */}
        <div className="grid md:grid-cols-2 gap-12 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(0, 123, 255, 0.15)",
              transition: { duration: 0.3 },
            }}
            className="space-y-6 mx-auto text-center p-8 rounded-xl transition duration-300"
          >
            <h3 className="text-xl md:text-xl font-bold mb-4 text-[#007BFF]">
              Connecting Travelers & Senders for Smarter Deliveries
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed font-medium mb-3">
              At Peership, we believe in making deliveries faster, cheaper, and
              more efficient by connecting people who are already on the move
              with those who need to send something urgently.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              Whether you're a traveler looking to earn extra money on your
              journey or a sender searching for a quick, affordable delivery
              solution, Peership makes it easy for you to connect
              and collaborate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(40, 167, 69, 0.2)",
              transition: { duration: 0.3 },
            }}
            className="bg-[#28A745] text-white p-8 rounded-xl mx-auto text-center transition duration-300"
          >
            <h3 className="text-xl md:text-xl font-bold mb-6">Our Mission</h3>
            <p className="text-white/90 text-lg leading-relaxed font-medium">
              Our goal is simple: to make package delivery more accessible,
              affordable, and efficient. We believe in a world where sending
              something doesn’t have to be complicated or expensive. By
              utilizing existing travel plans, we help people save time, reduce
              costs, and promote sustainability by making the most of journeys
              that are already happening.
            </p>
          </motion.div>
        </div>

        {/* New Centered Box Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(0, 86, 179, 0.3)",
            transition: { duration: 0.3 },
          }}
          className="bg-[#0056b3] text-white p-8 rounded-xl mx-auto text-center mt-12 max-w-2xl transition duration-300"
        >
          <h3 className="text-xl md:text-xl font-bold mb-4">Join Our Growing Community
          </h3>
          <p className="text-white/90 text-lg leading-relaxed font-medium">
          Whether you're a frequent traveler looking to make extra income or someone needing a fast, budget-friendly delivery, Peership is the perfect solution for you.

🚀 Start your journey with Peership today
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
