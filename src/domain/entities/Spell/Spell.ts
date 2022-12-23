import {ActiveAbility} from '../Ability/ActiveAbility';
import {LearnSpell} from '../Action/AddSpell';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {Appliable, Dispatch} from '../SheetInterface';
import type {Translatable} from '../Translator';
import {SpellCircle} from './SpellCircle';
import {SpellCost} from './SpellCost';
import type {SpellName} from './SpellName';

export type SpellType = 'arcane' | 'divine' | 'universal';

export abstract class Spell extends ActiveAbility {
	static readonly circleManaCost: Record<SpellCircle, number> = {
		[SpellCircle.first]: 1,
	};

	readonly cost: Appliable;

	constructor(
		override readonly name: SpellName,
		readonly circle: SpellCircle,
		readonly type: SpellType,
	) {
		super(name, 'spell');
		this.cost = new SpellCost(this.circle);
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch, source: Translatable): void {
		dispatch(new LearnSpell({source, spell: this}));
	}
}
