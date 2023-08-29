import {type SerializedWarrior} from '../..';
import {Level} from '../../Sheet/Level';
import {Proficiency} from '../../Sheet/Proficiency';
import {SkillName} from '../../Skill/SkillName';
import {Role} from '../Role';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import type {RoleAbility} from '../RoleAbility';
import type {SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {SpecialAttack} from './SpecialAttack/SpecialAttack';

export class Warrior extends Role<SerializedWarrior> {
	static readonly roleName = RoleName.warrior;
	static readonly selectSkillGroups: SelectSkillGroup[] = [
		{amount: 1, skills: [SkillName.fight, SkillName.aim]},
		{amount: 2, skills: [SkillName.animalHandling, SkillName.athletics, SkillName.animalRide, SkillName.war, SkillName.initiative, SkillName.intimidation, SkillName.fight, SkillName.craft, SkillName.perception, SkillName.aim, SkillName.reflexes]},
	];

	static get initialLifePoints() {
		return 20;
	}

	static get lifePointsPerLevel() {
		return 5;
	}

	static get manaPerLevel() {
		return 3;
	}

	static readonly mandatorySkills: SkillName[] = [SkillName.fortitude];
	static readonly proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.shield, Proficiency.heavyArmor];
	readonly name: RoleName = RoleName.warrior;
	readonly abilitiesPerLevel: Record<Level, Record<string, RoleAbility>> = RoleAbilitiesPerLevelFactory
		.make({
			[Level.one]: {
				specialAttack: new SpecialAttack(),
			},
		});

	override initialLifePoints = Warrior.initialLifePoints;
	override lifePointsPerLevel = Warrior.lifePointsPerLevel;
	override manaPerLevel = Warrior.manaPerLevel;
	override mandatorySkills = Warrior.mandatorySkills;
	override proficiencies = Warrior.proficiencies;

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Warrior.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedWarrior {
		return {
			name: Warrior.roleName,
		};
	}
}
