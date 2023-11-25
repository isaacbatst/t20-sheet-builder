import {TriggerEvent, TriggeredEffect, TriggeredEffectName, type TriggeredEffectDisableParams, type TriggeredEffectEnableParams} from '../../../Ability';
import {type SpecialistActivation} from '../../../Ability/TriggeredEffectActivation';
import {ManaCost} from '../../../ManaCost';
import {FixedModifier} from '../../../Modifier';
import {type Cost} from '../../../Sheet';
import {type SkillName} from '../../../Skill';
import {RoleAbilityName} from '../../RoleAbilityName';

export class SpecialistEffect extends TriggeredEffect {
	override readonly baseCosts: Cost[] = [new ManaCost(1)];
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

	override enable({modifiersIndexes, modifiers}: TriggeredEffectEnableParams, activation: SpecialistActivation): {manaCost?: ManaCost | undefined} {
		const skillName = activation.skill.getName();
		if (!this.skills.has(skillName)) {
			throw new Error('INVALID_SPECIALIST_SKILL');
		}

		const trainingPoints = activation.skill.getTrainingPoints();
		const modifier = new FixedModifier(RoleAbilityName.specialist, trainingPoints);
		modifiersIndexes.skillExceptAttack = modifiers.skillExceptAttack?.fixed.add(modifier);

		return {
			manaCost: this.baseCosts[0] as ManaCost,
		};
	}

	override disable({modifiersIndexes, modifiers}: TriggeredEffectDisableParams): void {
		if (modifiersIndexes.skillExceptAttack) {
			modifiers.skillExceptAttack?.fixed.remove(modifiersIndexes.skillExceptAttack);
		}
	}
}
