import {
  Control,
  ControlElement,
  customElements,
  HStack,
  Module,
  Styles,
  VStack,
} from '@ijstech/components';
import { stepperStyle } from './index.css';
import { IStepperItem } from './interface';

const Theme = Styles.Theme.ThemeVars;

interface ScomStepperElement extends ControlElement {
  steps?: IStepperItem[];
  activeStep?: number;
  onChanged?: (target: Control, activeStep: number) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-stepper']: ScomStepperElement;
    }
  }
}

@customElements('i-scom-stepper')
export default class ScomStepper extends Module {
  private pnlStepper: HStack;

  private _activeStep: number = 0;
  private _steps: VStack[];
  public onChanged: (target: Control, activeStep: number) => void;

  get activeStep(): number {
    return this._activeStep;
  }

  set activeStep(step: number) {
    if (this._activeStep === step) return;
    if (this._steps && this._steps.length) {
      const activeStep = this._steps[this._activeStep];
      const targetStep = this._steps[step];
      if (activeStep) activeStep.classList.remove('--active');
      if (targetStep) targetStep.classList.add('--active');
    }
    this._activeStep = step;
  }

  set steps(value: IStepperItem[]) {
    this.renderSteps(value);
  }

  previous() {
    if (this.activeStep <= 0) return;
    this._updateStep(this.activeStep - 1);
  }

  next() {
    if (this.activeStep >= this._steps.length - 1) return;
    this._updateStep(this.activeStep + 1);
  }

  private _updateStep(step: number) {
    this.activeStep = step;
    if (this.onChanged) this.onChanged(this, this.activeStep);
  }

  private renderDivider() {
    return (
      <i-panel position="absolute" top="1rem" left="calc(-50% + 1rem)" right="calc(50% + 1rem)">
        <i-panel border={{ bottom: { width: 1, style: 'solid', color: Theme.divider } }}></i-panel>
      </i-panel>
    );
  }

  private renderSteps(steps: IStepperItem[]) {
    this.pnlStepper.clearInnerHTML();
    this._steps = [];
    steps.forEach((item, i) => {
      const divider = i > 0 ? this.renderDivider() : [];
      const step = (
        <i-vstack
          class={'step' + (i == this.activeStep ? ' --active' : '')}
          position="relative"
          padding={{ left: '0.5rem', right: '0.5rem' }}
          stack={{ grow: '1', shrink: '1', basis: '0%' }}
          horizontalAlignment="center"
          gap="1rem"
          onClick={() => this._updateStep(i)}
        >
          {divider}
          <i-panel>
            <i-hstack
              class="step-icon"
              width="2rem"
              height="2rem"
              background={{ color: Theme.action.disabled }}
              border={{ radius: '50%' }}
              horizontalAlignment="center"
              verticalAlignment="center"
            >
              <i-label
                class="step-label"
                caption={(i + 1).toString()}
                font={{ size: '0.875rem', color: Theme.text.secondary }}
              ></i-label>
            </i-hstack>
          </i-panel>
          <i-panel class="text-center step-label-container" width="100%">
            <i-label
              class="step-label"
              caption={item.name}
              font={{ size: '0.875rem', color: Theme.text.secondary }}
            ></i-label>
          </i-panel>
        </i-vstack>
      );
      this.pnlStepper.append(step);
      this._steps.push(step);
    });
  }

  init() {
    this._updateStep = this._updateStep.bind(this);
    super.init();
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    const steps = this.getAttribute('steps', true);
    if (steps) this.steps = steps;
    const activeStep = this.getAttribute('activeStep', true);
    if (activeStep !== undefined) this.activeStep = activeStep;
  }

  render() {
    return <i-hstack id="pnlStepper" class={stepperStyle} position="relative"></i-hstack>;
  }
}
