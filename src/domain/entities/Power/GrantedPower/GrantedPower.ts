import {type SerializedSheetGrantedPower} from '../../Sheet';
import {Power} from '../Power';
import {type GrantedPowerName} from './GrantedPowerName';

export abstract class GrantedPower extends Power {
	constructor(override name: GrantedPowerName) {
		super(name, 'granted');
	}

	serialize(): SerializedSheetGrantedPower {
		return {
			name: this.name,
			abilityType: this.abilityType,
			effects: this.effects.serialize(),
		};
	}
}
