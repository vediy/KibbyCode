import { Question, questionBank } from "@/constants/question-bank";
import { useGame } from "@/context/gameContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuestionScreen() {
  const router = useRouter();
  const { state, upgradeCity } = useGame();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  // Pick a random question for the current level
  useEffect(() => {
    const levelQuestions = questionBank[state.level];
    if (!levelQuestions || levelQuestions.length === 0) {
      Alert.alert("No questions available for this level!");
      router.back();
      return;
    }

    const randomIndex = Math.floor(Math.random() * levelQuestions.length);
    setCurrentQuestion(levelQuestions[randomIndex]);
  }, [state.level]);

  const handleAnswer = (index: number) => {
    if (answered) return; // prevent double answers
    setSelected(index);
    setAnswered(true);

    const isCorrect = index === currentQuestion?.correct;

    setTimeout(() => {
      if (isCorrect) {
        Alert.alert("Correct!", "Your city grows...");
        upgradeCity(); // increase level in context
        router.back(); // go back to city view
      } else {
        Alert.alert("Oof, tough luck!", "Try again next time!");
        router.back();
      }
    }, 700);
  };

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading question...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option, index) => {
        const isSelected = selected === index;
        const isCorrect = index === currentQuestion.correct;
        const backgroundColor =
          answered && isSelected
            ? isCorrect
              ? "#28a745"
              : "#dc3545"
            : "#007bff";

        return (
          <TouchableOpacity
            key={index}
            style={[styles.option, { backgroundColor }]}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    padding: 20,
  },
  question: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#007bff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
  },
  optionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  loading: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});