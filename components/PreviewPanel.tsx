import React, { useState } from "react";
import { Section, HeroSection, ContentBlockSection, FeaturesGridSection } from "../types";
import { FONT_OPTIONS } from "../constants";

interface PreviewPanelProps {
  sections: Section[];
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  sections,
}) => {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const getFontFamily = (fontName: string) => {
    return (
      FONT_OPTIONS.find((f) => f.value === fontName)?.class || "font-sans"
    );
  };

  // --- Renderers ---

  const renderHero = (section: HeroSection) => (
    <section 
        className="p-8 @lg:p-12 border-b border-transparent"
        style={{ backgroundColor: section.styles.backgroundColor }}
    >
        <div className="max-w-xl mx-auto flex flex-col items-center text-center">
            {/* Image on top for Hero */}
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-lg bg-slate-200 relative group">
                {section.imageUrl ? (
                <img
                    src={section.imageUrl}
                    alt="Produto"
                    className="w-full h-full object-cover"
                />
                ) : (
                <div className="flex items-center justify-center w-full h-full text-slate-400">
                    <span className="material-symbols-outlined text-5xl">image</span>
                </div>
                )}
            </div>
            <h2
                className={`font-bold mb-4 leading-tight ${getFontFamily(section.styles.fontFamily)}`}
                style={{
                    fontSize: `${section.styles.fontSize}px`,
                    color: section.styles.color,
                }}
            >
                {section.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base @lg:text-lg leading-relaxed mb-6 font-inter opacity-90">
                {section.description}
            </p>
        </div>
    </section>
  );

  const renderContentBlock = (section: ContentBlockSection) => (
    <section 
        className="p-8 @lg:p-16 border-b border-transparent"
        style={{ backgroundColor: section.styles.backgroundColor }}
    >
        {/* Usando Container Queries (@lg:) ao invés de Media Queries (md:) */}
        <div className={`max-w-5xl mx-auto flex flex-col @lg:flex-row items-center gap-8 @lg:gap-16 ${section.reverseLayout ? '@lg:flex-row-reverse' : ''}`}>
            {/* Text Side */}
            <div className="flex-1 text-center @lg:text-left">
                <h3
                    className={`font-bold mb-4 leading-tight uppercase tracking-tight ${getFontFamily(section.styles.fontFamily)}`}
                    style={{
                        fontSize: `${section.styles.fontSize}px`,
                        color: section.styles.color,
                    }}
                >
                    {section.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-inter opacity-90">
                    {section.description}
                </p>
            </div>
            {/* Image Side */}
            <div className="flex-1 w-full">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-slate-200 relative">
                     {section.imageUrl ? (
                        <img
                            src={section.imageUrl}
                            alt={section.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-slate-400 bg-slate-100 dark:bg-slate-800">
                            <span className="material-symbols-outlined text-4xl">image</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
  );

  const renderFeaturesGrid = (section: FeaturesGridSection) => (
    <section 
        className="p-8 @lg:p-16 border-b border-transparent"
        style={{ backgroundColor: section.styles.backgroundColor }}
    >
        <div className="max-w-5xl mx-auto">
             <h3
                className={`text-center font-bold mb-10 ${getFontFamily(section.styles.fontFamily)}`}
                style={{
                  fontSize: `${section.styles.fontSize}px`,
                  color: section.styles.color,
                }}
              >
                {section.title}
            </h3>
            {/* Grid responsivo via Container Queries */}
            <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
                {section.items.map(item => (
                    <div key={item.id} className="bg-white/50 dark:bg-black/20 rounded-xl p-6 flex flex-col items-center text-center border border-slate-100 dark:border-white/5 shadow-sm">
                         {item.imageUrl ? (
                            <img src={item.imageUrl} alt="" className="w-16 h-16 object-contain mb-4 opacity-90" />
                         ) : (
                            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 mb-4 flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400">star</span>
                            </div>
                         )}
                         <h4 className="font-bold text-slate-800 dark:text-white mb-2">{item.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );

  return (
    <div className="h-full">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-[calc(100vh-160px)] sticky top-24 overflow-hidden">
        {/* Preview Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-sm">
              preview
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Live Preview
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-200 dark:bg-slate-800 rounded p-1 transition-all">
              <button
                onClick={() => setViewMode("mobile")}
                className={`p-1.5 rounded transition-all ${
                  viewMode === "mobile"
                    ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm"
                    : "text-slate-400"
                }`}
                title="Visualização Mobile"
              >
                <span className="material-symbols-outlined text-sm">
                  smartphone
                </span>
              </button>
              <button
                onClick={() => setViewMode("desktop")}
                className={`p-1.5 rounded transition-all ${
                  viewMode === "desktop"
                    ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm"
                    : "text-slate-400"
                }`}
                title="Visualização Desktop"
              >
                <span className="material-symbols-outlined text-sm">
                  desktop_windows
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview Content Area */}
        <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-4 overflow-hidden flex justify-center">
          {/* Adicionando @container aqui para ativar as Container Queries */}
          <div
            className={`bg-white dark:bg-slate-900 h-full rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-y-auto custom-scrollbar transition-all duration-300 @container ${
              viewMode === "mobile" ? "w-[375px]" : "w-full"
            }`}
          >
            {sections.map(section => (
                <div key={section.id}>
                    {section.type === 'hero' && renderHero(section as HeroSection)}
                    {section.type === 'content-block' && renderContentBlock(section as ContentBlockSection)}
                    {section.type === 'features-grid' && renderFeaturesGrid(section as FeaturesGridSection)}
                </div>
            ))}
            
            {sections.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                    <span className="material-symbols-outlined text-4xl mb-2">web_asset_off</span>
                    <p>Nenhuma seção adicionada. Use o editor para começar.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
