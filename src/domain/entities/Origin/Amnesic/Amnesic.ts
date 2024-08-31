import {type Equipment, type EquipmentName} from '../../Inventory';
import {type GeneralPowerName, OriginPowerName} from '../../Power';
import {type SkillName} from '../../Skill';
import {Origin} from '../Origin';
import {type SerializedOriginBenefitsAmnesic} from '../OriginBenefit';
import {OriginName} from '../OriginName';
import {type SerializedAmnesic} from '../SerializedOrigin';

export class Amnesic extends Origin<SerializedOriginBenefitsAmnesic, SerializedAmnesic> {
	static equipments = 'Um ou mais itens (somando até T$ 500), aprovados pelo mestre, que podem ser uma pista misteriosa do seu passado.';
	static skills: SkillName[] = [];
	static generalPowers: GeneralPowerName[] = [];
	static readonly originPower = OriginPowerName.gradualMemories;

	override readonly name = OriginName.amnesic;

	constructor(
		equipments: Equipment[],
	) {
		super([], {
			skills: Amnesic.skills,
			generalPowers: Amnesic.generalPowers,
			originPower: Amnesic.originPower,
		}, equipments);
	}

	override serialize(): SerializedAmnesic {
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
