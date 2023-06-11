interface BigScreen {
    id?: number;
    title: string;
    description?: string;
    bgImg?: string;
    thumb?: string;
    width?: string;
    height?: string;
    bgColor?: string;
    components: Record<string, any>;
    isPublic?: boolean;
    password?: string;
  }
  
    interface Group {
      id?: number | string;
      label: string;
      description?: string;
      parentId?: number | string | undefined | null;
      children?: Group[];
    }

export { Bigscreen, Group };