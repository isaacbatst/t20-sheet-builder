import type {Attribute} from '../Attributes';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import {Levels} from '../Levels';
import type {Dispatch} from '../SheetInterface';
import type {SkillName} from '../Skill/SkillName';
import type {Spell, SpellType} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import {Role} from './Role';
import type {ChooseableSkills} from './RoleInterface';

export abstract class SpellRole extends Role {
	abstract readonly spellType: SpellType;
	abstract readonly initialSpells: number;
	abstract readonly learnFrequency: 'all' | 'even' | 'odd';
	abstract readonly spellAttribute: Attribute;
	abstract readonly levelToMaxCircle: Record<Levels, SpellCircle>;

	constructor(chosenSkills: SkillName[], chooseableSkills: ChooseableSkills[], readonly spells: Spell[]) {
		super(chosenSkills, chooseableSkills);
	}

	override addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		super.addToSheet(sheet, dispatch);
		this.learnLevelOneSpells(sheet, dispatch);
	}

	private learnLevelOneSpells(sheet: BuildingSheetInterface, dispatch: Dispatch) {
		this.validateSpells();

		this.spells.forEach(spell => {
			spell.addToSheet(sheet, dispatch, this.name);
		});
	}

	private validateSpells() {
		if (this.spells.length !== this.initialSpells) {
			throw new Error('INVALID_SPELLS_QUANTITY');
		}

		const isFromForbiddenCircle = this.spells.some(spell => spell.circle > this.levelToMaxCircle[Levels.levelOne]);

		if (isFromForbiddenCircle) {
			throw new Error('FORBIDDEN_CIRCLE');
		}
	}
}
