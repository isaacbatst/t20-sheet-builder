import {Dodge} from './Dodge';
import type {PowerNameEnum} from './PowerName';
import {SwordAndShieldStyle} from './SwordAndShieldStyle';
import {TwoHandsStyle} from './TwoHandsStyle';

export class GeneralPowerFactory {
	static make(powerName: PowerNameEnum) {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const Power = GeneralPowerFactory.nameToClass[powerName];

		return new Power();
	}

	private static readonly nameToClass = {
		dodge: Dodge,
		swordAndShieldStyle: SwordAndShieldStyle,
		twoHandsStyle: TwoHandsStyle,
	};
}
