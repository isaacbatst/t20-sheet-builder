import {AnalyticMind} from './AnalyticMind/AnalyticMind';
import {EmptyMind} from './EmptyMind/EmptyMind';
import {type GrantedPowerName} from './GrantedPowerName';
import {type GrantedPowerStatic} from './GrantedPowerStatic';
import {LiWuTradition} from './LinWuTradition/LinWuTradition';

export class GrantedPowers {
	static readonly map: Record<GrantedPowerName, GrantedPowerStatic> = {
		analyticMind: AnalyticMind,
		emptyMind: EmptyMind,
		linWuTradition: LiWuTradition,
	};

	static getAll() {
		return Object.values(this.map);
	}
}
