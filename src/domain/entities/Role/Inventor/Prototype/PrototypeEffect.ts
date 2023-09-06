import {PassiveEffect} from '../../../Ability';
import {AddEquipment} from '../../../Action/AddEquipment';
import {type Equipment} from '../../../Inventory';
import {type EquipmentAlchemic} from '../../../Inventory/Equipment/EquipmentAlchemic/EquipmentAlchemic';
import {type EquipmentImprovement} from '../../../Inventory/Equipment/EquipmentImprovement/EquipmentImprovement';
import {type TransactionInterface} from '../../../Sheet/TransactionInterface';
import {RoleAbilityName} from '../../RoleAbilityName';

export type PrototypeParams = {
	equipment: Equipment;
	improvement: EquipmentImprovement;
	choice: 'superiorItem';
} | {
	alchemicItems: EquipmentAlchemic[];
	choice: 'alchemicItems';
};

export class PrototypeEffect extends PassiveEffect {
	override description: string = 'Você começa o jogo com um item'
  + ' superior, ou com 10 itens alquímicos, com preço total'
  + ' de até T$ 500. Veja o Capítulo 3: Equipamento'
  + ' para a lista de itens.';

	readonly payload: PrototypeParams;

	constructor(params: PrototypeParams) {
		super(RoleAbilityName.prototype);
		this.payload = params;

		if (params.choice === 'superiorItem') {
			params.equipment.addImprovement(params.improvement);
		}
	}

	override apply(transaction: TransactionInterface): void {
		if (this.payload.choice === 'superiorItem') {
			transaction.run(new AddEquipment({
				payload: {
					equipment: this.payload.equipment,
					source: this.source,
				},
				transaction,
			}));
		} else {
			this.payload.alchemicItems.forEach(item => {
				transaction.run(new AddEquipment({
					payload: {
						equipment: item,
						source: this.source,
					},
					transaction,
				}));
			});
		}
	}
}
