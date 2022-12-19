import {Name} from '../Name';

export enum RaceAbilityNameEnum {
	versatile = 'versatile',
}

export class RaceAbilityName extends Name<RaceAbilityNameEnum> {
	protected isValidName(value: string): value is RaceAbilityNameEnum {
		return value in RaceAbilityNameEnum;
	}

	protected getInvalidMessage(): string {
		return 'INVALID_RACE_ABILITY_NAME';
	}
}
