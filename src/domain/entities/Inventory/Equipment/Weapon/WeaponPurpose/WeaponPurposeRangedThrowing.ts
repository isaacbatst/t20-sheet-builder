import {type Attribute} from '../../../../Sheet';
import {WeaponPurposeRanged} from './WeaponPurposeRanged';

export class WeaponPurposeRangedThrowing extends WeaponPurposeRanged {
	override defaultDamageAttribute: Attribute = 'strength';
}
