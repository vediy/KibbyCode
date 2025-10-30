import IrisTransition from "@/components/iris-transition";
import { useGame } from "@/context/gameContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { resetGame, loadGame } = useGame();
  const [hasSave, setHasSave] = useState(false);
  const [showIris, setShowIris] = useState<"in" | "out" | null>(null);

  const handleNewGame = async () => {
    setShowIris("out");
    await resetGame();
  };

  useEffect(() => {
    const checkSave = async () => {
      const saved = await AsyncStorage.getItem("gameState");
      setHasSave(!!saved);
    };
    checkSave();
  }, []);

  const handleContinue = async () => {
    setShowIris("out");
    await loadGame();
    router.push("/game");
  };

  return (
    <View style={styles.container}>
      <Image
          source={require('@/assets/images/kibbycode-logo.png')}
          style={styles.image}
      />
      
      {hasSave && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.newGameButton} onPress={handleNewGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>

      <Text style={styles.creditText}>Created by Ved Iyer</Text>

      {showIris && (
        <IrisTransition
          type={showIris}
          onComplete={() => {
            if (showIris === "out") {
              // Wait a bit to ensure animation finishes
              setTimeout(() => {
                setShowIris(null);
                router.push("/game");
              }, 250);
            }
          }}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dbc5e1",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
  },
  newGameButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  creditText: {
    marginTop: 10,
    color: "black",
    fontSize: 12
  },
  image: {
    width: 600,
    height: 600,
  },
});