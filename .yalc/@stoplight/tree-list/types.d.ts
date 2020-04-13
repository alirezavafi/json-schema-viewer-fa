import { ErrorBoundaryProps } from '@stoplight/react-error-boundary';
import { Dictionary } from '@stoplight/types';
import { IMenuItemProps } from '@stoplight/ui-kit';
import { FAIconProp } from '@stoplight/ui-kit/FAIcon';
import { IFixedSizeListProps } from '@stoplight/ui-kit/ScrollList';
import { ColorProperty } from 'csstype';
import * as React from 'react';
import { DraggableInstance } from './components';
import { TreeStore } from './store';
import { Tree } from './tree';
export interface ITreeListContext {
    store: TreeStore;
    draggable: DraggableInstance;
}
export interface ITreeListProvider extends ITreeListClassNames {
    store: TreeStore;
}
export declare type TreeListContextMenuGenerator = (node: TreeListNode) => ITreeListContextMenuItem[] | void;
export interface ITreeListProps extends ITreeListProvider, ITreeList {
}
export interface ITreeListClassNames {
    className?: string;
    innerClassName?: string;
    itemClassName?: string;
}
export interface IRowRendererOptions {
    isEdited?: boolean;
    isExpanded?: boolean;
    isExpandable?: boolean;
}
export declare type RowRenderer = (node: TreeListNode<any>, options: IRowRendererOptions) => React.ReactNode;
export declare type RowHeightFn = (node: TreeListNode<any>, index: number) => number;
export interface ITreeList extends ErrorBoundaryProps {
    autoExpandDelay?: number;
    rowHeight?: number | RowHeightFn;
    rowRenderer?: RowRenderer;
    striped?: boolean;
    interactive?: boolean;
    innerPadding?: boolean | number;
    maxRows?: number;
    autoSize?: boolean;
    style?: React.CSSProperties;
    initialScrollOffset?: number;
    onScroll?: IFixedSizeListProps['onScroll'];
    draggable?: boolean;
    canDrag?: (node: TreeListNode) => boolean;
    canDrop?: (node: TreeListNode, parentNode: TreeListParentNode) => boolean;
    generateContextMenu?: TreeListContextMenuGenerator;
}
export interface ITreeListItem {
    index: number;
    data: ITreeListItemData;
    style?: React.CSSProperties;
}
export interface ITreeListItemData extends Pick<ITreeList, 'autoExpandDelay' | 'rowHeight' | 'rowRenderer' | 'canDrag' | 'canDrop' | 'generateContextMenu' | 'striped'> {
    tree: Tree;
    innerPadding?: number;
}
export interface ITreeListContextMenu {
    items: ITreeListContextMenuItem[];
}
export interface ITreeListContextMenuItem extends IMenuItemProps {
    divider?: boolean;
    children?: ITreeListContextMenuItem[];
}
export declare type TreeListMouseEventHandler = (e: React.MouseEvent<HTMLElement>, node: TreeListNode) => void;
export declare type TreeListDropEventHandler = (node: TreeListNode, parentNode: TreeListParentNode) => void;
export declare type TreeListExpandEventHandler = (node: TreeListNode, isExpanded: boolean) => void;
export declare type TreeListEditCompleteEventHandler = (renamedNode: TreeListNode, parentNode: TreeListParentNode) => void;
export declare enum TreeListEvents {
    NodeClick = "node.click",
    NodeMouseEnter = "node.mouseenter",
    NodeMouseLeave = "node.mouseexit",
    NodeDoubleClick = "node.doubleClick",
    NodeCaretClick = "node.caretClick",
    NodeExpand = "node.expand",
    Drop = "drop",
    EditCancel = "edit.cancel",
    ValidationError = "edit.validationError",
    BeforeEditComplete = "edit.beforecomplete",
    AfterEditComplete = "edit.aftercomplete"
}
export interface ITreeListEvents {
    [TreeListEvents.NodeClick]: TreeListMouseEventHandler;
    [TreeListEvents.NodeMouseEnter]: TreeListMouseEventHandler;
    [TreeListEvents.NodeMouseLeave]: TreeListMouseEventHandler;
    [TreeListEvents.NodeDoubleClick]: TreeListMouseEventHandler;
    [TreeListEvents.NodeCaretClick]: TreeListMouseEventHandler;
    [TreeListEvents.NodeExpand]: TreeListExpandEventHandler;
    [TreeListEvents.Drop]: TreeListDropEventHandler;
    [TreeListEvents.EditCancel](): void;
    [TreeListEvents.ValidationError](ex: Error): void;
    [TreeListEvents.BeforeEditComplete]: TreeListEditCompleteEventHandler;
    [TreeListEvents.AfterEditComplete]: TreeListEditCompleteEventHandler;
}
export declare type TreeListNodeType = string;
export interface ITreeListNode<M = unknown> {
    id: string;
    name: string;
    parent: ITreeListNodeWithChildren | null;
    type?: TreeListNodeType;
    metadata?: M;
}
export interface ITreeListNodeWithChildren<M = unknown, C extends TreeListNode = TreeListNode> extends ITreeListNode<M> {
    children: C[];
}
export declare type TreeFragment = TreeListNode[];
export declare type TreeListNode<M = unknown> = ITreeListNode<M> | ITreeListNodeWithChildren<M>;
export declare type TreeListParentNode<M = unknown> = ITreeListNodeWithChildren<M>;
export declare type DeprecatedTreeListNode<T extends object = object> = Omit<TreeListNode, 'parent' | 'children'> & {
    level: number;
    canHaveChildren?: boolean;
    metadata?: T;
};
export declare type NodeValidator = (node: TreeListNode, parentNode: TreeListParentNode) => void | Promise<void>;
export declare type NodeExpandFilter = (node: TreeListNode) => boolean;
export declare type IconStore = Dictionary<ITreeListIcon | ITreeListCustomIcon | null, TreeListNodeType>;
export declare type ITreeListCustomIcon = (node: TreeListNode) => ITreeListIcon | void;
export declare enum TreeListCaretIcons {
    Right = "right",
    Down = "down"
}
export interface ITreeListIcon {
    default: FAIconProp | null;
    expanded?: FAIconProp | null;
    color?: ColorProperty;
}
