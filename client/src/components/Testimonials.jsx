// src/components/Testimonials.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "./motionVariants";
import { useTheme } from "@/contexts/ThemeContext";

const items = [
  {
    quote: "Richard’s art captured my mother’s smile perfectly — it brought tears to our eyes.",
    name: "Chipo M.",
    title: "Lusaka, Zambia",
  },
  {
    quote: "A true master of pencil and soul — his portraits feel alive.",
    name: "Daniel K.",
    title: "Art Collector",
  },
  {
    quote: "Every piece tells a story. You don’t just see it, you feel it.",
    name: "Lina P.",
    title: "Client",
  },
];

const Testimonials = () => {
  const { isDark } = useTheme();
  const reduce = useReducedMotion();

  const titleClass = isDark ? "text-white" : "text-black";

  return (
    <section className={`py-16 px-6 md:px-20 transition-colors duration-300 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <motion.h2
        className={`text-3xl md:text-4xl font-serif font-bold text-center mb-10 ${titleClass}`}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        variants={fadeUp}
        transition={{ duration: 0.56, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        What People Say
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.article
            key={i}
            className={`p-6 rounded-2xl shadow-lg transition-colors duration-300 ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-pink-50"}`}
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            variants={fadeUp}
            transition={{ delay: i * 0.14, duration: 0.5 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={reduce ? {} : { translateY: -6 }}
          >
            <p className="italic mb-4">“{t.quote}”</p>
            <h4 className="font-semibold">{t.name}</h4>
            <p className="text-sm opacity-75">{t.title}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
