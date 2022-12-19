import type {Character} from './Character';

export abstract class Ability {
	constructor(
		readonly name: string,
		readonly description: string,
		readonly effectType: 'active' | 'passive',
	) {}

	abstract apply(character: Character): void;
}
