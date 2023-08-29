import {Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedRanger} from '../SerializedRole';

export class Ranger extends Role<SerializedRanger> {
	static selectSkillGroups: SelectSkillGroup[] = [
		{
			amount: 1,
			skills: [SkillName.fight, SkillName.aim],
		},
		{
			amount: 6,
			skills: [
				SkillName.animalHandling,
				SkillName.athletics,
				SkillName.animalRide,
				SkillName.cure,
				SkillName.fortitude,
				SkillName.stealth,
				SkillName.initiative,
				SkillName.investigation,
				SkillName.fight,
				SkillName.craft,
				SkillName.perception,
				SkillName.aim,
				SkillName.reflexes,
			],
		},
	];

	override initialLifePoints = 16;
	override lifePointsPerLevel = 4;
	override manaPerLevel = 4;
	override mandatorySkills: SkillName[] = [SkillName.survival];
	override proficiencies: Proficiency[] = [Proficiency.martial, Proficiency.shield];
	override readonly name = RoleName.ranger;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Ranger.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedRanger {
		return {
			name: this.name,
		};
	}
}
