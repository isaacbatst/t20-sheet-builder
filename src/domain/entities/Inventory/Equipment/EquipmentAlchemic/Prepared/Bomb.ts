import {EquipmentName} from '../../EquipmentName';
import {EquipmentAlchemic} from '../EquipmentAlchemic';
import {EquipmentAlchemicCategory} from '../EquipmentAlchemicCategory';

export class Bomb extends EquipmentAlchemic {
	override alchemicCategory: EquipmentAlchemicCategory = EquipmentAlchemicCategory.prepared;
	override price = 50;
	override description: string = 'Uma granada rudimentar. Para usar a'
  + ' bomba, você precisa empunhá-la, gastar uma ação de'
  + ' movimento para acender seu pavio e uma ação padrão'
  + ' para arremessá-la em um ponto em alcance curto.'
  + ' Criaturas a até 3m desse ponto sofrem 6d6 pontos de'
  + ' dano de impacto (Reflexos CD Des reduz à metade).';

	override name: EquipmentName = EquipmentName.bomb;
	override isWieldable = true;
}
