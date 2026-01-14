import React from "react";
import { StyleState } from "../types";
import { FONT_OPTIONS } from "../constants";

interface StyleToolbarProps {
  styles: StyleState;
  onUpdate: (newStyles: StyleState) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const StyleToolbar: React.FC<StyleToolbarProps> = ({
  styles,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
      
      {/* Reordering */}
      <div className="flex flex-col gap-0.5 border-r border-slate-200 dark:border-slate-700 pr-2 mr-2">
        <button 
          onClick={onMoveUp} 
          disabled={isFirst}
          className="text-slate-400 hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed hover:bg-slate-200 rounded"
        >
          <span className="material-symbols-outlined text-lg leading-none">expand_less</span>
        </button>
        <button 
          onClick={onMoveDown} 
          disabled={isLast}
          className="text-slate-400 hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed hover:bg-slate-200 rounded"
        >
          <span className="material-symbols-outlined text-lg leading-none">expand_more</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-sm text-slate-400">
          format_size
        </span>
        <select
          className="text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded py-1 px-1 w-24 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-300"
          value={styles.fontFamily}
          onChange={(e) =>
            onUpdate({ ...styles, fontFamily: e.target.value })
          }
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <input
          className="w-12 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded py-1 px-1 focus:ring-primary focus:border-primary text-slate-700 dark:text-slate-300"
          title="Tamanho da fonte"
          type="number"
          value={styles.fontSize}
          onChange={(e) =>
            onUpdate({ ...styles, fontSize: Number(e.target.value) })
          }
        />
        <span className="text-[10px] text-slate-400 font-bold">px</span>
      </div>

      <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-3">
        <div className="flex flex-col items-center group relative">
            <span className="text-[8px] text-slate-400 uppercase font-bold mb-0.5">Texto</span>
            <input
            className="w-6 h-6 rounded border-none bg-transparent cursor-pointer"
            type="color"
            title="Cor do Texto"
            value={styles.color}
            onChange={(e) => onUpdate({ ...styles, color: e.target.value })}
            />
        </div>
        <div className="flex flex-col items-center group relative">
             <span className="text-[8px] text-slate-400 uppercase font-bold mb-0.5">Fundo</span>
             <input
            className="w-6 h-6 rounded border-none bg-transparent cursor-pointer"
            type="color"
            title="Cor do Fundo"
            value={styles.backgroundColor || "#ffffff"}
            onChange={(e) => onUpdate({ ...styles, backgroundColor: e.target.value })}
            />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button
          className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
          title="Duplicar seção"
          onClick={onDuplicate}
        >
          <span className="material-symbols-outlined text-[18px]">
            content_copy
          </span>
        </button>
        <button
          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          title="Excluir seção"
          onClick={onDelete}
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  );
};
