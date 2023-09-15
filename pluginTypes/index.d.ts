/// <amd-module name="@scom/scom-stepper/index.css.ts" />
declare module "@scom/scom-stepper/index.css.ts" {
    export const stepperStyle: string;
}
/// <amd-module name="@scom/scom-stepper/interface.ts" />
declare module "@scom/scom-stepper/interface.ts" {
    import { IconName } from "@ijstech/components";
    export interface IIcon {
        name?: IconName;
        width?: number | string;
        height?: number | string;
        image?: {
            url: string;
            width?: number | string;
            height?: number | string;
        };
    }
    export interface IStepperItem {
        name: string;
        icon?: IIcon;
        completed?: boolean;
        active?: boolean;
    }
    export interface IStepper {
        steps: IStepperItem[];
    }
}
/// <amd-module name="@scom/scom-stepper/global/state.ts" />
declare module "@scom/scom-stepper/global/state.ts" {
    import { IStepperItem } from "@scom/scom-stepper/interface.ts";
    export class State {
        private _steps;
        private _activeStep;
        private _furthestStepIndex;
        constructor(data: any);
        get steps(): IStepperItem[];
        set steps(value: IStepperItem[]);
        get currentStep(): IStepperItem;
        get activeStep(): number;
        set activeStep(value: number);
        get furthestStepIndex(): number;
        set furthestStepIndex(value: number);
        getCompleted(index: number): boolean;
        setCompleted(index: number, value: boolean): void;
        getActive(index: number): boolean;
        setActive(index: number, value: boolean): void;
        checkStep(): boolean;
        checkDone(): boolean;
    }
}
/// <amd-module name="@scom/scom-stepper/global/index.ts" />
declare module "@scom/scom-stepper/global/index.ts" {
    export * from "@scom/scom-stepper/global/state.ts";
}
/// <amd-module name="@scom/scom-stepper" />
declare module "@scom/scom-stepper" {
    import { Control, ControlElement, Module } from '@ijstech/components';
    import { IStepperItem } from "@scom/scom-stepper/interface.ts";
    interface ScomStepperElement extends ControlElement {
        steps?: IStepperItem[];
        activeStep?: number;
        finishCaption?: string;
        onChanged?: (target: Control, activeStep: number) => void;
        onBeforeNext?: (target: Control, activeStep: number) => Promise<void>;
        onDone?: (target: Control) => void;
        showNavButtons?: boolean;
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
        private stepElms;
        private btnPrev;
        private btnNext;
        private _activeStep;
        private _steps;
        private _finishCaption;
        private _showNavButtons;
        private state;
        onChanged: (target: Control, activeStep: number) => void;
        onBeforeNext: (target: Control, activeStep: number) => Promise<void>;
        onDone: (target: Control) => void;
        tag: any;
        get activeStep(): number;
        set activeStep(step: number);
        get steps(): IStepperItem[];
        set steps(value: IStepperItem[]);
        get finishCaption(): string;
        set finishCaption(value: string);
        get showNavButtons(): boolean;
        set showNavButtons(value: boolean);
        private get isFinalStep();
        private updateButtonText;
        setTag(value: any): void;
        private updateStyle;
        private updateTheme;
        updateStatus(index: number, value: boolean): void;
        private onPrevious;
        private onNext;
        private onStepChanged;
        private _updateStep;
        private renderDivider;
        private renderIcon;
        private renderSteps;
        init(): void;
        render(): any;
    }
}
