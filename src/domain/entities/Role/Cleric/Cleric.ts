import {Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedCleric} from '../SerializedRole';

export class Cleric extends Role<SerializedCleric> {
	static selectSkillGroups: SelectSkillGroup[] = [
		{
			amount: 2,
			skills: [
				SkillName.knowledge,
				SkillName.cure,
				SkillName.diplomacy,
				SkillName.fortitude,
				SkillName.initiative,
				SkillName.intuition,
				SkillName.fight,
				SkillName.mysticism,
				SkillName.nobility,
				SkillName.craft,
				SkillName.perception,
			],
		},
	];

	override initialLifePoints = 16;
	override lifePointsPerLevel = 4;
	override manaPerLevel = 5;
	override mandatorySkills: SkillName[] = [SkillName.religion, SkillName.will];
	override proficiencies: Proficiency[] = [Proficiency.heavyArmor, Proficiency.shield];
	override readonly name = RoleName.cleric;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Cleric.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedCleric {
		return {
			name: this.name,
		};
	}
}
