import type {AbilityName} from './Ability';
import {AbilityEffect} from './AbilityEffect';

export class RolePlayEffect extends AbilityEffect {
	constructor(
		source: AbilityName,
		readonly description: string,
	) {
		super('roleplay', source);
	}
}
