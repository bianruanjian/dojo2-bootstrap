---
title: TabController
layout: components
footer: false
date: 2018-08-27 14:00:00
tags:
---

选项卡面板部件

## 属性

| 名称  | 说明 | 默认值 | 可选值 | 值类型 |
| ----- | ------ | ----- | ----- | --------- |
| activeIndex | 默认激活的选项卡的索引，从0开始 | | | number |
| alignButtons | 选项卡按钮的布局方向 | top | bottom, left, right, top | string |

## 事件

| 名称  | 参数 | 描述 |
| ----- | ------ | ----- |
| onRequestTabChange | 新选中选项卡的索引，新选中选项卡的 key | 切换新的选项卡时触发 |
| onRequestTabClose | 新选中选项卡的索引，新选中选项卡的 key | 关闭选项卡时触发 |