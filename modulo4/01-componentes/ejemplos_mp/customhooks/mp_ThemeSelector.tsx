import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "day" | "night";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
  day: {
    background: "#f5f7fa",
    text: "#2c3e50",
    primary: "#3498db",
    secondary: "#2ecc71",
    accent: "#f39c12",
  },
  night: {
    background: "#1a1a2e",
    text: "#ecf0f1",
    primary: "#3498db",
    secondary: "#2ecc71",
    accent: "#e74c3c",
  },
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("transport-theme");
    return (saved as Theme) || "day";
  });

  useEffect(() => {
    localStorage.setItem("transport-theme", theme);
    document.body.style.backgroundColor = themeColors[theme].background;
    document.body.style.color = themeColors[theme].text;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "day" ? "night" : "day"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser usado dentro de un ThemeProvider");
  }
  return context;
};

const mp_ThemeSelector: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeSelectorContent />
    </ThemeProvider>
  );
};

const ThemeSelectorContent: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <div
      style={{
        padding: "20px",
        border: `2px solid ${colors.primary}`,
        borderRadius: "10px",
        maxWidth: "500px",
        backgroundColor: colors.background,
        color: colors.text,
        transition: "all 0.3s ease",
      }}
    >
      <h2>🌓 Selector de Tema - Transporte</h2>
      <p>Cambia entre modo día y noche para la aplicación de transporte</p>

      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: theme === "day" ? colors.primary : "#333",
            color: "white",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            opacity: theme === "day" ? 1 : 0.5,
            transition: "all 0.3s ease",
          }}
          onClick={() => theme !== "day" && toggleTheme()}
        >
          <div style={{ fontSize: "32px" }}>☀️</div>
          <div style={{ fontWeight: "bold" }}>Modo Día</div>
          <div style={{ fontSize: "12px" }}>Operación normal</div>
        </div>

        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: theme === "night" ? "#8e44ad" : "#333",
            color: "white",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            opacity: theme === "night" ? 1 : 0.5,
            transition: "all 0.3s ease",
          }}
          onClick={() => theme !== "night" && toggleTheme()}
        >
          <div style={{ fontSize: "32px" }}>🌙</div>
          <div style={{ fontWeight: "bold" }}>Modo Noche</div>
          <div style={{ fontSize: "12px" }}>Servicio nocturno</div>
        </div>
      </div>

      <div style={{ padding: "16px", backgroundColor: colors.primary + "20", borderRadius: "8px" }}>
        <h3 style={{ margin: "0 0 12px 0" }}>🚌 Simulación de Interfaz</h3>
        <div
          style={{
            padding: "12px",
            backgroundColor: colors.background,
            border: `1px solid ${colors.primary}`,
            borderRadius: "6px",
            marginBottom: "8px",
          }}
        >
          <strong>Próximo bus:</strong> Ruta 1 - Centro
        </div>
        <div
          style={{
            padding: "12px",
            backgroundColor: colors.secondary + "20",
            borderRadius: "6px",
          }}
        >
          <strong>Estado:</strong> ✅ A tiempo
        </div>
      </div>

      <div style={{ marginTop: "16px", fontSize: "14px", color: colors.text + "99" }}>
        Tema actual: <strong>{theme === "day" ? "☀️ Día" : "🌙 Noche"}</strong>
      </div>
    </div>
  );
};

export default mp_ThemeSelector;
