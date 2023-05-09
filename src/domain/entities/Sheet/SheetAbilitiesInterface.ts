import {type RaceAbilityMap, type RoleAbilityMap} from '../Map';
import {type RaceAbilityInterface} from '../Race/RaceAbility';
import {type RoleAbilityInterface} from '../Role/RoleAbility';
import {type TranslatableName} from '../Translator';
import {type TransactionInterface} from './TransactionInterface';

export type SheetAbilitiesMap = {
	role: RoleAbilityMap;
	race: RaceAbilityMap;
};

export type SheetAbilitiesInterface = {
	applyRoleAbility(ability: RoleAbilityInterface, transaction: TransactionInterface, source: TranslatableName): void;
	applyRaceAbility(ability: RaceAbilityInterface, transaction: TransactionInterface, source: TranslatableName): void;
	getRoleAbilities(): RoleAbilityMap;
	getRaceAbilities(): RaceAbilityMap;
};
