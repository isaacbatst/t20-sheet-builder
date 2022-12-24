import type {Attribute} from '../Attributes';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import {Level} from '../Levels';
import type {Dispatch} from '../Sheet/SheetInterface';
import type {SkillName} from '../Skill/SkillName';
import type {Spell, SpellType} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import {Role} from './Role';
import type {ChooseableSkills} from './RoleInterface';

export enum SpellRoleName {
	arcanist = 'arcanist',
}

export type SpellLearnFrequency = 'all' | 'even' | 'odd';

export type SpellRoleInterface = {
	spellType: SpellType;
	initialSpells: number;
	spellsLearnFrequency: SpellLearnFrequency;
	spellsAttribute: Attribute;
	circleMinLevel: Record<SpellCircle, Level>;
	name: SpellRoleName;
};

export abstract class SpellRole extends Role implements SpellRoleInterface {
	abstract readonly spellType: SpellType;
	abstract readonly initialSpells: number;
	abstract readonly spellsLearnFrequency: SpellLearnFrequency;
	abstract readonly spellsAttribute: Attribute;
	abstract readonly circleMinLevel: Record<SpellCircle, Level>;
	abstract override readonly name: SpellRoleName;

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

		const isFromForbiddenCircle = this.spells.some(spell => this.circleMinLevel[spell.circle] > Level.levelOne);

		if (isFromForbiddenCircle) {
			throw new Error('FORBIDDEN_CIRCLE');
		}
	}
}
