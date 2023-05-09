import {type ContextualModifierInterface} from '../Modifier/ContextualModifier/ContextualModifierInterface';
import {type ModifierInterface} from '../Modifier/ModifierInterface';
import {type SkillName} from '../Skill';
import {type Skill} from '../Skill/Skill';

export type SheetSkillsInterface = {
	trainSkill(name: SkillName): void;
	addContextualModifierTo(skill: SkillName, modifier: ContextualModifierInterface): void;
	addFixedModifierTo(skill: SkillName, modifier: ModifierInterface): void;
	trainIntelligenceSkills(skills: SkillName[]): void;
	getSkills(): Record<SkillName, Skill>;
};
