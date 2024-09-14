import {type Equipment} from '../../Inventory';
import {type GeneralPowerName, OriginPowerName} from '../../Power';
import {type SkillName} from '../../Skill';
import {Origin} from '../Origin';
import {OriginName} from '../OriginName';
import {type SerializedOrigins} from '../SerializedOrigin';

export class Amnesic extends Origin<SerializedOrigins['amnesic']> {
	static equipments = 'Um ou mais itens (somando até T$ 500), aprovados pelo mestre, que podem ser uma pista misteriosa do seu passado.';
	static skills: SkillName[] = [];
	static generalPowers: GeneralPowerName[] = [];
	static readonly originPower = OriginPowerName.gradualMemories;

	constructor(
		equipments: Equipment[],
	) {
		super(OriginName.amnesic, [], {
			skills: Amnesic.skills,
			generalPowers: Amnesic.generalPowers,
			originPower: Amnesic.originPower,
		}, equipments);
	}

	override serialize(): SerializedOrigins['amnesic']['origin'] {
		return {
			name: this.name,
			chosenBenefits: this.serializeBenefits(),
			equipments: this.serializeEquipments(),
		};
	}

	protected override validateChosenBenefits(): void {
		const totalEquipmentsCost = this.equipments.reduce((acc, equipment) => acc + equipment.price, 0);
		if (totalEquipmentsCost > 500) {
			throw new Error('MAX_AMNESIC_EQUIPMENTS_COST_EXCEEDED');
		}
	}
}
