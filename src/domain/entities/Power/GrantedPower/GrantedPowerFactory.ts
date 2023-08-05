import {AnalyticMind} from './AnalyticMind/AnalyticMind';
import {EmptyMind} from './EmptyMind/EmptyMind';
import {type GrantedPower} from './GrantedPower';
import {type GrantedPowerName} from './GrantedPowerName';

export class GrantedPowerFactory {
	static grantedPowerClasses: Record<GrantedPowerName, new() => GrantedPower> = {
		analyticMind: AnalyticMind,
		emptyMind: EmptyMind,
	};

	static make(name: GrantedPowerName) {
		return new GrantedPowerFactory.grantedPowerClasses[name]();
	}
}
