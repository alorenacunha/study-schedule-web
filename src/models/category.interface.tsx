import { InfoObject } from './infoObject.interface';

export interface Category extends InfoObject {
  parent?: InfoObject;
}
