import {
  Button,
  Control,
  ControlElement,
  customElements,
  HStack,
  Module,
  Styles,
  VStack,
} from '@ijstech/components';
import { stepperStyle } from './index.css';
import { IIcon, IStepperItem } from './interface';
import { State } from './global';

const Theme = Styles.Theme.ThemeVars;

interface ScomStepperElement extends ControlElement {
  steps?: IStepperItem[];
  activeStep?: number;
  finishCaption?: string;
  onChanged?: (target: Control, activeStep: number) => void;
  onBeforeNext?: (target: Control, activeStep: number) => Promise<void>;
  onDone?: (target: Control) => void;
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
  private stepElms: VStack[];
  private btnPrev: Button;
  private btnNext: Button;

  private _activeStep: number = 0;
  private _steps: IStepperItem[] = [];
  private _finishCaption: string = '';
  private state: State;

  public onChanged: (target: Control, activeStep: number) => void;
  public onBeforeNext: (target: Control, activeStep: number) => Promise<void>;
  public onDone: (target: Control) => void;
  tag: any = {};

  get activeStep(): number {
    return this._activeStep ?? 0;
  }
  set activeStep(step: number) {
    if (this.stepElms && this.stepElms.length) {
      const maxValue = Math.max(this._activeStep, step);
      for (let i = maxValue; i >= 0; i--) {
        const el = this.stepElms[i];
        if (i <= step) {
          el.classList.add('--active');
          this.state.setActive(i, true);
        } else {
          el.classList.remove('--active');
          this.state.setActive(i, false);
        }
      }
    }
    this._activeStep = step;
    this.state.activeStep = step;
    if (this.btnNext) {
      this.btnNext.visible = this.activeStep < this.steps.length;
      if (this.btnNext.visible) this.updateButtonText();
    }
    if (this.btnPrev) {
      this.btnPrev.visible = this.activeStep > 0 && this.steps.length > 1;
    }
  }

  get steps() {
    return this._steps ?? [];
  }
  set steps(value: IStepperItem[]) {
    this._steps = value;
    this.state.steps = value;
    this.renderSteps(value);
  }

  get finishCaption() {
    return this._finishCaption ?? '';
  }
  set finishCaption(value: string) {
    this._finishCaption = value ?? '';
  }

  private get isFinalStep() {
    return this.activeStep === this.steps.length - 1;
  }

  private updateButtonText() {
    const finishCaption = this.isFinalStep && this.finishCaption;
    this.btnNext.caption = finishCaption || 'Next';
  }

  setTag(value: any) {
    this.tag = value;
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        this.tag[prop] = newValue[prop];
      }
    }
    this.updateTheme();
  }

  private updateStyle(name: string, value: any) {
    value ?
      this.style.setProperty(name, value) :
      this.style.removeProperty(name);
  }

  private updateTheme() {
    this.updateStyle('--text-primary', this.tag?.activeTextColor);
    this.updateStyle('--colors-primary-main', this.tag?.activeBgColor);
    this.updateStyle('--text-secondary', this.tag?.inactiveTextColor);
    this.updateStyle('--action-disabled', this.tag?.inactiveBgColor);
    this.updateStyle('--text-third', this.tag?.completedBgColor);
    this.updateStyle('--colors-success-main', this.tag?.completedTextColor);
  }

  updateStatus(index: number, value: boolean) {
    this.state.setCompleted(index, value);
  }

  private onPrevious() {
    if (this.activeStep <= 0) return;
    this._updateStep(this.activeStep - 1);
  }

  private async onNext() {
    if (this.onBeforeNext) {
      await this.onBeforeNext(this, this.activeStep);
    }
    if (this.state.checkStep()) {
      if (this.isFinalStep) {
        if (this.onDone) this.onDone(this);
      } else {
        this._updateStep(this.activeStep + 1);
        if (this.activeStep > this.state.furthestStepIndex) {
          this.state.furthestStepIndex = this.activeStep;
        }
      }
    }
  }

  private onStepChanged(index: number) {
    if (index > this.state.furthestStepIndex && !this.state.checkStep()) return;
    this._updateStep(index);
  }

  private _updateStep(step: number) {
    this.activeStep = step;
    if (this.onChanged) this.onChanged(this, this.activeStep);
  }

  private renderDivider() {
    return (
      <i-panel position="absolute" top="1rem" left="calc(-50% + 1rem)" right="calc(50% + 1rem)">
        <i-panel border={{ bottom: { width: 1, style: 'solid', color: Theme.divider } }} class="step-divider"></i-panel>
      </i-panel>
    );
  }

  private renderIcon(iconData: IIcon, index: number) {
    if (iconData) {
      const width = iconData?.width ?? 16;
      const height = iconData?.height ?? 16;
      if (iconData.image) {
        <i-icon image={{...iconData.image}} width={width} height={height}></i-icon>
      }
      return <i-icon name={iconData.name} width={width} height={height}></i-icon>
    } else {
      return <i-label
        caption={(index + 1).toString()}
        font={{ size: '0.875rem', color: Theme.text.secondary }}
      ></i-label>
    }
  }

  private renderSteps(steps: IStepperItem[]) {
    this.pnlStepper.clearInnerHTML();
    this.stepElms = [];
    steps.forEach((item, i) => {
      const divider = i > 0 ? this.renderDivider() : [];
      const step = (
        <i-vstack
          class={'step'}
          position="relative"
          padding={{ left: '0.5rem', right: '0.5rem' }}
          stack={{ grow: '1', shrink: '1', basis: '0%' }}
          horizontalAlignment="center"
          gap="1rem"
          onClick={() => this.onStepChanged(i)}
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
              {this.renderIcon(item.icon, i)}
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
      this.stepElms.push(step);
    });
    this.activeStep = this.state.activeStep;
  }

  init() {
    this._updateStep = this._updateStep.bind(this);
    super.init();
    this.state = new State({activeStep: 0, steps: []});
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
    this.onBeforeNext = this.getAttribute('onBeforeNext', true) || this.onBeforeNext;
    this.onDone = this.getAttribute('onDone', true) || this.onDone;
    const steps = this.getAttribute('steps', true);
    if (steps) this.steps = steps;
    const activeStep = this.getAttribute('activeStep', true);
    if (activeStep !== undefined) this.activeStep = activeStep;
    this.finishCaption = this.getAttribute('finishCaption', true, '');
  }

  render() {
    return (
      <i-vstack gap="1rem">
        <i-hstack id="pnlStepper" class={stepperStyle} position="relative"></i-hstack>
        <i-hstack
          horizontalAlignment="space-between" verticalAlignment="center"
          padding={{left: '0.5rem', right: '0.5rem'}}
        >
          <i-panel>
            <i-button
              id="btnPrev"
              caption="Previous"
              padding={{ top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }}
              font={{color: Theme.colors.primary.contrastText}}
              visible={false}
              onClick={this.onPrevious}
            ></i-button>
          </i-panel>
          <i-panel>
            <i-button
              id="btnNext"
              caption="Next"
              padding={{ top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }}
              font={{color: Theme.colors.primary.contrastText}}
              onClick={this.onNext}
            ></i-button>
          </i-panel>
        </i-hstack>
      </i-vstack>
    );
  }
}
