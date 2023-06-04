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
  

export { BigscreenItem };