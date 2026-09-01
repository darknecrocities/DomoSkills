import { Category, Skill, SourceRepository } from '@domoskills/validators';
import categoriesData from './data/categories.json';
import repositoriesData from './data/repositories.json';
import skillsData from './data/skills.json';

export const SEED_CATEGORIES: Category[] = categoriesData as unknown as Category[];
export const SEED_REPOSITORIES: Record<string, SourceRepository> = repositoriesData as unknown as Record<string, SourceRepository>;
export const SEED_SKILLS: Skill[] = skillsData as unknown as Skill[];
