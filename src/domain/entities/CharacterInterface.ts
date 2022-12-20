import type {Attributes} from './Attributes';
import type {Context} from './Context';
import type {InGameContext} from './InGameContext';
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

export type OtherModifierCondition = (context: InGameContext) => boolean;

export type OtherModifierAdderCharacter = {
	addOtherModifierToDefense(sourceName: string, modifier: number, condition?: OtherModifierCondition): void;
	addOtherModifierToSkill(sourceName: string, modifier: number, skill: SkillNameEnum, condition?: OtherModifierCondition): void;
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

export type Location = {isUnderground: boolean};

export type ContextCharacter = {
	getContext(): Context;
};

export type CharacterInterface = SkilledCharacter
& LeveledCharacter
& AttributesCharacter
& OtherModifierAdderCharacter
& ProgressingCharacter
& RaceCharacter
& DefensibleCharacter
& VisionCharacter
& ContextCharacter;
