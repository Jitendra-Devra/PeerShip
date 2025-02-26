import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "John D.",
    role: "Regular User",
    image: "/placeholder.svg",
    content:
      "PeerShip has transformed my daily commute into a profitable venture. The platform is incredibly easy to use!",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "Business Owner",
    image: "/placeholder.svg",
    content:
      "As a small business owner, PeerShip has revolutionized how we handle local deliveries. Fast, reliable, and cost-effective.",
    rating: 5,
  },
  {
    name: "Michael R.",
    role: "Delivery Partner",
    image: "/placeholder.svg",
    content:
      "I've been earning extra income during my regular commute. The platform is secure and the support team is excellent.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#007BFF] to-[#28A745] text-transparent bg-clip-text">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust PeerShip
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col transition-all duration-300 
              hover:shadow-2xl hover:shadow-blue-500/50"
            >
              <div className="flex items-center mb-4 justify-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-center">{review.content}</p>
              <div className="flex gap-1 justify-center">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#007BFF] text-[#007BFF]" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;