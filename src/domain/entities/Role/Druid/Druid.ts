import {Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedDruid} from '../SerializedRole';

export class Druid extends Role<SerializedDruid> {
	static selectSkillGroups: SelectSkillGroup[] = [
		{
			amount: 4,
			skills: [
				SkillName.animalHandling,
				SkillName.athletics,
				SkillName.animalRide,
				SkillName.knowledge,
				SkillName.cure,
				SkillName.fortitude,
				SkillName.initiative,
				SkillName.intuition,
				SkillName.fight,
				SkillName.mysticism,
				SkillName.craft,
				SkillName.perception,
				SkillName.religion,
			],
		},
	];

	override initialLifePoints = 16;
	override lifePointsPerLevel = 4;
	override manaPerLevel = 4;
	override mandatorySkills: SkillName[] = [SkillName.survival, SkillName.will];
	override proficiencies: Proficiency[] = [Proficiency.shield];
	override readonly name = RoleName.druid;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Druid.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedDruid {
		return {
			name: this.name,
		};
	}
}
