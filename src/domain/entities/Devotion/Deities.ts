import {GrantedPowerName} from '../Power/GrantedPower/GrantedPowerName';
import {RaceName} from '../Race';
import {RoleName} from '../Role';
import {DeityName} from './DeityName';

export type Deity = {
	name: DeityName;
	grantedPowers: GrantedPowerName[];
	beliefsAndGoals: string;
	sacredSymbol: string;
	favoriteWeapon: string;
	allowedToDevote: {
		races: RaceName[];
		roles: RoleName[];
	} | 'all';
};

export class Deities {
	static map: Record<DeityName, Deity> = {
		aharadak: {
			grantedPowers: [],
			name: DeityName.aharadak,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: 'all',
		},
		allihanna: {
			grantedPowers: [],
			name: DeityName.allihanna,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [RaceName.dahllan, RaceName.elf],
				roles: [],
			},
		},
		azgher: {
			grantedPowers: [],
			name: DeityName.azgher,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		kallyadranoch: {
			grantedPowers: [],
			name: DeityName.kallyadranoch,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		khalmyr: {
			grantedPowers: [],
			name: DeityName.khalmyr,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		lena: {
			grantedPowers: [],
			name: DeityName.lena,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		linwuh: {
			grantedPowers: [
				GrantedPowerName.emptyMind,
			],
			name: DeityName.linwuh,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [RaceName.dwarf],
				roles: [RoleName.warrior],
			},
		},
		marah: {
			grantedPowers: [],
			name: DeityName.marah,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		megalokk: {
			grantedPowers: [],
			name: DeityName.megalokk,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		nimb: {
			grantedPowers: [],
			name: DeityName.nimb,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		sszzzaas: {
			grantedPowers: [],
			name: DeityName.sszzzaas,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		tannatoh: {
			grantedPowers: [
				GrantedPowerName.analyticMind,
			],
			name: DeityName.tannatoh,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		thyatis: {
			grantedPowers: [],
			name: DeityName.thyatis,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		tenebra: {
			grantedPowers: [],
			name: DeityName.tenebra,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: {
				races: [],
				roles: [],
			},
		},
		thwor: {
			grantedPowers: [],
			name: DeityName.thwor,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: 'all',
		},
		valkaria: {
			grantedPowers: [],
			name: DeityName.valkaria,
			beliefsAndGoals: '',
			favoriteWeapon: '',
			sacredSymbol: '',
			allowedToDevote: 'all',
		},
	};

	static get(name: DeityName): Deity {
		return Deities.map[name];
	}

	static getAll(): Deity[] {
		return Object.values(Deities.map);
	}
}
