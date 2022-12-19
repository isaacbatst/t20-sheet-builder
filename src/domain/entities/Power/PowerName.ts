export enum PowerNameEnum {
	esquiva = 'esquiva',
	twoHandsStyle = 'twoHandsStyle',
	swordAndShieldStyle = 'swordAndShieldStyle',
}

export class PowerName {
	static validatePowerName(name: string): name is PowerNameEnum {
		return name in PowerNameEnum;
	}

	readonly value: PowerNameEnum;

	constructor(name: string) {
		if (!PowerName.validatePowerName(name)) {
			throw new Error('INVALID_POWER_NAME');
		}

		this.value = name;
	}
}
