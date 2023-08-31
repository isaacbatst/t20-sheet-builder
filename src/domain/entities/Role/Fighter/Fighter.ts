import {type Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleName} from '../RoleName';
import {type SerializedRoles} from '../SerializedRole';

export class Fighter extends Role {
	static selectSkillGroups = [
		{
			amount: 4,
			skills: [
				SkillName.acrobatics,
				SkillName.animalHandling,
				SkillName.athletics,
				SkillName.cheat,
				SkillName.stealth,
				SkillName.initiative,
				SkillName.intimidation,
				SkillName.craft,
				SkillName.perception,
				SkillName.aim,
				SkillName.reflexes,
			],
		},
	];

	static initialLifePoints = 20;
	static lifePointsPerLevel = 5;
	static manaPerLevel = 3;
	static mandatorySkills: SkillName[] = [SkillName.fortitude, SkillName.fight];
	static proficiencies: Proficiency[] = [];
	static readonly roleName = RoleName.fighter;

	override initialLifePoints = Fighter.initialLifePoints;
	override lifePointsPerLevel = Fighter.lifePointsPerLevel;
	override manaPerLevel = Fighter.manaPerLevel;
	override mandatorySkills = Fighter.mandatorySkills;
	override proficiencies = Fighter.proficiencies;
	override readonly name = Fighter.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[][]) {
		super(chosenSkills, Fighter.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedRoles {
		return {
			name: this.name,
		};
	}
}
