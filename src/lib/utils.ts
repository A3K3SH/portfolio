import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Section, SectionWithIndex } from "@/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUniqueTitleSections(sections: Section[]): SectionWithIndex[] {
  return sections.map((section, index) => ({
    title: section.title,
    index
  })).filter((value, index, self) => 
    index === self.findIndex((t) => t.title === value.title)
  );
}
