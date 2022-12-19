import {Name} from '../Name';

export enum RaceNameEnum {
	human = 'human',
	dwarf = 'dwarf',
}

export class RaceName extends Name<RaceNameEnum> {
	protected getInvalidMessage(): string {
		return 'INVALID_RACE_NAME';
	}

	protected isValidName(value: string): value is RaceNameEnum {
		return value in RaceNameEnum;
	}
}
