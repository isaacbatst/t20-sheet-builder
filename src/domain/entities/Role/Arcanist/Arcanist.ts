import type {Attribute} from '../../Sheet/Attributes';
import {Level} from '../../Sheet/Levels';
import type {Proficiency} from '../../Sheet/Proficiency';
import {SkillName} from '../../Skill/SkillName';
import type {Spell, SpellType} from '../../Spell/Spell';
import {Role} from '../Role';
import type {RoleAbility} from '../RoleAbility';
import type {SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import type {SpellLearnFrequency} from '../SpellsAbility';
import type {ArcanistPath} from './ArcanistPath/ArcanistPath';
import {ArcanistPathAbility} from './ArcanistPath/ArcanistPathAbility';
import {ArcanistSpells} from './ArcanistSpells/ArcanistSpells';

export class Arcanist extends Role {
	static readonly roleName = RoleName.arcanist;
	static readonly selectSkillGroups: SelectSkillGroup[] = [{amount: 2, skills: [SkillName.knowledge, SkillName.diplomacy, SkillName.cheat, SkillName.war, SkillName.initiative, SkillName.intimidation, SkillName.intuition, SkillName.investigation, SkillName.nobility, SkillName.craft, SkillName.perception]}];

	readonly abilities: {
		[Level.one]: {
			arcanistPath: ArcanistPathAbility;
			arcanistSpells: ArcanistSpells;
		};
		[Level.two]: Record<string, RoleAbility>;
		[Level.three]: Record<string, RoleAbility>;
		[Level.four]: Record<string, RoleAbility>;
		[Level.five]: Record<string, RoleAbility>;
		[Level.six]: Record<string, RoleAbility>;
		[Level.seven]: Record<string, RoleAbility>;
		[Level.eight]: Record<string, RoleAbility>;
		[Level.nine]: Record<string, RoleAbility>;
		[Level.ten]: Record<string, RoleAbility>;
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
		super(chosenSkills, Arcanist.selectSkillGroups);
		const arcanistPath = new ArcanistPathAbility(path);
		const arcanistSpells = new ArcanistSpells(spells, arcanistPath.getLearnFrequency(), arcanistPath.getSpellsAttribute());
		this.abilities = {
			[Level.one]: {
				arcanistSpells,
				arcanistPath,
			},
			[Level.two]: {},
			[Level.three]: {},
			[Level.four]: {},
			[Level.five]: {},
			[Level.six]: {},
			[Level.seven]: {},
			[Level.eight]: {},
			[Level.nine]: {},
			[Level.ten]: {},
		};
	}

	getSpellsAttribute(): Attribute {
		return this.abilities[Level.one].arcanistPath.getSpellsAttribute();
	}

	getSpellLearnFrequency(): SpellLearnFrequency {
		return this.abilities[Level.one].arcanistPath.getLearnFrequency();
	}
}
