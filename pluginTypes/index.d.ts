/// <amd-module name="@scom/scom-stepper/index.css.ts" />
declare module "@scom/scom-stepper/index.css.ts" {
    export const stepperStyle: string;
}
/// <amd-module name="@scom/scom-stepper/interface.ts" />
declare module "@scom/scom-stepper/interface.ts" {
    export interface IStepperItem {
        name: string;
    }
    export interface IStepper {
        steps: IStepperItem[];
    }
}
/// <amd-module name="@scom/scom-stepper" />
declare module "@scom/scom-stepper" {
    import { Control, ControlElement, Module } from '@ijstech/components';
    import { IStepperItem } from "@scom/scom-stepper/interface.ts";
    interface ScomStepperElement extends ControlElement {
        steps?: IStepperItem[];
        activeStep?: number;
        onChanged?: (target: Control, activeStep: number) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-stepper']: ScomStepperElement;
            }
        }
    }
    export default class ScomStepper extends Module {
        private pnlStepper;
        private _activeStep;
        private _steps;
        onChanged: (target: Control, activeStep: number) => void;
        get activeStep(): number;
        set activeStep(step: number);
        set steps(value: IStepperItem[]);
        previous(): void;
        next(): void;
        private _updateStep;
        private renderDivider;
        private renderSteps;
        init(): void;
        render(): any;
    }
}
