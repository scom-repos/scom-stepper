import { Module, customModule, Container } from '@ijstech/components';
import ScomStepper from '@scom/scom-stepper';

@customModule
export default class Module1 extends Module {
    private _steps: any[] = []
    private stepper: ScomStepper
    constructor(parent?: Container, options?: any) {
        super(parent, options);
        this._steps = [
            {
                name: "General Information"
            },
            {
                name: "Commission Offer"
            },
            {
                name: "Widget Properties"
            }
        ]
    }

    private onStepperChanged() {
        console.log(this.stepper.activeStep)
    }

    async init() {
        super.init();
    }

    render() {
        return <i-panel margin={{left: '1rem', top: '1rem'}}>
            <i-scom-stepper
                id="stepper"
                steps={this._steps}
                onChanged={this.onStepperChanged.bind(this)}
            />
        </i-panel>
    }
}