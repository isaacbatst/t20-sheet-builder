import type {Attribute} from '../../Sheet/Attributes';
import {Level} from '../../Sheet/Levels';
import type {Proficiency} from '../../Sheet/Proficiency';
import {SkillName} from '../../Skill/SkillName';
import type {Spell, SpellType} from '../../Spell/Spell';
import {Role} from '../Role';
import type {RoleAbility} from '../RoleAbility';
import type {ChooseableSkills} from '../RoleInterface';
import {RoleName} from '../RoleName';
import type {SpellLearnFrequency} from '../SpellsAbility';
import type {ArcanistPath} from './ArcanistPath/ArcanistPath';
import {ArcanistPathAbility} from './ArcanistPath/ArcanistPathAbility';
import {ArcanistSpells} from './ArcanistSpells/ArcanistSpells';

export class Arcanist extends Role {
	static readonly chooseableSkills: ChooseableSkills[] = [{amount: 2, skills: [SkillName.knowledge, SkillName.diplomacy, SkillName.cheat, SkillName.war, SkillName.initiative, SkillName.intimidation, SkillName.intuition, SkillName.investigation, SkillName.nobility, SkillName.craft, SkillName.perception]}];

	readonly abilities: {
		[Level.levelOne]: {
			arcanistPath: ArcanistPathAbility;
			arcanistSpells: ArcanistSpells;
		};
		[Level.levelTwo]: Record<string, RoleAbility>;
		[Level.levelThree]: Record<string, RoleAbility>;
		[Level.levelFour]: Record<string, RoleAbility>;
		[Level.levelFive]: Record<string, RoleAbility>;
	};

	override get startsWithArmor(): boolean {
		return false;
	}

	get initialLifePoints() {
		return 8;
	}

	get lifePointsPerLevel() {
		return 2;
	}

	get manaPerLevel() {
		return 6;
	}

	readonly mandatorySkills: SkillName[] = [SkillName.mysticism, SkillName.will];
	readonly proficiencies: Proficiency[] = [];
	readonly name = RoleName.arcanist;
	initialSpells = 3;
	spellType: SpellType = 'arcane';

	constructor(chosenSkills: SkillName[], path: ArcanistPath, spells: Spell[]) {
		super(chosenSkills, Arcanist.chooseableSkills);
		const arcanistPath = new ArcanistPathAbility(path);
		const arcanistSpells = new ArcanistSpells(spells, arcanistPath.getLearnFrequency(), arcanistPath.getSpellsAttribute());
		this.abilities = {
			[Level.levelOne]: {
				arcanistSpells,
				arcanistPath,
			},
			[Level.levelTwo]: {},
			[Level.levelThree]: {},
			[Level.levelFour]: {},
			[Level.levelFive]: {},
		};
	}

	getSpellsAttribute(): Attribute {
		return this.abilities[Level.levelOne].arcanistPath.getSpellsAttribute();
	}

	getSpellLearnFrequency(): SpellLearnFrequency {
		return this.abilities[Level.levelOne].arcanistPath.getLearnFrequency();
	}
}
