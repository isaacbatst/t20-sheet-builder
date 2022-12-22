import {Dodge} from './Dodge';
import type {PowerName} from './PowerName';
import {SwordAndShieldStyle} from './SwordAndShieldStyle';
import {TwoHandsStyle} from './TwoHandsStyle';

export class GeneralPowerFactory {
	static make(powerName: PowerName) {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const Power = GeneralPowerFactory.nameToRole[powerName];

		return new Power();
	}

	private static readonly nameToRole = {
		dodge: Dodge,
		swordAndShieldStyle: SwordAndShieldStyle,
		twoHandsStyle: TwoHandsStyle,
	};
}
