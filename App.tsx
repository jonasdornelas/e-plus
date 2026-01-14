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

  // Função para exportar HTML
  const exportHtml = () => {
    const html = `<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Landing Page Exportada</title>\n  <link href='https://fonts.googleapis.com/css?family=Inter:400,700|Roboto:400,700|Playfair+Display:400,700|Montserrat:400,700|Open+Sans:400,700&display=swap' rel='stylesheet'>\n  <style>body{margin:0;font-family:Inter,Roboto,Arial,sans-serif;background:#f8fafc;}.container{max-width:900px;margin:0 auto;padding:32px 16px;}img{max-width:100%;border-radius:12px;}h1,h2,h3,h4{margin:0 0 16px 0;}section{margin-bottom:48px;background:#fff;border-radius:16px;box-shadow:0 2px 8px #0001;padding:32px;}.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;}.feature-item{background:#f1f5f9;border-radius:12px;padding:20px;text-align:center;}</style>\n</head>\n<body>\n  <div class=\"container\">\n    ${sections.map(section => {\n      if (section.type === 'hero') {\n        return `<section><img src=\"${section.imageUrl}\" alt=\"\" /><h1 style=\"font-family:${section.styles.fontFamily};font-size:${section.styles.fontSize}px;color:${section.styles.color}\">${section.title}</h1><p>${section.description}</p></section>`;\n      }\n      if (section.type === 'content-block') {\n        return `<section style=\"display:flex;flex-wrap:wrap;align-items:center;gap:32px;background:${section.styles.backgroundColor}\">\n          <div style=\"flex:1;min-width:220px\"><h2 style=\"font-family:${section.styles.fontFamily};font-size:${section.styles.fontSize}px;color:${section.styles.color}\">${section.title}</h2><p>${section.description}</p></div>\n          <div style=\"flex:1;min-width:220px\"><img src=\"${section.imageUrl}\" alt=\"\" /></div>\n        </section>`;\n      }\n      if (section.type === 'features-grid') {\n        return `<section><h2 style=\"font-family:${section.styles.fontFamily};font-size:${section.styles.fontSize}px;color:${section.styles.color}\">${section.title}</h2><div class=\"features-grid\">${section.items.map(item => `<div class=\"feature-item\"><img src=\"${item.imageUrl}\" alt=\"\" /><h4>${item.title}</h4></div>`).join('')}</div></section>`;\n      }\n      return '';\n    }).join('')}\n  </div>\n</body>\n</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Atualiza o título da aba
  useEffect(() => {
    document.title = 'Builder Pages';
  }, []);

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
                e-plus Builder
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Crie e-plus para seus anúncios de forma rápida e fácil.
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
                onClick={exportHtml}
            >
              <span className="material-symbols-outlined text-sm">
                download
              </span>
              Exportar HTML
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
              <span>Page Builder</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 Aplicação para edição de páginas e exportação de HTML.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
