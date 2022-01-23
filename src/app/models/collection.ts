import { About } from "./about";
import { Contact } from "./contact";

export interface Collection {
      filter(arg0: (item: { sex: string; }) => boolean): any;
      sort(arg0: (a: Collection, b: Collection) => 0 | 1 | -1): any;
      id: number,
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
