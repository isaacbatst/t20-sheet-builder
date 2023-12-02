import {GeneralPowers} from './GeneralPower/GeneralPowers';

export class Powers {
	static map = {
		...GeneralPowers.map,
	};

	getAll() {
		return Object.values(Powers.map);
	}
}
