export type TOCItem = {
  url: string;
  title: string;
};

export type TOCItemTree = Array<
  TOCItem & {
    items?: TOCItemTree;
  }
>;
