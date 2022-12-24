import type {Attribute} from '../../Attributes';
import {Level} from '../../Levels';
import type {Proficiency} from '../../Proficiency';
import {SkillName} from '../../Skill/SkillName';
import type {Spell, SpellType} from '../../Spell/Spell';
import {SpellCircle} from '../../Spell/SpellCircle';
import type {RoleAbility} from '../RoleAbility';
import type {ChooseableSkills} from '../RoleInterface';
import {SpellRole, SpellRoleName} from '../SpellRole';
import type {ArcanistPath} from './ArcanistPath';
import {ArcanistPathAbility} from './ArcanistPathAbility';
import {ArcanistSpells} from './ArcanistSpells';

export class Arcanist extends SpellRole {
	static readonly chooseableSkills: ChooseableSkills[] = [{amount: 2, skills: [SkillName.knowledge, SkillName.diplomacy, SkillName.cheat, SkillName.war, SkillName.initiative, SkillName.intimidation, SkillName.intuition, SkillName.investigation, SkillName.nobility, SkillName.craft, SkillName.perception]}];
	readonly circleMinLevel: Record<SpellCircle, Level> = {
		[SpellCircle.first]: Level.levelOne,
		[SpellCircle.second]: Level.levelTwo,
	};

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
	readonly name = SpellRoleName.arcanist;
	spellsLearnFrequency: 'all' | 'even' | 'odd';
	initialSpells = 3;
	spellType: SpellType = 'arcane';
	spellsAttribute: Attribute;

	constructor(chosenSkills: SkillName[], path: ArcanistPath, spells: Spell[]) {
		super(chosenSkills, Arcanist.chooseableSkills, spells);
		this.abilities = {
			[Level.levelOne]: {
				arcanistPath: new ArcanistPathAbility(path),
				arcanistSpells: new ArcanistSpells(),
			},
			[Level.levelTwo]: {},
			[Level.levelThree]: {},
			[Level.levelFour]: {},
			[Level.levelFive]: {},
		};
		this.spellsAttribute = this.abilities[Level.levelOne].arcanistPath.getPathSpellsAttribute();
		this.spellsLearnFrequency = this.abilities[Level.levelOne].arcanistPath.getPathSpellsLearnFrequency();
	}
}
