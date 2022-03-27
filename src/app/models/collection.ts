import { About } from './about';
import { Contact } from './contact';
import { KindOfDataResponse } from './enum';
import { LargeImage, SmallImage } from './Image';

export interface Collection {
  sort(arg0: (a: Collection, b: Collection) => 0 | 1 | -1): any;
  filter(arg0: (item: any) => boolean): any;

  company: string;
  description: string;
  id: number;
  kindOf: KindOfDataResponse;
  large_img: LargeImage;
  price: number;
  sex: string;
  small_img: SmallImage;
  title: string;

  about: About;
  contact: Contact;
}
