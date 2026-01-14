export interface StyleState {
  fontFamily: string;
  fontSize: number;
  color: string;
  backgroundColor?: string;
}

export type SectionType = 'hero' | 'content-block' | 'features-grid';

export interface BaseSection {
  id: string;
  type: SectionType;
  styles: StyleState;
}

export interface HeroSection extends BaseSection {
  type: 'hero';
  title: string;
  imageUrl: string;
  description: string;
  buttonText: string; // Added back optionally if needed, or kept empty
}

export interface ContentBlockSection extends BaseSection {
  type: 'content-block';
  title: string;
  description: string;
  imageUrl: string;
  reverseLayout: boolean; // Controls Image | Text vs Text | Image
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface FeaturesGridSection extends BaseSection {
  type: 'features-grid';
  title: string;
  items: FeatureItem[];
}

export type Section = HeroSection | ContentBlockSection | FeaturesGridSection;
