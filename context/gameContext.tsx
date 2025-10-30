import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface GameState {
  level: number;
  coins: number;
  population: number;
  cityName?: string; // 🏙️ new field
}

interface GameContextType {
  state: GameState;
  upgradeCity: () => void;
  resetGame: () => void;
  loadGame: () => Promise<void>;
  setCityName: (name : string) => void;
}

const defaultState: GameState = {
  level: 1,
  coins: 0,
  population: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GameState>(defaultState);
    const [isResetting, setIsResetting] = useState(false);

    // Save progress whenever state changes — but not if resetting
    useEffect(() => {
    if (!isResetting) {
        AsyncStorage.setItem("gameState", JSON.stringify(state));
    }
    }, [state, isResetting]);

  // Load saved progress
  const loadGame = async () => {
    try {
      const saved = await AsyncStorage.getItem("gameState");
      if (saved) {
        const parsed = JSON.parse(saved);
        setState(parsed);
      }
    } catch (error) {
      console.error("Error loading saved game:", error);
    }
  };

  // Upgrade the city → next level
  const upgradeCity = () => {
    setState((prev) => ({
      ...prev,
      level: prev.level + 1,
      coins: prev.coins + 50,
      population: prev.population + 100,
    }));
  };

  const setCityName = (name: string) => {
    setState((prev) => ({ ...prev, cityName: name }));
    };

    const resetGame = async () => {
        setIsResetting(true);
        await AsyncStorage.removeItem("gameState");
        setState(defaultState);
        setTimeout(() => setIsResetting(false), 300);
    };

  return (
    <GameContext.Provider value={{ state, upgradeCity, resetGame, loadGame, setCityName }}>
        {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};