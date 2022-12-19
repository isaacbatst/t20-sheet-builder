import {GeneralPower} from './GeneralPower';
import {GeneralPowerNameEnum} from './GeneralPowerName';

export class Dodge extends GeneralPower {
	constructor() {
		super(
			GeneralPowerNameEnum.dodge,
			'passive',
		);
	}

	apply(character: {addOtherModifierToDefense(sourceName: string, modifier: number): void}) {
		character.addOtherModifierToDefense(GeneralPowerNameEnum.dodge, 2);
	}
}
