import {type RaceAbilityMap, type RoleAbilityMap} from '../Map';
import {type RaceAbilityInterface} from '../Race/RaceAbility';
import {type RoleAbilityInterface} from '../Role/RoleAbility';
import {type TranslatableName} from '../Translator';
import {type SheetAbilitiesInterface} from './SheetAbilitiesInterface';
import {type TransactionInterface} from './TransactionInterface';

export class SheetAbilities implements SheetAbilitiesInterface {
	constructor(
		private readonly roleAbility: RoleAbilityMap = new Map(),
		private readonly raceAbility: RaceAbilityMap = new Map(),
	) {}

	applyRoleAbility(ability: RoleAbilityInterface, transaction: TransactionInterface, source: TranslatableName): void {
		this.roleAbility.set(ability.name, ability);
		ability.addToSheet(transaction, source);
	}

	applyRaceAbility(ability: RaceAbilityInterface, transaction: TransactionInterface, source: TranslatableName): void {
		this.raceAbility.set(ability.name, ability);
		ability.addToSheet(transaction, source);
	}

	getRoleAbilities(): RoleAbilityMap {
		return this.roleAbility;
	}

	getRaceAbilities(): RaceAbilityMap {
		return this.raceAbility;
	}
}
