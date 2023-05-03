import type {Character} from '../../../Character/Character';
import {GeneralPowerName} from '../GeneralPowerName';
import {FightStyleEffect} from './FightStyleEffect';

export class OneWeaponStyleEffect extends FightStyleEffect {
	constructor() {
		super(GeneralPowerName.oneWeaponStyle);
	}

	canApply(character: Character): boolean {
		const wieldedItems = character.sheet.inventory.getWieldedItems();
		return wieldedItems.length === 1;
	}
}
