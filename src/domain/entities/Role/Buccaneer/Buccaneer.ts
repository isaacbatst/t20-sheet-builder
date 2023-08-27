import {Level, Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedRoles} from '../SerializedRole';
import {Audacity} from './Audacity/Audacity';

export class Buccaneer extends Role {
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

	override initialLifePoints = 16;
	override lifePointsPerLevel = 4;
	override manaPerLevel = 3;
	override mandatorySkills: SkillName[] = [SkillName.reflexes];
	override proficiencies: Proficiency[] = [Proficiency.martial];
	override name: RoleName = RoleName.buccaneer;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
		[Level.one]: {
			audacity: new Audacity(),
		},
	});

	constructor(chosenSkills: SkillName[] = []) {
		super(chosenSkills, Buccaneer.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedRoles {
		throw new Error('Method not implemented.');
	}
}
