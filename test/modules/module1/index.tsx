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
                name: "Commission Offer",
                icon: {
                    name: 'check'
                }
            },
            {
                name: "Widget Properties"
            }
        ]
    }

    private onStepperChanged() {
        console.log(this.stepper.activeStep)
    }

    private onCompleted() {
        console.log('Finish')
    }

    init() {
        super.init();
        setTimeout(() => {
            this.stepper.updateStatus(0, true)
            this.stepper.updateStatus(1, true)
            this.stepper.updateStatus(2, true)
        }, 500)
    }

    render() {
        return <i-vstack margin={{left: '1rem', top: '1rem'}}>
            <i-scom-stepper
                id="stepper"
                finishCaption='Finish'
                steps={this._steps}
                onChanged={this.onStepperChanged.bind(this)}
                onDone={this.onCompleted.bind(this)}
            />
        </i-vstack>
    }
}