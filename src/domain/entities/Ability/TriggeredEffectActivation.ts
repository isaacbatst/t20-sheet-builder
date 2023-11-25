import {type Attributes} from '../Sheet';
import {type CharacterSkill} from '../Skill/CharacterSkill';
import {type TriggeredEffectName} from './TriggeredEffectName';

export type SpecialAttackActivation = {
	effectName: TriggeredEffectName.specialAttack;
	bonus?: 'attack' | 'damage' | 'both';
	mana?: number;
};

export type AudacityActivation = {
	effectName: TriggeredEffectName.audacity;
	attributes: Attributes;
};

export type BulwarkActivation = {
	effectName: TriggeredEffectName.bulwark;
};

export type IngenuityActivation = {
	effectName: TriggeredEffectName.ingenuity;
};

export type SpecialistActivation = {
	effectName: TriggeredEffectName.specialist;
	skill: CharacterSkill;
};

export type TriggeredEffectActivation =
	| SpecialAttackActivation
	| AudacityActivation
	| BulwarkActivation
	| IngenuityActivation
	| SpecialistActivation;
