// src/components/CreativeProcess.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { scaleIn, fadeUp } from "./motionVariants";
import { useTheme } from "@/contexts/ThemeContext";

const steps = [
  {
    title: "Concept & Sketch",
    desc: "Every artwork begins with a pencil sketch.",
    videoUrl: "https://www.youtube.com/embed/LtL1Brf2N2Q?si=5kiaa0iGFafYxGMC", //YouTube link
  },
  {
    title: "Layering & Detailing",
    desc: "Through patience and precision, each stroke adds emotion and life.",
    videoUrl: "https://www.youtube.com/embed/Fa9CNQ_9bk8?si=Phxb5gFSrei5oQ4n",
  },
  {
    title: "Finishing Touches",
    desc: "I bring depth and contrast to complete a story worth framing.",
    videoUrl: "https://www.youtube.com/embed/u3-U0gSWyA4?si=Yu-Vga-nEG2U-M2Q",
  },
];

const CreativeProcess = () => {
  const { isDark } = useTheme();
  const reduce = useReducedMotion();
  const titleClass = isDark ? "text-white" : "text-black";

  return (
    <section
      className={`py-16 px-6 md:px-20 transition-colors duration-300 ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <motion.h2
        className={`text-3xl md:text-4xl font-serif font-bold text-center mb-12 ${titleClass}`}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        My Creative Process
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 text-center">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
              isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-pink-50"
            }`}
            initial={reduce ? undefined : "hidden"}
            whileInView={reduce ? undefined : "visible"}
            variants={scaleIn}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            viewport={{ once: true, amount: 0.25 }}
            whileHover={reduce ? {} : { scale: 1.02 }}
          >
            <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-sm md:text-base mb-4">{s.desc}</p>

            {/* YouTube video */}
            <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-md">
              <iframe
                src={s.videoUrl}
                title={s.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              ></iframe>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CreativeProcess;
