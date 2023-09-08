var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-stepper/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stepperStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.stepperStyle = components_1.Styles.style({
        $nest: {
            '.step': {
                userSelect: 'none',
                cursor: 'pointer'
            },
            '.step.--active': {
                $nest: {
                    '.step-icon': {
                        background: Theme.colors.primary.main,
                        $nest: {
                            'i-label': {
                                color: `${Theme.colors.primary.contrastText} !important`
                            },
                            'i-icon svg': {
                                fill: `${Theme.colors.primary.contrastText} !important`
                            }
                        }
                    },
                    '.step-label': {
                        color: `${Theme.text.primary} !important`
                    },
                    '.step-label-container > .step-label': {
                        fontWeight: 600
                    },
                    '.step-divider': {
                        borderBottom: `1px solid ${Theme.colors.primary.main} !important`
                    }
                }
            },
            '.step.--done': {}
        }
    });
});
define("@scom/scom-stepper/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-stepper/global/state.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.State = void 0;
    class State {
        constructor(data) {
            var _a, _b;
            this._activeStep = (_a = data === null || data === void 0 ? void 0 : data.activeStep) !== null && _a !== void 0 ? _a : 0;
            this._steps = (_b = data === null || data === void 0 ? void 0 : data.steps) !== null && _b !== void 0 ? _b : [];
        }
        get steps() {
            var _a;
            return (_a = this._steps) !== null && _a !== void 0 ? _a : [];
        }
        set steps(value) {
            this._steps = value;
        }
        get currentStep() {
            return this._steps[this.activeStep];
        }
        get activeStep() {
            var _a;
            return (_a = this._activeStep) !== null && _a !== void 0 ? _a : 0;
        }
        set activeStep(value) {
            this._activeStep = value;
        }
        get furthestStepIndex() {
            var _a;
            return (_a = this._furthestStepIndex) !== null && _a !== void 0 ? _a : 0;
        }
        set furthestStepIndex(value) {
            this._furthestStepIndex = value;
        }
        getCompleted(index) {
            var _a, _b;
            return (_b = (_a = this._steps[index]) === null || _a === void 0 ? void 0 : _a.completed) !== null && _b !== void 0 ? _b : false;
        }
        setCompleted(index, value) {
            const step = this._steps[index];
            if (step)
                step.completed = value;
        }
        getActive(index) {
            var _a, _b;
            return (_b = (_a = this._steps[index]) === null || _a === void 0 ? void 0 : _a.active) !== null && _b !== void 0 ? _b : false;
        }
        setActive(index, value) {
            const step = this._steps[index];
            if (step)
                step.active = value;
        }
        checkStep() {
            return this.activeStep < this._steps.length && this.getCompleted(this.activeStep);
        }
        checkDone() {
            return this.steps.every(step => step.completed);
        }
    }
    exports.State = State;
});
define("@scom/scom-stepper/global/index.ts", ["require", "exports", "@scom/scom-stepper/global/state.ts"], function (require, exports, state_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-stepper/global/index.ts'/> 
    __exportStar(state_1, exports);
});
define("@scom/scom-stepper", ["require", "exports", "@ijstech/components", "@scom/scom-stepper/index.css.ts", "@scom/scom-stepper/global/index.ts"], function (require, exports, components_2, index_css_1, global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomStepper = class ScomStepper extends components_2.Module {
        constructor() {
            super(...arguments);
            this._activeStep = 0;
            this._steps = [];
            this._finishCaption = '';
            this.tag = {};
        }
        get activeStep() {
            var _a;
            return (_a = this._activeStep) !== null && _a !== void 0 ? _a : 0;
        }
        set activeStep(step) {
            if (this._activeStep === step)
                return;
            if (this.stepElms && this.stepElms.length) {
                const maxValue = Math.max(this._activeStep, step);
                for (let i = maxValue; i >= 0; i--) {
                    const el = this.stepElms[i];
                    if (i <= step) {
                        el.classList.add('--active');
                        this.state.setActive(i, true);
                    }
                    else {
                        el.classList.remove('--active');
                        this.state.setActive(i, false);
                    }
                }
            }
            this._activeStep = step;
            this.state.activeStep = step;
            if (this.btnNext) {
                this.btnNext.visible = this.activeStep < this.steps.length;
                if (this.btnNext.visible)
                    this.updateButtonText();
            }
            if (this.btnPrev) {
                this.btnPrev.visible = this.activeStep > 0 && this.steps.length > 1;
            }
        }
        get steps() {
            var _a;
            return (_a = this._steps) !== null && _a !== void 0 ? _a : [];
        }
        set steps(value) {
            this._steps = value;
            this.state.steps = value;
            this.renderSteps(value);
        }
        get finishCaption() {
            var _a;
            return (_a = this._finishCaption) !== null && _a !== void 0 ? _a : '';
        }
        set finishCaption(value) {
            this._finishCaption = value !== null && value !== void 0 ? value : '';
        }
        get isFinalStep() {
            return this.activeStep === this.steps.length - 1;
        }
        updateButtonText() {
            const finishCaption = this.isFinalStep && this.finishCaption;
            this.btnNext.caption = finishCaption || 'Next';
        }
        setTag(value) {
            this.tag = value;
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this.tag[prop] = newValue[prop];
                }
            }
            this.updateTheme();
        }
        updateStyle(name, value) {
            value ?
                this.style.setProperty(name, value) :
                this.style.removeProperty(name);
        }
        updateTheme() {
            var _a, _b, _c, _d, _e, _f;
            this.updateStyle('--text-primary', (_a = this.tag) === null || _a === void 0 ? void 0 : _a.activeTextColor);
            this.updateStyle('--colors-primary-main', (_b = this.tag) === null || _b === void 0 ? void 0 : _b.activeBgColor);
            this.updateStyle('--text-secondary', (_c = this.tag) === null || _c === void 0 ? void 0 : _c.inactiveTextColor);
            this.updateStyle('--action-disabled', (_d = this.tag) === null || _d === void 0 ? void 0 : _d.inactiveBgColor);
            this.updateStyle('--text-third', (_e = this.tag) === null || _e === void 0 ? void 0 : _e.completedBgColor);
            this.updateStyle('--colors-success-main', (_f = this.tag) === null || _f === void 0 ? void 0 : _f.completedTextColor);
        }
        updateStatus(index, value) {
            this.state.setCompleted(index, value);
        }
        onPrevious() {
            if (this.activeStep <= 0)
                return;
            this._updateStep(this.activeStep - 1);
        }
        onNext() {
            if (this.state.checkStep()) {
                if (this.isFinalStep) {
                    if (this.onDone)
                        this.onDone(this);
                }
                else {
                    this._updateStep(this.activeStep + 1);
                    if (this.activeStep > this.state.furthestStepIndex) {
                        this.state.furthestStepIndex = this.activeStep;
                    }
                }
            }
        }
        onStepChanged(index) {
            if (index > this.state.furthestStepIndex && !this.state.checkStep())
                return;
            this._updateStep(index);
        }
        _updateStep(step) {
            this.activeStep = step;
            if (this.onChanged)
                this.onChanged(this, this.activeStep);
        }
        renderDivider() {
            return (this.$render("i-panel", { position: "absolute", top: "1rem", left: "calc(-50% + 1rem)", right: "calc(50% + 1rem)" },
                this.$render("i-panel", { border: { bottom: { width: 1, style: 'solid', color: Theme.divider } }, class: "step-divider" })));
        }
        renderIcon(iconData, index) {
            var _a, _b;
            if (iconData) {
                const width = (_a = iconData === null || iconData === void 0 ? void 0 : iconData.width) !== null && _a !== void 0 ? _a : 16;
                const height = (_b = iconData === null || iconData === void 0 ? void 0 : iconData.height) !== null && _b !== void 0 ? _b : 16;
                if (iconData.image) {
                    this.$render("i-icon", { image: Object.assign({}, iconData.image), width: width, height: height });
                }
                return this.$render("i-icon", { name: iconData.name, width: width, height: height });
            }
            else {
                return this.$render("i-label", { caption: (index + 1).toString(), font: { size: '0.875rem', color: Theme.text.secondary } });
            }
        }
        renderSteps(steps) {
            this.pnlStepper.clearInnerHTML();
            this.stepElms = [];
            steps.forEach((item, i) => {
                const divider = i > 0 ? this.renderDivider() : [];
                const step = (this.$render("i-vstack", { class: 'step' + (i == this.activeStep ? ' --active' : ''), position: "relative", padding: { left: '0.5rem', right: '0.5rem' }, stack: { grow: '1', shrink: '1', basis: '0%' }, horizontalAlignment: "center", gap: "1rem", onClick: () => this.onStepChanged(i) },
                    divider,
                    this.$render("i-panel", null,
                        this.$render("i-hstack", { class: "step-icon", width: "2rem", height: "2rem", background: { color: Theme.action.disabled }, border: { radius: '50%' }, horizontalAlignment: "center", verticalAlignment: "center" }, this.renderIcon(item.icon, i))),
                    this.$render("i-panel", { class: "text-center step-label-container", width: "100%" },
                        this.$render("i-label", { class: "step-label", caption: item.name, font: { size: '0.875rem', color: Theme.text.secondary } }))));
                this.pnlStepper.append(step);
                this.stepElms.push(step);
            });
        }
        init() {
            this._updateStep = this._updateStep.bind(this);
            super.init();
            this.state = new global_1.State({ activeStep: 0, steps: [] });
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            this.onDone = this.getAttribute('onDone', true) || this.onDone;
            const steps = this.getAttribute('steps', true);
            if (steps)
                this.steps = steps;
            const activeStep = this.getAttribute('activeStep', true);
            if (activeStep !== undefined)
                this.activeStep = activeStep;
            this.finishCaption = this.getAttribute('finishCaption', true, '');
        }
        render() {
            return (this.$render("i-vstack", { gap: "1rem" },
                this.$render("i-hstack", { id: "pnlStepper", class: index_css_1.stepperStyle, position: "relative" }),
                this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", padding: { left: '0.5rem', right: '0.5rem' } },
                    this.$render("i-panel", null,
                        this.$render("i-button", { id: "btnPrev", caption: "Previous", padding: { top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }, font: { color: Theme.colors.primary.contrastText }, visible: false, onClick: this.onPrevious })),
                    this.$render("i-panel", null,
                        this.$render("i-button", { id: "btnNext", caption: "Next", padding: { top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }, font: { color: Theme.colors.primary.contrastText }, onClick: this.onNext })))));
        }
    };
    ScomStepper = __decorate([
        (0, components_2.customElements)('i-scom-stepper')
    ], ScomStepper);
    exports.default = ScomStepper;
});
