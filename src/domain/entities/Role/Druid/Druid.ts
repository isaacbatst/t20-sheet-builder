import {Level, Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {type Spell, type SpellSchool} from '../../Spell';
import {FaithfulDevote} from '../Cleric/FaithfulDevote/FaithfulDevote';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleAbilityName} from '../RoleAbilityName';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedDruid} from '../SerializedRole';
import {DruidSpells} from './DruidSpells/DruidSpells';
import {WildEmpathy} from './WildEmpathy/WildEmpathy';

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

	static initialLifePoints = 16;
	static lifePointsPerLevel = 4;
	static manaPerLevel = 4;
	static mandatorySkills: SkillName[] = [SkillName.survival, SkillName.will];
	static proficiencies: Proficiency[] = [Proficiency.shield];
	static readonly roleName = RoleName.druid;

	override initialLifePoints = Druid.initialLifePoints;
	override lifePointsPerLevel = Druid.lifePointsPerLevel;
	override manaPerLevel = Druid.manaPerLevel;
	override mandatorySkills = Druid.mandatorySkills;
	override proficiencies = Druid.proficiencies;
	override readonly name = Druid.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel;

	constructor(chosenSkills: SkillName[][], chosenSpells: Spell[], chosenSchools: Set<SpellSchool>) {
		super(chosenSkills, Druid.selectSkillGroups);
		this.abilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
			[Level.one]: {
				[RoleAbilityName.clericFaithfulDevote]: new FaithfulDevote('druid'),
				[RoleAbilityName.wildEmpathy]: new WildEmpathy(),
				[RoleAbilityName.druidSpells]: new DruidSpells(chosenSpells, chosenSchools),
			},
		});
	}

	protected override serializeSpecific(): SerializedDruid {
		return {
			name: this.name,
		};
	}
}
