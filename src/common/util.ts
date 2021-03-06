import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import {
	SpacingProperties,
	FlexContainerProperties,
	FlexItemProperties,
	BorderProperties,
	TextProperties,
	ColorsProperties,
	FloatProperties,
	MessageProperties,
	DisplayProperties
} from './interfaces';

import * as css from './base.m.css';

export function getSpacingClasses(properties: SpacingProperties): string[] {
	let {
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight
	} = properties;

	const spacingClasses: string[] = [];

	if (
		marginTop &&
		marginTop != 'default' &&
		marginTop === marginBottom &&
		marginTop === marginLeft &&
		marginTop === marginRight
	) {
		spacingClasses.push(`m-${marginTop}`);
	} else {
		if (marginTop && marginTop != 'default' && marginTop === marginBottom) {
			spacingClasses.push(`my-${marginTop}`);
		} else {
			if (marginTop && marginTop != 'default') {
				spacingClasses.push(`mt-${marginTop}`);
			}

			if (marginBottom && marginBottom != 'default') {
				spacingClasses.push(`mb-${marginBottom}`);
			}
		}

		if (marginLeft && marginLeft != 'default' && marginLeft === marginRight) {
			spacingClasses.push(`mx-${marginLeft}`);
		} else {
			if (marginLeft && marginLeft != 'default') {
				spacingClasses.push(`ml-${marginLeft}`);
			}

			if (marginRight && marginRight != 'default') {
				spacingClasses.push(`mr-${marginRight}`);
			}
		}
	}

	if (
		paddingTop &&
		paddingTop != 'default' &&
		paddingTop === paddingBottom &&
		paddingTop === paddingLeft &&
		paddingTop === paddingRight
	) {
		spacingClasses.push(`p-${paddingTop}`);
	} else {
		if (paddingTop && paddingTop != 'default' && paddingTop === paddingBottom) {
			spacingClasses.push(`py-${paddingTop}`);
		} else {
			if (paddingTop && paddingTop != 'default') {
				spacingClasses.push(`pt-${paddingTop}`);
			}

			if (paddingBottom && paddingBottom != 'default') {
				spacingClasses.push(`pb-${paddingBottom}`);
			}
		}

		if (paddingLeft && paddingLeft != 'default' && paddingLeft === paddingRight) {
			spacingClasses.push(`px-${paddingLeft}`);
		} else {
			if (paddingLeft && paddingLeft != 'default') {
				spacingClasses.push(`pl-${paddingLeft}`);
			}

			if (paddingRight && paddingRight != 'default') {
				spacingClasses.push(`pr-${paddingRight}`);
			}
		}
	}

	return spacingClasses;
}

export function getFlexContainerClasses(properties: FlexContainerProperties): string[] {
	let { flexDirection, reverse, justifyItems, alignItems, flexWrap, alignContent } = properties;

	const flexContainerClasses: string[] = [];

	if (flexDirection && flexDirection != 'default') {
		if (reverse === true || reverse === 'true') {
			flexContainerClasses.push(`flex-${flexDirection}-reverse`);
		} else {
			flexContainerClasses.push(`flex-${flexDirection}`);
		}
	}

	if (justifyItems && justifyItems != 'default') {
		flexContainerClasses.push(`justify-content-${justifyItems}`);
	}

	if (alignItems && alignItems != 'default') {
		flexContainerClasses.push(`align-items-${alignItems}`);
	}

	if (flexWrap && flexWrap != 'default') {
		if (flexWrap == 'reverseWrap') {
			flexContainerClasses.push('flex-wrap-reverse');
		} else {
			flexContainerClasses.push(`flex-${flexWrap}`);
		}
	}

	if (alignContent && alignContent != 'default') {
		flexContainerClasses.push(`align-content-${alignContent}`);
	}

	return flexContainerClasses;
}

export function getFlexItemClasses(properties: FlexItemProperties): string[] {
	let { alignSelf, order } = properties;

	const flexItemClasses: string[] = [];

	if (alignSelf && alignSelf != 'default') {
		flexItemClasses.push(`align-self-${alignSelf}`);
	}

	if ((order && order != 'default') || order === 0) {
		flexItemClasses.push(`order-${order}`);
	}

	return flexItemClasses;
}

export function getBorderClasses(properties: BorderProperties): string[] {
	let { borderLeft, borderTop, borderRight, borderBottom, borderColor, borderRound } = properties;

	let borderClasses: string[] = [];

	if (borderLeft === true || borderLeft === 'true') {
		borderClasses.push('border-left');
	}

	if (borderTop === true || borderTop === 'true') {
		borderClasses.push('border-top');
	}

	if (borderRight === true || borderRight === 'true') {
		borderClasses.push('border-right');
	}

	if (borderBottom === true || borderBottom === 'true') {
		borderClasses.push('border-bottom');
	}

	if (borderClasses.length === 4) {
		borderClasses = ['border'];
	}

	if (borderColor && borderColor != 'default') {
		borderClasses.push(`border-${borderColor}`);
	}

	if (borderRound) {
		if (borderRound === 'default') {
			borderClasses.push('rounded-0');
		} else if (borderRound === 'all') {
			borderClasses.push('rounded');
		} else {
			borderClasses.push(`rounded-${borderRound}`);
		}
	}

	return borderClasses;
}

export function getTextClasses(properties: TextProperties): string[] {
	let { fontWeight, fontItalic, alignment, transform, truncate, wrap } = properties;

	const textClasses: string[] = [];

	if (fontWeight && fontWeight != 'default') {
		textClasses.push(`font-weight-${fontWeight}`);
	}

	if (fontItalic === true || fontItalic === 'true') {
		textClasses.push('font-italic');
	}

	if (alignment && alignment != 'default') {
		textClasses.push(`text-${alignment}`);
	}

	if (transform && transform != 'default') {
		textClasses.push(`text-${transform}`);
	}

	if (truncate && truncate != 'default') {
		textClasses.push('text-truncate');
	}

	if (wrap) {
		textClasses.push('text-nowrap');
	}

	return textClasses;
}

export function getTextStyles(properties: TextProperties) {
	let { truncate, wrap } = properties;

	let textStyles: any = {};

	if (truncate && truncate != 'default') {
		if (typeof truncate == 'number') {
			textStyles.maxWidth = `${truncate}px`;
		} else {
			textStyles.maxWidth = `${truncate}`;
		}
	}

	if (wrap) {
		textStyles.width = `${wrap}rem`;
	}

	return textStyles;
}

type baseCssType = keyof typeof css;

export const textDecorationMap: { [key: string]: string } = {
	underline: 'textDecorationUnderline',
	overline: 'textDecorationOverline',
	lineThrough: 'textDecorationLineThrough',
	default: ''
};

export function getTextDecorationClass(properties: TextProperties): string[] {
	let { textDecoration } = properties;

	let textClasses: string[] = [];

	if (textDecoration && textDecoration !== 'default') {
		const textDecorationClass = textDecorationMap[textDecoration];
		textClasses.push(css[textDecorationClass as baseCssType]);
	}

	return textClasses;
}

export function getColorsClasses(properties: ColorsProperties): string[] {
	let { textColor, backgroundColor } = properties;

	const colorsClasses: string[] = [];

	if (textColor && textColor !== 'default') {
		colorsClasses.push(`text-${textColor}`);
	}

	if (backgroundColor && backgroundColor !== 'default') {
		colorsClasses.push(`bg-${backgroundColor}`);
	}

	return colorsClasses;
}

export function getFloatClass(properties: FloatProperties): string[] {
	let { float } = properties;
	const floatClasses: string[] = [];

	if (float && float !== 'default') {
		floatClasses.push(`float-${float}`);
	}

	return floatClasses;
}

export function renderMessageNode(properties: MessageProperties): DNode {
	const { invalidMessage, validMessage } = properties;

	if (!invalidMessage && !validMessage) {
		return null;
	}

	return v(
		'div',
		{
			classes: [invalidMessage ? 'invalid-tooltip' : validMessage ? 'valid-tooltip' : '']
		},
		[invalidMessage ? invalidMessage : validMessage ? validMessage : '']
	);
}

export const formSizeMap: { [key: string]: string } = {
	small: 'form-control-sm',
	large: 'form-control-lg',
	default: ''
};

export const displayMap: { [key: string]: string } = {
	none: 'd-none',
	inline: 'd-inline',
	inlineBlock: 'd-inline-block',
	block: 'd-block',
	table: 'd-table',
	tableCell: 'd-table-cell',
	tableRow: 'd-table-row',
	flex: 'd-flex',
	inlineFlex: 'd-inline-flex',
	default: ''
};

export function getDisplayClass(properties: DisplayProperties): string | undefined {
	const { display } = properties;

	return displayMap[display as string] || undefined;
}
