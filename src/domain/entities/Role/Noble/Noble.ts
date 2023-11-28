import {Level, Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleAbilityName} from '../RoleAbilityName';
import {RoleName} from '../RoleName';
import {type SerializedNoble} from '../SerializedRole';
import {Asset} from './Asset/Asset';
import {SelfConfidence} from './SelfConfidence/SelfConfidence';

export class Noble extends Role<SerializedNoble> {
	static selectSkillGroups = [
		{
			amount: 1,
			skills: [
				SkillName.diplomacy,
				SkillName.intimidation,
			],
		},
		{
			amount: 4,
			skills: [
				SkillName.animalHandling,
				SkillName.acting,
				SkillName.animalRide,
				SkillName.knowledge,
				SkillName.diplomacy,
				SkillName.cheat,
				SkillName.fortitude,
				SkillName.war,
				SkillName.initiative,
				SkillName.intimidation,
				SkillName.intuition,
				SkillName.investigation,
				SkillName.gambling,
				SkillName.fight,
				SkillName.nobility,
				SkillName.craft,
				SkillName.perception,
				SkillName.aim,
			],
		},
	];

	static initialLifePoints = 16;
	static lifePointsPerLevel = 4;
	static manaPerLevel = 4;
	static mandatorySkills: SkillName[] = [SkillName.will];
	static proficiencies: Proficiency[] = [
		Proficiency.martial,
		Proficiency.heavyArmor,
		Proficiency.shield,
	];

	static readonly roleName = RoleName.noble;

	override initialLifePoints = Noble.initialLifePoints;
	override lifePointsPerLevel = Noble.lifePointsPerLevel;
	override manaPerLevel = Noble.manaPerLevel;
	override mandatorySkills = Noble.mandatorySkills;
	override proficiencies = Noble.proficiencies;
	override readonly name = Noble.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
		[Level.one]: {
			[RoleAbilityName.selfConfidence]: new SelfConfidence(),
			[RoleAbilityName.asset]: new Asset(),
		},
	});

	constructor(chosenSkills: SkillName[][]) {
		super(chosenSkills, Noble.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedNoble {
		return {
			name: this.name,
		};
	}
}
