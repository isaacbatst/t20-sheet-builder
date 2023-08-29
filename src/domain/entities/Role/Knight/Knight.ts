import {Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedKnight} from '../SerializedRole';

export class Knight extends Role<SerializedKnight> {
	static selectSkillGroups: SelectSkillGroup[] = [
		{
			amount: 2,
			skills: [
				SkillName.animalHandling,
				SkillName.athletics,
				SkillName.animalRide,
				SkillName.diplomacy,
				SkillName.war,
				SkillName.initiative,
				SkillName.intimidation,
				SkillName.nobility,
				SkillName.perception,
				SkillName.will,
			],
		},
	];

	override initialLifePoints = 20;
	override lifePointsPerLevel = 5;
	override manaPerLevel = 3;
	override mandatorySkills: SkillName[] = [SkillName.fight, SkillName.fortitude];
	override proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.heavyArmor, Proficiency.shield];
	override readonly name = RoleName.knight;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Knight.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedKnight {
		return {
			name: this.name,
		};
	}
}
