import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const floatY: Variants = {
  hover: { y: [-4, 4, -4], transition: { duration: 3, ease: "easeInOut", repeat: Infinity } },
};
