import {Level, Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {type Spell} from '../../Spell';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleAbilityName} from '../RoleAbilityName';
import {type SelectSkillGroup} from '../RoleInterface';
import {RoleName} from '../RoleName';
import {type SerializedCleric} from '../SerializedRole';
import {ClericSpells} from './ClericSpells/ClericSpells';
import {FaithfulDevote} from './FaithfulDevote/FaithfulDevote';

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

	static initialLifePoints = 16;
	static lifePointsPerLevel = 4;
	static manaPerLevel = 5;
	static mandatorySkills: SkillName[] = [SkillName.religion, SkillName.will];
	static proficiencies: Proficiency[] = [Proficiency.heavyArmor, Proficiency.shield];
	static readonly roleName = RoleName.cleric;

	override initialLifePoints = Cleric.initialLifePoints;
	override lifePointsPerLevel = Cleric.lifePointsPerLevel;
	override manaPerLevel = Cleric.manaPerLevel;
	override mandatorySkills = Cleric.mandatorySkills;
	override proficiencies = Cleric.proficiencies;
	override readonly name = Cleric.roleName;
	override abilitiesPerLevel: RoleAbilitiesPerLevel;
	constructor(chosenSkills: SkillName[][], chosenSpells: Spell[]) {
		super(chosenSkills, Cleric.selectSkillGroups);
		this.abilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({
			[Level.one]: {
				[RoleAbilityName.faithfulDevote]: new FaithfulDevote(),
				[RoleAbilityName.clericSpells]: new ClericSpells(chosenSpells),
			},
		});
	}

	protected override serializeSpecific(): SerializedCleric {
		return {
			name: this.name,
		};
	}
}
