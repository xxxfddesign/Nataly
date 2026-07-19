"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Небольшой, но запоминающийся экран загрузки: золотая трещина
// "прорисовывается" по монограмме, затем холст раскрывается в стороны.
export function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("asn_intro_seen")) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("asn_intro_seen", "1");
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ivory dark:bg-graphite"
          exit={{
            clipPath: "inset(0% 0% 0% 100%)",
            transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative h-16 w-16">
              <motion.svg
                viewBox="0 0 100 100"
                className="h-full w-full"
                initial="hidden"
                animate="visible"
              >
                <motion.path
                  d="M20 50 Q35 20 50 50 T80 50"
                  stroke="#C9A24C"
                  strokeWidth="2"
                  fill="none"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { duration: 1.1, ease: "easeInOut" },
                    },
                  }}
                />
              </motion.svg>
            </div>
            <p className="font-signature text-2xl text-gold-500">Art by Natalia</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
