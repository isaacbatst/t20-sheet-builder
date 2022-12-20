import type {CharacterInterface} from '../CharacterInterface';
import {SkillNameEnum} from '../Skill/SkillName';

export class DodgeAppliance {
	static generate(character: CharacterInterface) {
		const defense = character.getDefenseTotal();
		const reflexes = character.getSkillTotal(SkillNameEnum.reflexes);
		return `Esquiva: você recebe +2 na defesa (${defense}) e reflexos (${reflexes}).`;
	}
}
