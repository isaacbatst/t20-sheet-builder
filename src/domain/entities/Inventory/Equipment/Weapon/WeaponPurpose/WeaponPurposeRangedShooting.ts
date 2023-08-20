import {type Attribute} from '../../../../Sheet';
import {WeaponPurposeRanged} from './WeaponPurposeRanged';

export class WeaponPurposeRangedShooting extends WeaponPurposeRanged {
	override defaultDamageAttribute: Attribute | undefined = undefined;
}
