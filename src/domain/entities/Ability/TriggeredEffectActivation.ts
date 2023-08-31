import {type Attributes} from '../Sheet';
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

export type TriggeredEffectActivation =
	| SpecialAttackActivation
	| AudacityActivation
	| BulwarkActivation;
