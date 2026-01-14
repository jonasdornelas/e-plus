import React, { useState, useEffect } from "react";
import { INITIAL_SECTIONS } from "./constants";
import { Section } from "./types";
import { EditorPanel } from "./components/EditorPanel";
import { PreviewPanel } from "./components/PreviewPanel";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);

  // Handle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-2 rounded-lg text-white flex items-center justify-center">
              <span className="material-symbols-outlined">drag_indicator</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Builder Dashboard
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Gerencie e organize as seções da sua Landing Page
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span className="material-symbols-outlined">
                {darkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button 
                className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm"
                onClick={() => alert("Publicado com sucesso! (Simulação)")}
            >
              <span className="material-symbols-outlined text-sm">
                rocket_launch
              </span>
              Publicar Página
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EditorPanel
            sections={sections}
            setSections={setSections}
          />
          <PreviewPanel sections={sections} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-12 border-t border-slate-200 dark:border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="material-symbols-outlined">auto_fix_high</span>
              <span>PageBuilder Pro</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2024 Design System Editor. Drag, drop, duplicate, and publish.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
