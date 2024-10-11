export interface ListItem {
  item_id: number;
  content: string;
}

export interface TodoList {
  Items: ListItem[]
}
