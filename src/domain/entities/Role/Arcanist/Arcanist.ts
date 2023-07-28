import type {Attribute} from '../../Sheet/Attributes';
import {Level} from '../../Sheet/Level';
import type {Proficiency} from '../../Sheet/Proficiency';
import {SkillName} from '../../Skill/SkillName';
import type {Spell, SpellType} from '../../Spell/Spell';
import {Role} from '../Role';
import type {RoleAbility} from '../RoleAbility';
import type {SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import type {SpellLearnFrequency} from '../SpellsAbility';
import type {ArcanistPath} from './ArcanistPath/ArcanistPath';
import {ArcanistSpells} from './ArcanistSpells/ArcanistSpells';

export class Arcanist<T extends ArcanistPath = ArcanistPath> extends Role {
	static readonly roleName = RoleName.arcanist;
	static readonly selectSkillGroups: SelectSkillGroup[] = [
		{
			amount: 2,
			skills: [
				SkillName.knowledge,
				SkillName.diplomacy,
				SkillName.cheat,
				SkillName.war,
				SkillName.initiative,
				SkillName.intimidation,
				SkillName.intuition,
				SkillName.investigation,
				SkillName.nobility,
				SkillName.craft,
				SkillName.perception,
			],
		},
	];

	static get startsWithArmor(): boolean {
		return false;
	}

	static get initialLifePoints() {
		return 8;
	}

	static get lifePointsPerLevel() {
		return 2;
	}

	static get manaPerLevel() {
		return 6;
	}

	static readonly mandatorySkills: SkillName[] = [SkillName.mysticism, SkillName.will];
	static readonly proficiencies: Proficiency[] = [];

	readonly abilitiesPerLevel: {
		[Level.one]: {
			arcanistPath: ArcanistPath;
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

	override initialLifePoints: number = Arcanist.initialLifePoints;
	override lifePointsPerLevel: number = Arcanist.lifePointsPerLevel;
	override manaPerLevel: number = Arcanist.manaPerLevel;
	override mandatorySkills: SkillName[] = Arcanist.mandatorySkills;
	override proficiencies: Proficiency[] = Arcanist.proficiencies;
	readonly name = RoleName.arcanist;
	initialSpells = 3;
	spellType: SpellType = 'arcane';

	constructor(chosenSkills: SkillName[], path: T, spells: Spell[]) {
		super(chosenSkills, Arcanist.selectSkillGroups);
		const arcanistSpells = new ArcanistSpells(spells, path.spellLearnFrequency, path.spellsAttribute);
		this.abilitiesPerLevel = {
			[Level.one]: {
				arcanistSpells,
				arcanistPath: path,
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
		return this.abilitiesPerLevel[Level.one].arcanistPath.spellsAttribute;
	}

	getSpellLearnFrequency(): SpellLearnFrequency {
		return this.abilitiesPerLevel[Level.one].arcanistPath.spellLearnFrequency;
	}

	getPath(): T {
		return this.abilitiesPerLevel[Level.one].arcanistPath as T;
	}

	getInitialSpells(): Spell[] {
		return this.abilitiesPerLevel[Level.one].arcanistSpells.effects.passive.default.spells;
	}
}
