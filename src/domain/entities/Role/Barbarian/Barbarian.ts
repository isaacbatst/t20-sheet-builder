import {Level, Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbility} from '../RoleAbility';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedRoles} from '../SerializedRole';
import {Rage} from './Rage/Rage';

export class Barbarian extends Role {
	static readonly selectSkillGroups: SelectSkillGroup[] = [
		{amount: 4, skills: [
			SkillName.animalHandling,
			SkillName.athletics,
			SkillName.animalRide,
			SkillName.initiative,
			SkillName.intimidation,
			SkillName.craft,
			SkillName.perception,
			SkillName.aim,
			SkillName.survival,
			SkillName.will,
		]},
	];

	override initialLifePoints = 24;
	override lifePointsPerLevel = 6;
	override manaPerLevel = 3;
	override mandatorySkills: SkillName[] = [SkillName.fight, SkillName.fortitude];
	override proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.shield];
	override name: RoleName = RoleName.barbarian;
	readonly abilitiesPerLevel: Record<Level, Record<string, RoleAbility>> = {
		[Level.one]: {
			rage: new Rage(),
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

	constructor(chosenSkills: SkillName[] = []) {
		super(chosenSkills, Barbarian.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedRoles {
		throw new Error('Method not implemented.');
	}
}
