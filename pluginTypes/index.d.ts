/// <amd-module name="@scom/scom-flow/index.css.ts" />
declare module "@scom/scom-flow/index.css.ts" {
    export const stepperStyle: string;
}
/// <amd-module name="@scom/scom-flow/interface.ts" />
declare module "@scom/scom-flow/interface.ts" {
    export interface IItem {
        name: string;
    }
    export interface IStepper {
        steps: IItem[];
    }
}
/// <amd-module name="@scom/scom-flow" />
declare module "@scom/scom-flow" {
    import { Control, ControlElement, Module } from '@ijstech/components';
    import { IItem } from "@scom/scom-flow/interface.ts";
    interface ScomFlowElement extends ControlElement {
        steps?: IItem[];
        activeStep?: number;
        onChanged?: (target: Control, activeStep: number) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-flow']: ScomFlowElement;
            }
        }
    }
    export default class ScomFlow extends Module {
        private pnlStepper;
        private _activeStep;
        private _steps;
        onChanged: (target: Control, activeStep: number) => void;
        get activeStep(): number;
        set activeStep(step: number);
        set steps(value: IItem[]);
        previous(): void;
        next(): void;
        private _updateStep;
        private renderDivider;
        private renderSteps;
        init(): void;
        render(): any;
    }
}
