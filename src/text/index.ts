import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { customElement } from '@dojo/widget-core/decorators/customElement';
import { CustomElementChildType } from '@dojo/widget-core/registerCustomElement';
import { SpacingProperties, TextProperties, ColorsProperties } from '../common/interfaces';

import * as css from './styles/text.m.css';
import { getSpacingClasses, getTextClasses, getTextDecorationClass, getColorsClasses, getTextStyles } from '../common/util';
/**
 * @type TextWidgetProperties
 *
 * Properties that can be set on text components
 */
export interface TextWidgetProperties extends SpacingProperties, TextProperties, ColorsProperties {
	widgetId?: string;
	value?: string;
	type?: string;
};

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement<TextWidgetProperties>({
	tag: 'db-text',
	childType: CustomElementChildType.TEXT,
	attributes: [
		'widgetId',
		'value',
		'type',
		'marginTop',
		'marginBottom',
		'marginLeft',
		'marginRight',
		'paddingTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
		'fontWeight',
		'fontItalic',
		'textDecoration',
		'alignment',
		'transform',
		'truncate',
		'wrap',
		'textColor',
		'backgroundColor'
	],
	properties: [],
	events: []
})
@theme(css)
export class Text<P extends TextWidgetProperties = TextWidgetProperties> extends ThemedBase<P> {

	protected render(): DNode | DNode[] {
		let {
			widgetId,
			value,
			type
		} = this.properties;

		let tag: string = 'span';
		let cssClasses: string[] = [];

		if(type && type !== "text"){
			if(type === "lead"){
				tag = 'p';
				cssClasses.push('lead');
			} else {
				tag = type as string;
			}
		}

		return v(
			tag,
			{
				id: widgetId,
				classes: cssClasses.concat([
					...getSpacingClasses(this.properties),
					...getTextClasses(this.properties),
					...getTextDecorationClass(this.properties),
					...getColorsClasses(this.properties)
				]),
				styles: {
					...getTextStyles(this.properties)
				}
			},
			value ? this.children.concat([value]) : this.children
		);
	}
}

export default Text;
