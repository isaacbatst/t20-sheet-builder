import {TriggerEvent, TriggeredEffect, TriggeredEffectName} from '../../../Ability';
import {type TriggeredEffectActivation} from '../../../Ability/TriggeredEffectActivation';
import {type CharacterModifierName} from '../../../Character';
import {ManaCost} from '../../../ManaCost';
import {type Modifiers} from '../../../Modifier';
import {type Cost} from '../../../Sheet';
import {type SkillName} from '../../../Skill';
import {RoleAbilityName} from '../../RoleAbilityName';

export class SpecialistEffect extends TriggeredEffect {
	override baseCosts: Cost[] = [new ManaCost(1)];
	override description: string = 'Escolha um número de perícias'
  + ' treinadas igual a sua Inteligência, exceto bônus'
  + ' temporários (mínimo 1). Ao fazer um teste de uma'
  + ' dessas perícias, você pode gastar 1 PM para dobrar'
  + ' seu bônus de treinamento. Você não pode usar esta'
  + ' habilidade em testes de ataque.';

	private readonly skills = new Set<SkillName>();

	constructor(skills: Set<SkillName>) {
		super({
			duration: 'immediate',
			execution: 'reaction',
			name: TriggeredEffectName.specialist,
			source: RoleAbilityName.specialist,
			triggerEvents: TriggerEvent.skillTestExceptAttack,
		});
		this.skills = skills;
	}

	getSkills() {
		return [
			...this.skills,
		];
	}

	override enable({modifiersIndexes, modifiers}: {modifiers: Partial<Record<CharacterModifierName, Modifiers>>; modifiersIndexes: Partial<Record<CharacterModifierName, number>>}, activation: TriggeredEffectActivation): {manaCost?: ManaCost | undefined} {
		throw new Error('Method not implemented.');
	}

	override disable({modifiersIndexes, modifiers}: {modifiers: Partial<Record<CharacterModifierName, Modifiers>>; modifiersIndexes: Partial<Record<CharacterModifierName, number>>}): void {
		throw new Error('Method not implemented.');
	}
}
