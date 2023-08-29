import {type SerializedArcanist} from '../..';
import type {Attribute} from '../../Sheet/Attributes';
import {Level} from '../../Sheet/Level';
import type {Proficiency} from '../../Sheet/Proficiency';
import {SkillName} from '../../Skill/SkillName';
import type {Spell, SpellType} from '../../Spell/Spell';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import type {SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import type {SpellLearnFrequency} from '../SpellsAbility';
import type {ArcanistPath} from './ArcanistPath/ArcanistPath';
import {ArcanistSpells} from './ArcanistSpells/ArcanistSpells';

export class Arcanist<T extends ArcanistPath = ArcanistPath> extends Role<
SerializedArcanist
> {
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

	static override get startsWithArmor(): boolean {
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

	readonly abilitiesPerLevel: RoleAbilitiesPerLevel<{
		[Level.one]: {
			arcanistPath: ArcanistPath;
			arcanistSpells: ArcanistSpells;
		};
	}>;

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
		this.abilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
			[Level.one]: {
				arcanistSpells,
				arcanistPath: path,
			},
		});
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

	protected override serializeSpecific(): SerializedArcanist {
		return {
			name: Arcanist.roleName,
			path: this.getPath().serializePath(),
			initialSpells: this.getInitialSpells().map(spell => spell.name),
		};
	}
}
