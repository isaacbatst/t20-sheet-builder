import {Ability} from '../Ability/Ability';
import {LearnSpell} from '../Action/AddSpell';
import type {ActionInterface} from '../Sheet/SheetActions';
import type {Cost} from '../Sheet/SheetInterface';
import type {Translatable} from '../Translator';
import {SpellCircle} from './SpellCircle';
import {SpellCost} from './SpellCost';
import type {SpellName} from './SpellName';

export type LearnableSpellType = 'arcane' | 'divine';
export type SpellType = LearnableSpellType | 'universal';

export abstract class Spell extends Ability {
	static readonly circleManaCost: Record<SpellCircle, number> = {
		[SpellCircle.first]: 1,
		[SpellCircle.second]: 3,
	};

	readonly cost: Cost;

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
			spell: this,
			source,
		});
	}
}
