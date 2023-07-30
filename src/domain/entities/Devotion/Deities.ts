import {GrantedPowerName} from '../Power/GrantedPower/GrantedPowerName';
import {DeityName} from './DeityName';

export type Deity = {
	name: DeityName;
	grantedPowers: GrantedPowerName[];
};

export class Deities {
	static map: Record<DeityName, Deity> = {
		aharadak: {
			grantedPowers: [],
			name: DeityName.aharadak,
		},
		allihanna: {
			grantedPowers: [],
			name: DeityName.allihanna,
		},
		azgher: {
			grantedPowers: [],
			name: DeityName.azgher,
		},
		kallyadranoch: {
			grantedPowers: [],
			name: DeityName.kallyadranoch,
		},
		khalmyr: {
			grantedPowers: [],
			name: DeityName.khalmyr,
		},
		lena: {
			grantedPowers: [],
			name: DeityName.lena,
		},
		linwuh: {
			grantedPowers: [
				GrantedPowerName.emptyMind,
			],
			name: DeityName.linwuh,
		},
		marah: {
			grantedPowers: [],
			name: DeityName.marah,
		},
		megalokk: {
			grantedPowers: [],
			name: DeityName.megalokk,
		},
		nimb: {
			grantedPowers: [],
			name: DeityName.nimb,
		},
		sszzzaas: {
			grantedPowers: [],
			name: DeityName.sszzzaas,
		},
		tannatoh: {
			grantedPowers: [
				GrantedPowerName.analyticMind,
			],
			name: DeityName.tannatoh,
		},
		thyatis: {
			grantedPowers: [],
			name: DeityName.thyatis,
		},
		tenebra: {
			grantedPowers: [],
			name: DeityName.tenebra,
		},
		thwor: {
			grantedPowers: [],
			name: DeityName.thwor,
		},
		valkaria: {
			grantedPowers: [],
			name: DeityName.valkaria,
		},
	};

	static get(name: DeityName): Deity {
		return Deities.map[name];
	}

	static getAll(): Deity[] {
		return Object.values(Deities.map);
	}
}
