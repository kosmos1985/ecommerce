export interface LargeImage{
    filter(arg0: (path: any) => boolean): string;
    large_img : string[];  
      
}

export interface SmallImage{
    filter(arg0: (small: any) => any): unknown;
    small_img: string[];  
    
}