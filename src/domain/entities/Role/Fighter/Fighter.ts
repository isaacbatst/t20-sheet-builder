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

	override initialLifePoints = 20;
	override lifePointsPerLevel = 5;
	override manaPerLevel = 3;
	override mandatorySkills: SkillName[] = [SkillName.fortitude, SkillName.fight];
	override proficiencies: Proficiency[] = [];
	override readonly name = RoleName.fighter;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Fighter.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedRoles {
		return {
			name: this.name,
		};
	}
}
