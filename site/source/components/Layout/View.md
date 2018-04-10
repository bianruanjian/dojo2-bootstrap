---
title: View
date: 2018-04-09 14:23:33
layout: components
footer: false
tags:
---

页面布局容器，可灵活设置容器的宽度、边框样式、内间距、外间距和字体样式等。

## 通用属性

1. [Border](../Utilities/Border.html)
1. [Spacing](../Utilities/Spacing.html)
1. [Text](../Utilities/Text.html)

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| widgetId | 标识 | | | string |
| maxWidth | 最大宽度 | | | number/undefined |

1. `maxWidth`属性的值为数字时，设置最大宽度；不设置值时铺满全屏。

## 示例

固定宽度

<db-view>水平居中</db-view>

```html
<db-view>
水平居中
</db-view>
```