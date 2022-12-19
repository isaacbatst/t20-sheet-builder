import type {CombatPowerName} from './CombatPowerName';

export type PowerName = CombatPowerName;

export class Power {
	constructor(
		readonly description: string,
	) {}
}
