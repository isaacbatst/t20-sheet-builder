import {Level} from '../Sheet';
import {type RoleAbilitiesPerLevel} from './RoleAbilitiesPerLevel';

export class RoleAbilitiesPerLevelFactory {
	static make<T extends Partial<RoleAbilitiesPerLevel>>(abilities: T): T & RoleAbilitiesPerLevel {
		return {
			[Level.one]: {},
			[Level.two]: {},
			[Level.three]: {},
			[Level.four]: {},
			[Level.five]: {},
			[Level.six]: {},
			[Level.seven]: {},
			[Level.eight]: {},
			[Level.nine]: {},
			[Level.ten]: {},
			[Level.eleven]: {},
			[Level.twelve]: {},
			[Level.thirteen]: {},
			[Level.fourteen]: {},
			[Level.fifteen]: {},
			[Level.sixteen]: {},
			[Level.seventeen]: {},
			[Level.eighteen]: {},
			[Level.nineteen]: {},
			[Level.twenty]: {},
			...abilities,
		};
	}
}
