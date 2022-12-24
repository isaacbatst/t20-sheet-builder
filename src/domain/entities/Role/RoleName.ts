import type {SpellRoleName} from './SpellRole';

export enum RegularRoleName {
	warrior = 'warrior',
}

export type RoleName = RegularRoleName | SpellRoleName;
