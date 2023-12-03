import {TormentaPowers} from './GeneralPower';
import {GeneralPowers} from './GeneralPower/GeneralPowers';
import {GrantedPowers} from './GrantedPower/GrantedPowers';
export class Powers {
	static readonly map = {
		...GeneralPowers.map,
		...GrantedPowers.map,
		...TormentaPowers.map,
	};

	getAll() {
		return Object.values(Powers.map);
	}
}
