import {type Level} from '../Sheet';
import {type RoleAbility} from './RoleAbility';

export type RoleAbilitiesPerLevel<
	T extends object = object> =
Record<Level, Record<string, RoleAbility>> & T;
