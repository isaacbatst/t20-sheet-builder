import {Level, Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedBuccaneer, type SerializedRoles} from '../SerializedRole';
import {Audacity} from './Audacity/Audacity';

export class Buccaneer extends Role<SerializedBuccaneer> {
	static readonly roleName = RoleName.buccaneer;
	static initialLifePoints = 12;
	static lifePointsPerLevel = 4;
	static manaPerLevel = 3;
	static readonly mandatorySkills: SkillName[] = [SkillName.reflexes];
	static readonly proficiencies: Proficiency[] = [Proficiency.martial];
	static startsWithArmor = true;
	static readonly selectSkillGroups: SelectSkillGroup[] = [
		{amount: 1, skills: [
			SkillName.aim,
			SkillName.fight,
		]},
		{amount: 4, skills: [
			SkillName.acrobatics,
			SkillName.athletics,
			SkillName.acting,
			SkillName.cheat,
			SkillName.fortitude,
			SkillName.stealth,
			SkillName.initiative,
			SkillName.intimidation,
			SkillName.gambling,
			SkillName.fight,
			SkillName.craft,
			SkillName.perception,
			SkillName.aim,
			SkillName.piloting,
		]},
	];

	override initialLifePoints = Buccaneer.initialLifePoints;
	override lifePointsPerLevel = Buccaneer.lifePointsPerLevel;
	override manaPerLevel = Buccaneer.manaPerLevel;
	override mandatorySkills = Buccaneer.mandatorySkills;
	override proficiencies = Buccaneer.proficiencies;
	override name = Buccaneer.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
		[Level.one]: {
			audacity: new Audacity(),
		},
	});

	constructor(chosenSkills: SkillName[] = []) {
		super(chosenSkills, Buccaneer.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedBuccaneer {
		return {
			name: Buccaneer.roleName,
		};
	}
}
