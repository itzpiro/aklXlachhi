import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion";
import SecretCodeCard from "./SecretCodeCard";

export default function Cards({
  setMusicPlaying,
  handleShowMainContent,
}) {
  const [cardState, setCardState] = useState("initial");
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const goToMainQuestion = () => setCardState("mainQuestion");

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();

    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        {cardState === "initial" && (
          <QuestionCard
            key="initial-card"
            emoji="💙"
            question="At first, I want to ask you something before we go ahead..."
            showButtons={false}
            btnText="Click here to know"
            onAnswer={() => {
              setCardState("mainQuestion");
              setMusicPlaying(true);
            }}
          />
        )}

        {cardState === "mainQuestion" && (
          <QuestionCard
            key="main-question"
            emoji="🥰"
            question="Can you be mine forever? 💙"
            onAnswer={(answer) => {
              if (answer) {
                setCardState("yesResponse");
                setShowConfetti(true);
              } else {
                setCardState("areYouSure");
              }
            }}
          />
        )}

        {cardState === "yesResponse" && (
          <QuestionCard
            key="yes-response"
            emoji="💙"
            question="Yesss! You always make my heart smile! I'm so lucky to have you in my life."
            showButtons={false}
            btnText="More love ahead"
            onAnswer={() => setCardState("secretCode")}
          />
        )}

        {cardState === "secretCode" && (
          <SecretCodeCard onCorrect={handleShowMainContent} />
        )}

        {cardState === "areYouSure" && (
          <QuestionCard
            key="are-you-sure"
            emoji="🙃"
            question="Are you sure?"
            onAnswer={(answer) => {
              if (answer) {
                setCardState("finalNoResponse");
              } else {
                goToMainQuestion();
              }
            }}
          />
        )}

        {cardState === "finalNoResponse" && (
          <QuestionCard
            key="final-no-response"
            emoji="🥺"
            question="Oh no! You can't really say no to this! You're already mine. Go back and make the right choice!"
            showButtons={false}
            btnText="Go back"
            onAnswer={goToMainQuestion}
          />
        )}

        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={500}
            recycle={false}
            colors={[
              "#3B82F6", // Blue
              "#60A5FA", // Sky Blue
              "#93C5FD", // Light Blue
              "#818CF8", // Indigo
              "#A5B4FC", // Soft Indigo
              "#DBEAFE", // Very Light Blue
              "#FFFFFF", // White
            ]}
            confettiSource={{
              x: windowSize.width / 2,
              y: windowSize.height / 2,
              w: 0,
              h: 0,
            }}
            initialVelocityX={{
              min: -7,
              max: 7,
            }}
            initialVelocityY={{
              min: -7,
              max: 7,
            }}
            gravity={0.015}
            tweenDuration={5000}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}