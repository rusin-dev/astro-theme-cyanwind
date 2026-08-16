// Luogu markdown 插件（挂件）的 Astro 实现。
//
// 语法与洛谷/Hexo 插件一致：
//   :::info[标题]{open} / :::warning / :::success / :::error / :::bug / :::flask
//   :::align{left|center|right}
//   :::epigraph[作者]
//   （支持 :::: 多层嵌套，代码块内的 ::: 不会被转换）
//
// 分两个阶段：
//   1. remarkLuoguBlocks（remark 阶段，运行在 remark-directive 之后）：
//      把指令标记为已知的 hast 元素并保留属性，标记 [标题] 段落。
//   2. rehypeLuoguBlocks（rehype 阶段，运行在 remark-rehype 之后）：
//      把标记的元素转换成最终的 details / div 结构。

import type { Root as HastRoot } from 'hast'
import { h } from 'hastscript'
import type { Root as MdastRoot } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/** 可折叠容器的类型。 */
const foldableTypes = ['info', 'warning', 'success', 'error', 'bug', 'flask']
/** 对齐指令支持的取值。 */
const alignDirs = ['left', 'center', 'right']
/** 标记用的中间类名（会在 rehype 阶段被移除）。 */
const directiveClass = 'directive'
const directiveLabelClass = 'directive-label'

const getClassList = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string')
  if (typeof value === 'string') return value.split(/\s+/)
  return []
}

/** 把 hast 子节点拼接成纯文本（用于取 [标题] 的文本）。 */
const isText = (child: import('hast').ElementContent): child is { type: 'text'; value: string } =>
  child.type === 'text'

const stringifyText = (children: import('hast').ElementContent[]): string =>
  String(
    children
      .filter(isText)
      .map((c) => c.value)
      .join('')
      .trim()
  )

/** remark 阶段：标记指令并保留属性。 */
export const remarkLuoguBlocks: Plugin<[], MdastRoot> = function () {
  return function (tree) {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') return
      const { attributes } = node
      const data = node.data || (node.data = {})

      // 保留用户写的 {open}、{class=...} 等属性，并打上指令标记
      const { class: userClass, ...rest } = attributes || {}
      const classes = [...getClassList(userClass), directiveClass, `directive-${node.name}`]
      data.hName = 'div'
      data.hProperties = { class: classes, ...rest }

      // 标记 [标题] 段落（remark-directive 会把 label 放进带 directiveLabel 标记的段落）
      const first = node.children[0]
      if (first && first.type === 'paragraph' && first.data?.directiveLabel) {
        const d = first.data || (first.data = {})
        d.hProperties = { ...(d.hProperties || {}), class: directiveLabelClass }
      }
    })
  }
}

/** rehype 阶段：把标记的 div 转换为挂件 HTML。 */
export const rehypeLuoguBlocks: Plugin<[], HastRoot> = function () {
  return function (tree) {
    visit(tree, 'element', (node) => {
      const classes = getClassList(node.properties?.class)
      if (!classes.includes(directiveClass)) return
      const name = classes.find((c) => c.startsWith(`directive-`))?.slice(`directive-`.length)
      if (!name) return

      const children = node.children ?? []
      const labelIdx = children.findIndex(
        (child) =>
          child.type === 'element' &&
          getClassList(child.properties?.class).includes(directiveLabelClass)
      )
      const labelEl = labelIdx >= 0 ? children[labelIdx] : undefined
      const bodyChildren = children.filter((_, i) => i !== labelIdx)
      const labelText = labelEl?.type === 'element' ? stringifyText(labelEl.children) : ''

      const properties = node.properties || {}

      if (foldableTypes.includes(name)) {
        const open = 'open' in properties
        node.tagName = 'details'
        node.properties = { class: ['foldable', name], ...(open ? { open: true } : {}) }
        node.children = [h('summary', labelText || '详情'), h('div', bodyChildren)]
        return
      }

      if (name === 'align') {
        const dir = alignDirs.find((d) => d in properties) || 'left'
        node.tagName = 'div'
        node.properties = { class: [`align-${dir}`] }
        node.children = bodyChildren
        return
      }

      if (name === 'epigraph') {
        node.tagName = 'div'
        node.properties = { class: ['epigraph'] }
        node.children = [...bodyChildren]
        if (labelText) node.children.push(h('p', { class: 'epigraph-author' }, labelText))
        return
      }
    })
  }
}
