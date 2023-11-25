import {Level, type Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleAbilityName} from '../RoleAbilityName';
import {RoleName} from '../RoleName';
import {type SerializedRogue} from '../SerializedRole';
import {SneakAttack} from './SneakAttack/SneakAttack';
import {Specialist} from './Specialist/Specialist';

export class Rogue extends Role<SerializedRogue> {
	static selectSkillGroups = [
		{
			amount: 8,
			skills: [
				SkillName.acrobatics,
				SkillName.athletics,
				SkillName.acting,
				SkillName.animalRide,
				SkillName.knowledge,
				SkillName.diplomacy,
				SkillName.cheat,
				SkillName.stealth,
				SkillName.intuition,
				SkillName.intimidation,
				SkillName.investigation,
				SkillName.gambling,
				SkillName.fight,
				SkillName.craft,
				SkillName.perception,
				SkillName.piloting,
				SkillName.aim,
			],
		},
	];

	static initialLifePoints = 12;
	static lifePointsPerLevel = 3;
	static manaPerLevel = 4;
	static mandatorySkills: SkillName[] = [SkillName.thievery, SkillName.reflexes];
	static proficiencies: Proficiency[] = [];
	static readonly roleName = RoleName.rogue;

	override initialLifePoints = Rogue.initialLifePoints;
	override lifePointsPerLevel = Rogue.lifePointsPerLevel;
	override manaPerLevel = Rogue.manaPerLevel;
	override mandatorySkills = Rogue.mandatorySkills;
	override proficiencies = Rogue.proficiencies;
	override readonly name = Rogue.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel;

	constructor(chosenSkills: SkillName[][], specialistSkills: Set<SkillName>) {
		super(chosenSkills, Rogue.selectSkillGroups);

		this.abilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
			[Level.one]: {
				[RoleAbilityName.sneakAttack]: new SneakAttack(),
				[RoleAbilityName.specialist]: new Specialist(specialistSkills),
			},
		});
	}

	protected override serializeSpecific(): SerializedRogue {
		return {
			name: this.name,
		};
	}
}
