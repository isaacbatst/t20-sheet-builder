import {Ability} from '../Ability/Ability';
import type {AbilityEffect} from '../Ability/AbilityEffect';
import {LearnSpell} from '../Action/AddSpell';
import type {Level} from '../Levels';
import type {ActionInterface} from '../Sheet/SheetActions';
import type {Appliable} from '../Sheet/SheetInterface';
import type {Translatable} from '../Translator';
import {SpellCircle} from './SpellCircle';
import {SpellCost} from './SpellCost';
import type {SpellName} from './SpellName';

export type SpellType = 'arcane' | 'divine' | 'universal';

export abstract class Spell extends Ability {
	static readonly circleManaCost: Record<SpellCircle, number> = {
		[SpellCircle.first]: 1,
		[SpellCircle.second]: 3,
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

	protected getAddAction(source: Translatable): ActionInterface {
		return new LearnSpell({
			source,
			spell: this,
		});
	}
}
