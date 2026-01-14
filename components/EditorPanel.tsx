import React, { useState } from "react";
import { Section, HeroSection, ContentBlockSection, FeaturesGridSection, FeatureItem } from "../types";
import { StyleToolbar } from "./StyleToolbar";

interface EditorPanelProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  sections,
  setSections,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  // --- Actions ---

  const handleUpdateSection = (id: string, updates: Partial<Section>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  const handleDuplicate = (section: Section) => {
    const newSection = {
      ...section,
      id: `section-${Date.now()}`,
    };
    setSections((prev) => [...prev, newSection]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta seção?")) {
      setSections((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newSections[targetIndex];
    newSections[targetIndex] = newSections[index];
    newSections[index] = temp;
    setSections(newSections);
  };

  const handleAddSection = (type: Section['type']) => {
    const baseId = `section-${Date.now()}`;
    let newSection: Section;

    if (type === 'hero') {
      newSection = {
        id: baseId,
        type: 'hero',
        title: "Novo Título Principal",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        description: "Adicione uma descrição impactante aqui.",
        buttonText: "Saiba Mais",
        styles: { fontFamily: 'Inter', fontSize: 32, color: '#0f172a', backgroundColor: '#ffffff' }
      } as HeroSection;
    } else if (type === 'content-block') {
      newSection = {
        id: baseId,
        type: 'content-block',
        title: "Destaque do Produto",
        description: "Descreva os benefícios e detalhes desta funcionalidade incrível.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        reverseLayout: false,
        styles: { fontFamily: 'Inter', fontSize: 24, color: '#0f172a', backgroundColor: '#f8fafc' }
      } as ContentBlockSection;
    } else {
      newSection = {
        id: baseId,
        type: 'features-grid',
        title: "Recursos Adicionais",
        items: [
            { id: '1', title: 'Recurso 1', description: 'Descrição curta', imageUrl: '' }
        ],
        styles: { fontFamily: 'Inter', fontSize: 24, color: '#0f172a', backgroundColor: '#ffffff' }
      } as FeaturesGridSection;
    }

    setSections(prev => [...prev, newSection]);
    setShowAddMenu(false);
  };

  // --- Specific Editors ---

  const renderHeroEditor = (section: HeroSection) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">Título</label>
          <input
            className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 text-sm text-slate-900 dark:text-white"
            type="text"
            value={section.title}
            onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">URL Imagem</label>
          <input
            className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 text-sm text-slate-900 dark:text-white"
            type="text"
            value={section.imageUrl}
            onChange={(e) => handleUpdateSection(section.id, { imageUrl: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase">Descrição</label>
        <textarea
          className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 text-sm text-slate-900 dark:text-white"
          rows={2}
          value={section.description}
          onChange={(e) => handleUpdateSection(section.id, { description: e.target.value })}
        ></textarea>
      </div>
    </div>
  );

  const renderContentBlockEditor = (section: ContentBlockSection) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
         <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Layout:</span>
         <div className="flex bg-white dark:bg-slate-800 rounded p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <button
                onClick={() => handleUpdateSection(section.id, { reverseLayout: false })}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${!section.reverseLayout ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
                Texto | Imagem
            </button>
            <button
                onClick={() => handleUpdateSection(section.id, { reverseLayout: true })}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${section.reverseLayout ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
            >
                Imagem | Texto
            </button>
         </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">Título</label>
          <input
            className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 text-sm text-slate-900 dark:text-white"
            type="text"
            value={section.title}
            onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
          />
        </div>
         <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">URL Imagem</label>
          <input
            className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 text-sm text-slate-900 dark:text-white"
            type="text"
            value={section.imageUrl}
            onChange={(e) => handleUpdateSection(section.id, { imageUrl: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase">Descrição</label>
        <textarea
          className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 text-sm text-slate-900 dark:text-white"
          rows={3}
          value={section.description}
          onChange={(e) => handleUpdateSection(section.id, { description: e.target.value })}
        ></textarea>
      </div>
    </div>
  );

  const renderFeaturesEditor = (section: FeaturesGridSection) => {
    const updateItem = (itemId: string, field: keyof FeatureItem, value: string) => {
        const newItems = section.items.map(item => item.id === itemId ? { ...item, [field]: value } : item);
        handleUpdateSection(section.id, { items: newItems });
    };

    const addItem = () => {
        const newItem: FeatureItem = { id: Date.now().toString(), title: "Novo Item", description: "", imageUrl: "" };
        handleUpdateSection(section.id, { items: [...section.items, newItem] });
    };

    const removeItem = (itemId: string) => {
        handleUpdateSection(section.id, { items: section.items.filter(i => i.id !== itemId) });
    };

    return (
        <div className="space-y-4">
             <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Título da Seção</label>
                <input
                    className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary px-3 py-2 text-sm text-slate-900 dark:text-white"
                    type="text"
                    value={section.title}
                    onChange={(e) => handleUpdateSection(section.id, { title: e.target.value })}
                />
             </div>
             <div className="space-y-3">
                 {section.items.map(item => (
                    <div key={item.id} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/30 dark:bg-slate-800/20 relative group/item">
                         <button
                            onClick={() => removeItem(item.id)}
                            className="absolute -right-2 -top-2 bg-red-100 text-red-500 rounded-full p-0.5 opacity-0 group-hover/item:opacity-100 transition-opacity"
                            title="Remover item"
                         >
                           <span className="material-symbols-outlined text-sm block">close</span>
                         </button>
                        <div className="grid grid-cols-2 gap-2">
                             <input
                                className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-900 dark:text-white"
                                placeholder="Título"
                                value={item.title}
                                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                            />
                            <input
                                className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-900 dark:text-white"
                                placeholder="URL Imagem"
                                value={item.imageUrl}
                                onChange={(e) => updateItem(item.id, 'imageUrl', e.target.value)}
                            />
                        </div>
                    </div>
                 ))}
                 <button onClick={addItem} className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                    <span className="material-symbols-outlined text-sm">add</span> Adicionar Item
                 </button>
             </div>
        </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 pb-20">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-2">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">layers</span>
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              Editor de Seções
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
            {sections.length} seções
          </span>
        </div>
      </div>

      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
             <div className="section-card group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all overflow-hidden">
                <StyleToolbar
                    styles={section.styles}
                    onUpdate={(newStyles) => handleUpdateSection(section.id, { styles: newStyles })}
                    onDuplicate={() => handleDuplicate(section)}
                    onDelete={() => handleDelete(section.id)}
                    onMoveUp={() => handleMove(index, 'up')}
                    onMoveDown={() => handleMove(index, 'down')}
                    isFirst={index === 0}
                    isLast={index === sections.length - 1}
                />
                <div className="p-5 relative">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">
                            {section.type === 'hero' ? 'branding_watermark' : section.type === 'content-block' ? 'article' : 'grid_view'}
                        </span>
                        {section.type === 'hero' ? 'Hero Banner' : section.type === 'content-block' ? 'Bloco de Conteúdo' : 'Grid de Features'}
                    </h3>
                    
                    {section.type === 'hero' && renderHeroEditor(section as HeroSection)}
                    {section.type === 'content-block' && renderContentBlockEditor(section as ContentBlockSection)}
                    {section.type === 'features-grid' && renderFeaturesEditor(section as FeaturesGridSection)}

                </div>
             </div>
             <div className="drop-zone" title="Solte aqui para mover"></div>
        </React.Fragment>
      ))}

      <div className="relative">
          {showAddMenu ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
                  <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3 text-center">Escolha o tipo de seção</h3>
                  <div className="grid grid-cols-3 gap-3">
                      <button onClick={() => handleAddSection('hero')} className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-lg hover:ring-2 hover:ring-primary transition-all shadow-sm">
                          <span className="material-symbols-outlined text-primary">branding_watermark</span>
                          <span className="text-xs font-medium">Hero (Banner)</span>
                      </button>
                      <button onClick={() => handleAddSection('content-block')} className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-lg hover:ring-2 hover:ring-primary transition-all shadow-sm">
                           <span className="material-symbols-outlined text-purple-500">article</span>
                           <span className="text-xs font-medium">Bloco (Txt/Img)</span>
                      </button>
                      <button onClick={() => handleAddSection('features-grid')} className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-slate-900 rounded-lg hover:ring-2 hover:ring-primary transition-all shadow-sm">
                           <span className="material-symbols-outlined text-orange-500">grid_view</span>
                           <span className="text-xs font-medium">Grid Features</span>
                      </button>
                  </div>
                  <button onClick={() => setShowAddMenu(false)} className="w-full mt-3 text-xs text-slate-500 hover:text-red-500 py-2">Cancelar</button>
              </div>
          ) : (
            <button 
                onClick={() => setShowAddMenu(true)}
                className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-primary hover:border-primary hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all flex flex-col items-center justify-center gap-1 group"
            >
                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
                add_circle_outline
                </span>
                <span className="font-semibold text-sm">Adicionar Nova Seção</span>
            </button>
          )}
      </div>
    </div>
  );
};
