import { v, w } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import {uuid} from '@dojo/framework/core/util';
import {
	SpacingProperties,
	FlexItemProperties,
	FloatProperties,
	FormProperties,
	MessageProperties,
	DisplayProperties
} from '../common/interfaces';
import {
	renderMessageNode,
	formSizeMap,
	getSpacingClasses,
	getFlexItemClasses,
	getFloatClass,
	getDisplayClass
} from '../common/util';

import * as css from './styles/checkbox.m.css';
import Label from '../label';

/**
 * @type CheckboxProperties
 *
 * Properties that can be set on checkbox components
 */
export interface CheckboxProperties
	extends SpacingProperties,
		FlexItemProperties,
		FloatProperties,
		FormProperties,
		MessageProperties,
		DisplayProperties,
		ThemedProperties {
	widgetId?: string;
	name?: string;
	value?: string;
	checked?: boolean | string;
	label?: string;
	labelAfter?: boolean | string;
	fluid?: boolean | string;
	size?: string;
	isInAddon?: boolean; // 当将 Checkbox 作为 Addon 的子部件时，要设置 isInAddon 为 true, 默认为 false
	onClick?(value: string, checked: boolean): void;
}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<CheckboxProperties>({
	tag: 'db-checkbox',
	attributes: [
		'widgetId',
		'name',
		'value',
		'checked',
		'label',
		'labelAfter',
		'required',
		'disabled',
		'readOnly',
		'fluid',
		'size',
		'invalidMessage',
		'validMessage',
		'isInAddon',
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
		'display',
		'float'
	],
	properties: [],
	events: ['onClick']
})
@theme(css)
export class CheckboxBase<P extends CheckboxProperties = CheckboxProperties> extends ThemedBase<P> {
	private _onClick(event: MouseEvent) {
		event.stopPropagation();
		const radio = event.target as HTMLInputElement;
		this.properties.onClick && this.properties.onClick(radio.value, radio.checked);
	}

	private _uuid: string;

	protected getKey() {
		return 'checkbox';
	}

	constructor() {
		super();
		this._uuid = uuid();
	}

	protected renderCheckbox(): DNode {
		let { widgetId = this._uuid, name, value, checked, disabled, required, readOnly } = this.properties;

		const cssClasses: string[] = [];

		if (disabled === true || disabled === 'true') {
			cssClasses.push('disabled');
		}

		return v('input', {
			type: 'checkbox',
			id: widgetId,
			name,
			value,
			checked: checked === true || checked === 'true',
			disabled: disabled === true || disabled === 'true',
			required: required === true || required === 'true',
			readOnly: readOnly === true || readOnly === 'true',
			classes: ['form-check-input'],
			onclick: this._onClick
		});
	}

	protected render(): DNode | DNode[] {
		const {
			widgetId = this._uuid,
			label,
			size,
			labelAfter,
			fluid,
			display,
			value,
			checked,
			disabled,
			required,
			readOnly,
			isInAddon = false
		} = this.properties;

		if (isInAddon) {
			return v('input', {
				id: widgetId,
				key: this.getKey(),
				type: 'checkbox',
				name,
				value,
				checked: checked === true || checked === 'true',
				disabled: disabled === true || disabled === 'true',
				required: required === true || required === 'true',
				readOnly: readOnly === true || readOnly === 'true',
				classes: [
					size ? formSizeMap[size as string] : undefined,
					...getSpacingClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...getFlexItemClasses(this.properties as FlexItemProperties),
					...getFloatClass(this.properties)
				],
				onclick: this._onClick
			});
		}

		let children: DNode[] = [
			this.renderCheckbox(),
			label ? w(Label, { value: label, forId: widgetId, classes: 'form-check-label' }) : null
		];
		if (labelAfter === false || labelAfter === 'false') {
			children = children.reverse();
		}
		children.push(renderMessageNode(this.properties));

		return v(
			'div',
			{
				key: this.getKey(),
				classes: [
					this.theme(css.root),
					'form-check',
					size ? formSizeMap[size as string] : undefined,
					fluid === true || fluid === 'true' ? undefined : 'form-check-inline',
					...getSpacingClasses(this.properties),
					display ? getDisplayClass(this.properties) : undefined,
					...getFlexItemClasses(this.properties as FlexItemProperties),
					...getFloatClass(this.properties)
				]
			},
			children
		);
	}
}

export default class Checkbox extends CheckboxBase<CheckboxProperties> {}
