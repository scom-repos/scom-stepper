import { IconName } from "@ijstech/components";

export interface IIcon {
  name?: IconName;
  width?: number|string;
  height?: number|string;
  image?: {
    url: string;
    width?: number|string;
    height?: number|string;
  }
}

export interface IStepperItem {
  name: string;
  icon?: IIcon;
  completed?: boolean;
  active?: boolean;
}

export interface IStepper {
  steps: IStepperItem[]
}
