import type {CharacterInterface} from './CharacterInterface';

export type AbilityEffectType = 'active' | 'passive';

export type AbilityInterface = {
	name: string;
	effectType: AbilityEffectType;
	apply(character: CharacterInterface): void;
};

export abstract class Ability implements AbilityInterface {
	constructor(
		readonly name: string,
		readonly effectType: AbilityEffectType,
	) {}

	abstract apply(character: CharacterInterface): void;
}
