import { About } from "./about";
import { Contact } from "./contact";
import { KindOfDataResponse } from "./enum";

export interface Collection {

      sort(arg0: (a: Collection, b: Collection) => 0 | 1 | -1): any;
      filter(arg0: (item: any) => boolean): any;
     
      id: number,
      kindOf: KindOfDataResponse,
      company: string,
      title: string,
      description: string,
      price: number,
      sex: string,
      large_img_1: string,
      large_img_2: string,
      large_img_3: string,
      large_img_4: string,
      small_img_1: string,
      small_img_2: string,
      small_img_3: string,
      small_img_4: string,
      about: About,
      contact: Contact
}
