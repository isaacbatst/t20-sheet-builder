import type {Attributes} from './Attributes';
import type {Defense} from './Defense';
import type {ProgressionStep} from './ProgressionStep';
import type {RaceInterface} from './RaceInterface';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import type {Step} from './StepDescriptionGenerator/StepDescriptionGenerator';
import type {Vision} from './Vision';

export type SkilledCharacter = {
	getTrainedSkills(): SkillNameEnum[];
	getSkills(): Record<SkillNameEnum, Skill>;
	trainSkill(name: string): void;
};

export type LeveledCharacter = {
	getLevel(): number;
};

export type AttributesCharacter = {
	getAttributes(): Attributes;
};

export type OtherModifierAdderCharacter = {
	addOtherModifierToDefense(sourceName: string, modifier: number): void;
	addOtherModifierToSkill(sourceName: string, modifier: number, skill: SkillNameEnum): void;
};

export type ProgressingCharacter = {
	progressionSteps: ProgressionStep[];
	saveStep(step: Step): void;
};

export type RaceCharacter = {
	getRace(): RaceInterface | undefined;
};

export type DefensibleCharacter = {
	getDefenseTotal(): number;
};

export type VisionCharacter = {
	getVision(): Vision;
	setVision(vision: Vision): void;
};

export type InMapCharacter = {
	getTerrain(): {isUnderground: boolean};
};

export type CharacterInterface = SkilledCharacter
& LeveledCharacter
& AttributesCharacter
& OtherModifierAdderCharacter
& ProgressingCharacter
& RaceCharacter
& DefensibleCharacter
& VisionCharacter;
