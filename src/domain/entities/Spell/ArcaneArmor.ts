import type {AbilityDuration, AbilityExecution, AbilityRange} from '../Ability/ActiveAbility';
import type {AffectableTarget} from '../Ability/Affectable';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import {TemporaryModifier} from '../Modifier/TemporaryModifier';
import type {Dispatch, SheetInterface} from '../SheetInterface';
import type {Translatable} from '../Translator';
import {Spell} from './Spell';
import {SpellCircle} from './SpellCircle';
import {SpellName} from './SpellName';

export class ArcaneArmor extends Spell {
	static get defenseBonus() {
		return 5;
	}

	get execution(): AbilityExecution {
		return 'default';
	}

	get range(): AbilityRange {
		return 'personal';
	}

	get duration(): AbilityDuration {
		return 'scene';
	}

	readonly affectable: AffectableTarget = {
		type: 'target',
		value: 'self',
	};

	constructor() {
		super(SpellName.arcaneArmor, SpellCircle.first, 'arcane');
	}

	apply(sheet: SheetInterface): void {
		sheet.addDefenseModifier(new TemporaryModifier(this.name, ArcaneArmor.defenseBonus, 'scene'));
	}
}
