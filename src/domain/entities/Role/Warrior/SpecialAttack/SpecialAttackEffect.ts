import {TriggerEvent, TriggeredEffect} from '../../../Ability/TriggeredEffect';
import {type SpecialAttackActivation} from '../../../Ability/TriggeredEffectActivation';
import {TriggeredEffectName} from '../../../Ability/TriggeredEffectName';
import {type EnabledEffectModifiersIndexes} from '../../../Character/CharacterAttackTriggeredEffect';
import {type CharacterAttackModifiers} from '../../../Character/CharactterAttackModifiers';
import {ManaCost} from '../../../ManaCost';
import {FixedModifier} from '../../../Modifier/FixedModifier/FixedModifier';
import {Level} from '../../../Sheet/Level';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpecialAttackEffectCosts} from './SpecialAttackManaCost';

export class SpecialAttackEffect extends TriggeredEffect<SpecialAttackActivation> {
	get description() {
		return 'Quando faz um ataque, você pode gastar 1 PM para receber +4 no teste de ataque ou na rolagem de dano. '
		+ 'A cada quatro níveis, pode gastar +1 PM para aumentar o bônus em +4. Você pode dividir os bônus igualmente.';
	}

	static minLevelToCost: Record<SpecialAttackEffectCosts, Level> = {
		[SpecialAttackEffectCosts.oneManaPoint]: Level.one,
		[SpecialAttackEffectCosts.twoManaPoints]: Level.five,
	};

	static costs: Record<SpecialAttackEffectCosts, ManaCost> = {
		[SpecialAttackEffectCosts.oneManaPoint]: new ManaCost(1),
		[SpecialAttackEffectCosts.twoManaPoints]: new ManaCost(2),
	};

	static maxModifier: Record<SpecialAttackEffectCosts, number> = {
		[SpecialAttackEffectCosts.oneManaPoint]: 4,
		[SpecialAttackEffectCosts.twoManaPoints]: 8,
	};

	baseCosts: ManaCost[];

	constructor() {
		super({
			duration: 'next',
			execution: 'reaction',
			source: RoleAbilityName.specialAttack,
			triggerEvent: TriggerEvent.attack,
			name: TriggeredEffectName.specialAttack,
		});
		this.baseCosts = [new ManaCost(1)];
	}

	enable({modifiersIndexes, modifiers}: {
		modifiers: CharacterAttackModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
	}, activation: SpecialAttackActivation): {manaCost?: ManaCost} {
		const manaCost = new ManaCost(activation.mana ?? 1);
		const bonusValue =	this.getBonusFromManaCost(manaCost);
		switch (activation.bonus) {
			case 'attack':
				this.enableAttackBonus({modifiersIndexes, modifiers, bonusValue});
				return {manaCost};
			case 'damage':
				this.enableDamageBonus({modifiersIndexes, modifiers, bonusValue});
				return {manaCost};
			case 'both':
				this.enableSplittedBonus({modifiersIndexes, modifiers, bonusValue});
				return {manaCost};
			default:
				this.enableAttackBonus({modifiersIndexes, modifiers, bonusValue});
				return {manaCost};
		}
	}

	override disable({modifiersIndexes, modifiers}: {modifiers: CharacterAttackModifiers; modifiersIndexes: EnabledEffectModifiersIndexes}): void {
		if (typeof modifiersIndexes.attack === 'number') {
			modifiers.test.fixed.remove(modifiersIndexes.attack);
		}

		if (typeof modifiersIndexes.damage === 'number') {
			modifiers.damage.fixed.remove(modifiersIndexes.damage);
		}
	}

	private enableAttackBonus({modifiersIndexes, modifiers, bonusValue}: {
		modifiers: CharacterAttackModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
		bonusValue: number;
	}) {
		const modifier = new FixedModifier(RoleAbilityName.specialAttack, bonusValue);
		modifiersIndexes.attack = modifiers.test.fixed.add(modifier);
	}

	private enableDamageBonus({modifiersIndexes, modifiers, bonusValue}: {
		modifiers: CharacterAttackModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
		bonusValue: number;
	}) {
		const modifier = new FixedModifier(RoleAbilityName.specialAttack, bonusValue);
		modifiersIndexes.damage = modifiers.damage.fixed.add(modifier);
	}

	private enableSplittedBonus({modifiersIndexes, modifiers, bonusValue}: {
		modifiers: CharacterAttackModifiers;
		modifiersIndexes: EnabledEffectModifiersIndexes;
		bonusValue: number;
	}) {
		const modifier = new FixedModifier(RoleAbilityName.specialAttack, bonusValue / 2);
		modifiersIndexes.attack =	modifiers.test.fixed.add(modifier);
		modifiersIndexes.damage =	 modifiers.damage.fixed.add(modifier);
	}

	private getBonusFromManaCost(manaCost: ManaCost) {
		return manaCost.value * 4;
	}
}
