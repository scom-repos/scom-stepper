import { IStepperItem } from "../interface";

export class State {
  private _steps: IStepperItem[];
  private _activeStep: number;
  private _furthestStepIndex: number;

  constructor(data: any) {
    this._activeStep = data?.activeStep ?? 0;
    this._steps = data?.steps ?? [];
  }

  get steps() {
    return this._steps ?? [];
  }
  set steps(value: IStepperItem[]) {
    this._steps = value;
  }

  get currentStep() {
    return this._steps[this.activeStep];
  }

  get activeStep() {
    return this._activeStep ?? 0;
  }
  set activeStep(value: number) {
    this._activeStep = value;
  }

  get furthestStepIndex() {
    return this._furthestStepIndex ?? 0;
  }
  set furthestStepIndex(value: number) {
    this._furthestStepIndex = value;
  }

  getCompleted(index: number) {
    return this._steps[index]?.completed ?? false;
  }

  setCompleted(index: number, value: boolean) {
    const step = this._steps[index];
    if (step) step.completed = value;
  }

  getActive(index: number) {
    return this._steps[index]?.active ?? false;
  }

  setActive(index: number, value: boolean) {
    const step = this._steps[index];
    if (step) step.active = value;
  }

  checkStep() {
    return this.activeStep < this._steps.length - 1 && this.getCompleted(this.activeStep);
  }

  checkDone() {
    return this.steps.every(step => step.completed);
  }
}
