import {Proficiency} from '../../Sheet';
import {SkillName} from '../../Skill';
import {Role} from '../Role';
import {type RoleAbilitiesPerLevel} from '../RoleAbilitiesPerLevel';
import {RoleAbilitiesPerLevelFactory} from '../RoleAbilitiesPerLevelFactory';
import {RoleName} from '../RoleName';
import {type SerializedNoble} from '../SerializedRole';

// Pontos de Vida. Um nobre começa com
// 16 pontos de vida + Constituição e ganha 4 PV +
// Constituição por nível.
// Pontos de Mana. 4 PM por nível.
// Perícias. Diplomacia (Car) ou Intimidação
// (Car), Vontade (Sab), mais 4 a sua escolha entre
// Adestramento (Car), Atuação (Car), Cavalgar (Des),
// Conhecimento (Int), Diplomacia (Car), Enganação
// (Car), Fortitude (Con), Guerra (Int), Iniciativa
// (Des), Intimidação (Car), Intuição (Sab), Investigação
// (Int), Jogatina (Car), Luta (For), Nobreza (Int),
// Ofício (Int), Percepção (Sab) e Pontaria (Des).
// Proficiências. Armas marciais, armaduras
// pesadas e escudos.

export class Noble extends Role<SerializedNoble> {
	static selectSkillGroups = [
		{
			amount: 2,
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

	override initialLifePoints = 16;
	override lifePointsPerLevel = 4;
	override manaPerLevel = 4;
	override mandatorySkills: SkillName[] = [SkillName.will];
	override proficiencies: Proficiency[] = [
		Proficiency.martial,
		Proficiency.heavyArmor,
		Proficiency.shield,
	];

	override readonly name = RoleName.noble;
	override abilitiesPerLevel: RoleAbilitiesPerLevel = RoleAbilitiesPerLevelFactory.make({});

	constructor(chosenSkills: SkillName[]) {
		super(chosenSkills, Noble.selectSkillGroups);
	}

	protected override serializeSpecific(): SerializedNoble {
		return {
			name: this.name,
		};
	}
}
