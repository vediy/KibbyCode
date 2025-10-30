import DialogueBox from "@/components/dialogue-box";
import IrisTransition from "@/components/iris-transition";
import { DialogueLine, dialogues } from "@/constants/dialogue-script";
import { useGame } from "@/context/gameContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


export default function Game() {
  const { state } = useGame();
  const [currentDialogue, setCurrentDialogue] = useState<DialogueLine[]>(dialogues[1] || []);
  const [showDialogue, setShowDialogue] = useState(true);
  const [currentSprite, setCurrentSprite] = useState<any | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const [showIrisIn, setShowIrisIn] = useState(true);
  const MAX_LEVEL = 5;
  const buttonOpacity = useSharedValue(1);


  // Whenever level changes → trigger new dialogue
  useEffect(() => {
    const dialogue = dialogues[state.level];
    if (dialogue) {
      setCurrentDialogue(dialogue);
      setShowDialogue(true);
    }
  }, [state.level]);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowIrisIn(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.level === MAX_LEVEL) {
      buttonOpacity.value = withTiming(0.6, { duration: 600 });
    }
  }, [state.level]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  const { width, height } = Dimensions.get("window");

  const handleUpgradePress = () => setShowPopup(true);
  const handleChallengeStart = () => {
    setShowPopup(false);
    router.push("/questionScreen");
  };

  const buildings = [
    { level: 2, img: require("@/assets/images/building-1.png"), style: { left: 600, bottom: 310, width: width * 0.1, height: height * 0.45, aspectRatio: 1, } },
    { level: 3, img: require("@/assets/images/building-2.png"), style: { left: 900, bottom: 310, width: width * 0.15, height: height * 0.45, aspectRatio: 1,} },
    { level: 4, img: require("@/assets/images/building-3.png"), style: { left: 160, bottom: 150, width: width * 0.1, height: height * 0.45, aspectRatio: 1, } },
    { level: 5, img: require("@/assets/images/building-1.png"), style: { left: 600, bottom: 310, width: width * 0.1, height: height * 0.45, aspectRatio: 1, } },
  ];

  const roads = [
    { level: 2, img: require("@/assets/images/road-horizontal.png"), style: { bottom: 125, left: 560, width: width * 0.2, height: height * 0.2, aspectRatio: 1, } },
    { level: 3, img: require("@/assets/images/road-horizontal.png"), style: { bottom: 125, left: 900, width: width * 0.2, height: height * 0.2, aspectRatio: 1, } },
    { level: 4, img: require("@/assets/images/road-vertical.png"), style: { left: 368, bottom: 0 , width: width * 0.1, height: height * 0.4, aspectRatio: 1, } },
    { level: 4, img: require("@/assets/images/road-vertical.png"), style: { left: 368, bottom: 375 , width: width * 0.1, height: height * 0.4, aspectRatio: 1, } },
    { level: 4, img: require("@/assets/images/road-vertical.png"), style: { left: 368, bottom: 750 , width: width * 0.1, height: height * 0.4, aspectRatio: 1, } },
    { level: 5, img: require("@/assets/images/road-horizontal.png"), style: { bottom: 125, left: 1260, width: width * 0.2, height: height * 0.2, aspectRatio: 1, } },
    { level: 5, img: require("@/assets/images/road-horizontal.png"), style: { bottom: 125, left: 1500, width: width * 0.2, height: height * 0.2, aspectRatio: 1, } },
    { level: 5, img: require("@/assets/images/road-horizontal.png"), style: { bottom: 125, left: 1860, width: width * 0.2, height: height * 0.2, aspectRatio: 1, } },
  ];

  const systems = [
    { level: 3, img: require("@/assets/images/water-tower.png"), style: { right: 40, bottom: 550, width: width * 0.1, height: height * 0.3, aspectRatio: 1, } },
    { level: 5, img: require("@/assets/images/power-plant.png"), style: { right: 300, bottom: 500, width: width * 0.12, height: height * 0.3, aspectRatio: 1, } },
  ];

  return (
      <ImageBackground source={require("@/assets/images/grass.png")} style={styles.background}>
    <View style={styles.container}>
      {showIrisIn && <IrisTransition type="in" />}

      {/* --- Layer 1: Base ground --- */}
      <Image
        source={require("@/assets/images/grass.png")}
        style={styles.baseTerrain}
        resizeMode="cover"
      />

      {/* --- Layer 2: Roads --- */}
      {roads
        .filter((r) => state.level >= r.level)
        .map((r, i) => (
          <Image key={`road-${i}`} source={r.img} style={[styles.road, r.style]} />
        ))}

      {/* --- Layer 3: Buildings --- */}
      {buildings
        .filter((b) => state.level >= b.level)
        .map((b, i) => (
          <Image key={`building-${i}`} source={b.img} style={[styles.building, b.style]} />
        ))}

      {/* --- Layer 4: Systems --- */}
      {systems
        .filter((s) => state.level >= s.level)
        .map((s, i) => (
          <Image key={`system-${i}`} source={s.img} style={[styles.building, s.style]} />
        ))}

      {/* --- HUD Overlay (above city but below dialogue) --- */}
      <View style={styles.hud}>
        <Text style={styles.hudText}>Level: {state.level}</Text>
        <Text style={styles.hudText}>Population: {state.population}</Text>
      </View>

      {currentSprite && (
        <Image
          source={currentSprite}
          style={styles.sprite}
          resizeMode="contain"
        />
      )}

      {showDialogue && (
        <DialogueBox
          dialogue={currentDialogue}
          onFinish={() => setShowDialogue(false)} // hides dialogue
          onSpeakerChange={(sprite) => setCurrentSprite(sprite)} // updates sprite
        />
      )}

      {!showDialogue && (
        <>
          {state.level < MAX_LEVEL ? (
            // Normal upgrade button
            <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradePress}>
              <Text style={styles.upgradeText}>Answer a question!</Text>
            </TouchableOpacity>
          ) : (
            // Disabled gray button
            <Animated.View style={[styles.upgradeButton, animatedButtonStyle]}>
              <Text style={styles.upgradeText}>Max upgrades reached...</Text>
            </Animated.View>
          )}
        </>
      )}

        {/* Popup */}
        <Modal visible={showPopup} transparent animationType="fade">
          <View style={styles.popupContainer}>
            <View style={styles.popup}>
              <Text style={styles.popupText}>
                New upgrade avaliable...
              </Text>
              <TouchableOpacity style={styles.popupButton} onPress={handleChallengeStart}>
                <Text style={styles.popupButtonText}>Answer for upgrade!</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPopup(false)}>
                <Text style={{ color: "white", marginTop: 10 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  spriteWrapper: {
    position: 'absolute',
  },
  sprite: {
    width: 600,
    height: 600,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseTerrain: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 300,
  },
  building: {
    flex: 1,
    position: "absolute",
  },
  road: {
    flex: 1,
    position: "absolute",
  },
  hud: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  hudText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textShadowColor: "black",
    textShadowRadius: 4,
  },
  upgradeButton: {
    backgroundColor: "#00ffaaff",
    paddingVertical: 24,
    paddingHorizontal: 50,
    elevation: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  upgradeText: {
    color: "#001c33ff",
    fontWeight: "bold",
    fontSize: 30,
  },
  disabledButton: {
    backgroundColor: "#888", // gray tone
    opacity: 0.9,
    paddingVertical: 24,
    paddingHorizontal: 50,
    elevation: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledText: {
    color: "#ddd",
    fontWeight: "bold",
    fontSize: 30,
  },
  popupContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    backgroundColor: "#222",
    padding: 25,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  popupText: { color: "white", fontSize: 16, textAlign: "center", marginBottom: 20 },
  popupButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  popupButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});