import React from "react";
import { Section, HeroSection, ContentBlockSection, FeaturesGridSection } from "../types";
import { StyleToolbar } from "./StyleToolbar";

interface SectionCardProps {
  section: Section;
  index: number;
  total: number;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  onDuplicate: (section: Section) => void;
  onDelete: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  renderHeroEditor: (section: HeroSection) => React.ReactNode;
  renderContentBlockEditor: (section: ContentBlockSection) => React.ReactNode;
  renderFeaturesEditor: (section: FeaturesGridSection) => React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  index,
  total,
  onUpdateSection,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  renderHeroEditor,
  renderContentBlockEditor,
  renderFeaturesEditor,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-2">
      <StyleToolbar
        styles={section.styles}
        onUpdate={(newStyles) => onUpdateSection(section.id, { styles: newStyles })}
        onDelete={() => onDelete(section.id)}
        onDuplicate={() => onDuplicate(section)}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        isFirst={index === 0}
        isLast={index === total - 1}
      />
      <div className="p-4">
        {section.type === "hero" && renderHeroEditor(section as HeroSection)}
        {section.type === "content-block" && renderContentBlockEditor(section as ContentBlockSection)}
        {section.type === "features-grid" && renderFeaturesEditor(section as FeaturesGridSection)}
      </div>
    </div>
  );
};