import {Name} from '../Name';
import {GeneralPowerNameEnum} from './GeneralPowerName';

export type PowerNameEnum = GeneralPowerNameEnum;

export class PowerName extends Name<PowerNameEnum> {
	protected isValidName(name: string): name is PowerNameEnum {
		return name in GeneralPowerNameEnum;
	}

	protected getInvalidMessage(): string {
		return 'INVALID_POWER_NAME';
	}
}
