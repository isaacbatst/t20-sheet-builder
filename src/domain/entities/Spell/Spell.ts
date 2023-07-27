import {Ability} from '../Ability/Ability';
import type {Cost} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {type SpellCircle} from './SpellCircle';
import {circleManaCost} from './SpellCircleManaCost';
import {SpellCost} from './SpellCost';
import type {SpellName} from './SpellName';
import {type SpellSchool} from './SpellSchool';

export type LearnableSpellType = 'arcane' | 'divine';
export type SpellType = LearnableSpellType | 'universal';

export abstract class Spell extends Ability {
	static readonly circleManaCost = circleManaCost;

	readonly cost: Cost;
	abstract school: SpellSchool;
	abstract shortDescription: string;

	constructor(
		override readonly name: SpellName,
		readonly circle: SpellCircle,
		readonly type: SpellType,
	) {
		super(name, 'spell');
		this.cost = new SpellCost(this.circle);
	}
}
