import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { Label } from '../label';
import {
	SpacingProperties,
	FlexItemProperties,
	FloatProperties,
	FormProperties,
	MessageProperties
} from '../common/interfaces';
import { formSizeMap, getSpacingClasses, getFlexItemClasses, getFloatClass, renderMessageNode } from '../common/util';

import * as css from './styles/select.m.css';

/**
 * @type SelectProperties
 *
 * Properties that can be set on select components
 */
export interface SelectProperties
	extends SpacingProperties,
		FlexItemProperties,
		FloatProperties,
		FormProperties,
		MessageProperties {
	widgetId?: string;
	name?: string;
	value?: string;
	label?: string;
	// TODO: 使用 string 类型还是 any[] 类型
	options?: string;
	labelField?: string;
	valueField?: string;
	dataPath?: string;
	size?: string;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<SelectProperties>({
	tag: 'db-select',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'name',
		'value',
		'label',
		'disabled',
		'required',
		'readOnly',
		'options',
		'labelField',
		'valueField',
		'dataPath',
		'size',
		'invalidMessage',
		'validMessage',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
		'alignSelf',
		'order',
		'float'
	],
	properties: [],
	events: []
})
@theme(css)
export class Select<P extends SelectProperties = SelectProperties> extends ThemedBase<P> {
	protected renderSelect(): DNode {
		const {
			widgetId,
			name,
			value,
			disabled,
			required,
			readOnly,
			options,
			labelField,
			valueField,
			dataPath,
			size
		} = this.properties;

		const cssClasses: string[] = [];

		if (disabled === true || disabled === 'true') {
			cssClasses.push('disabled');
		}

		if (size) {
			cssClasses.push(formSizeMap[size as string]);
		}

		cssClasses.push('form-control');

		let children: DNode[] = [];

		if (options) {
			// 不使用 JSON.parse() 将 json 转为数组的原因是 JSON.parse() 不支持单引号,且不支持转义符
			let optionJson: any[] = eval(options as string);
			children = optionJson.map((option, index) => {
				return v(
					'option',
					{
						value: option[valueField],
						selected: value && value === option[valueField]
					},
					[option[labelField]]
				);
			});
		}

		if (dataPath) {
			//TODO: 发送请求，获取数据，暂时不处理
		}

		return v(
			'select',
			{
				id: widgetId,
				key: 'select',
				name,
				disabled: disabled === true || disabled === 'true',
				required: required === true || required === 'true',
				readOnly: readOnly === true || readOnly === 'true',
				classes: [
					...cssClasses,
					...getSpacingClasses(this.properties),
					...getFlexItemClasses(this.properties),
					...getFloatClass(this.properties)
				]
			},
			children
		);
	}

	protected renderSelectWrapper(): DNode[] {
		return [this.renderSelect(), renderMessageNode(this.properties)];
	}

	protected render(): DNode | DNode[] {
		const { widgetId, label } = this.properties;

		return [
			label
				? w(
						Label,
						{
							value: label,
							forId: widgetId
						},
						[]
				  )
				: null,
			...this.renderSelectWrapper()
		];
	}
}

export default Select;