import type { DialogueLine } from "@/constants/dialogue-script";
import { useGame } from "@/context/gameContext";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";


interface DialogueBoxProps {
  dialogue: DialogueLine[];
  onFinish?: () => void;
  onSpeakerChange?: (sprite: any | null) => void;
}

export default function DialogueBox({ dialogue, onFinish, onSpeakerChange }: DialogueBoxProps) {
  const { setCityName } = useGame();
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const { state } = useGame();


  const currentLine = dialogue[index];

  // Typing animation
  useEffect(() => {
    if (!currentLine) return;
    if (charIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentLine.text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentLine]);

  // Reset typing and notify speaker change
  useEffect(() => {
    setDisplayedText("");
    setCharIndex(0);
    if (currentLine?.sprite) onSpeakerChange?.(currentLine.sprite);
  }, [index, dialogue]);

  const handleNext = () => {
    if (!currentLine) return;
    if (charIndex < currentLine.text.length) {
      setDisplayedText(currentLine.text);
      setCharIndex(currentLine.text.length);
      return;
    }

    if (currentLine.requiresInput) return; // stop and wait for input

    if (index < dialogue.length - 1) {
      setIndex(index + 1);
    } else {
      onSpeakerChange?.(null);
      onFinish?.();
    }
  };

  const handleSubmitCityName = () => {
    if (inputValue.trim() === "") return;
    setCityName(inputValue.trim());
    setInputValue("");

    
    onSpeakerChange?.(null);
    onFinish?.();
  };

  return (
    <TouchableWithoutFeedback onPress={handleNext}>
      <View style={styles.fullscreen}>
        <View style={styles.box}>
          <Text style={styles.name}>{currentLine?.name}</Text>
          <Text style={styles.dialogue}>
            {displayedText.replace("{cityName}", state.cityName || "your city")}
          </Text>

          {currentLine?.requiresInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter city name..."
                placeholderTextColor="#aaa"
                value={inputValue}
                onChangeText={setInputValue}
              />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitCityName}>
                <Text style={styles.submitText}>Confirm</Text>
              </TouchableOpacity>
            </View>
            )}
        </View>
      </View>
    </TouchableWithoutFeedback>

    
  );
}


const styles = StyleSheet.create({
  fullscreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  box: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderTopWidth: 2,
    borderColor: "#fff",
    padding: 30,
    width: "100%",
  },
  name: {
    color: "#00bfff",
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 38,
  },
  dialogue: {
    color: "white",
    fontSize: 25,
  },
  submitButton: {
    backgroundColor: "#00ffaaff",
    paddingVertical: 18,
    paddingHorizontal: 10,
    elevation: 4,
    borderRadius: 10,
    height: 50,
    width: 85,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  submitText: {
    color: "#001c33ff",
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    color: "white",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 35,
    width: 300,
    marginLeft: 1550,
    marginRight: 10,
    marginBottom: 50,
  },
});