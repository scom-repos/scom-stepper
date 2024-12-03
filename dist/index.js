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
            this._activeStep = data?.activeStep ?? 0;
            this._steps = data?.steps ?? [];
        }
        get steps() {
            return this._steps ?? [];
        }
        set steps(value) {
            this._steps = value;
        }
        get currentStep() {
            return this._steps[this.activeStep];
        }
        get activeStep() {
            return this._activeStep ?? 0;
        }
        set activeStep(value) {
            this._activeStep = value;
        }
        get furthestStepIndex() {
            return this._furthestStepIndex ?? 0;
        }
        set furthestStepIndex(value) {
            this._furthestStepIndex = value;
        }
        getCompleted(index) {
            return this._steps[index]?.completed ?? false;
        }
        setCompleted(index, value) {
            const step = this._steps[index];
            if (step)
                step.completed = value;
        }
        getActive(index) {
            return this._steps[index]?.active ?? false;
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
define("@scom/scom-stepper/translations.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-stepper/translations.json.ts'/> 
    exports.default = {
        "en": {
            "previous": "Previous",
            "next": "Next"
        },
        "zh-hant": {},
        "vi": {
            "next": "Tiếp theo",
            "previous": "Về trước"
        }
    };
});
define("@scom/scom-stepper", ["require", "exports", "@ijstech/components", "@scom/scom-stepper/index.css.ts", "@scom/scom-stepper/global/index.ts", "@scom/scom-stepper/translations.json.ts"], function (require, exports, components_2, index_css_1, global_1, translations_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomStepper = class ScomStepper extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this._activeStep = 0;
            this._steps = [];
            this._finishCaption = '';
            this._showNavButtons = true;
            this.tag = {};
            this.deferReadyCallback = true;
        }
        get activeStep() {
            return this._activeStep ?? 0;
        }
        set activeStep(step) {
            const stepsLength = this.steps.length;
            let maxValue = Math.max(this._activeStep, step);
            if (maxValue >= stepsLength) {
                maxValue = 0;
                step = 0;
            }
            if (this.stepElms?.length) {
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
            if (this.showNavButtons) {
                if (this.btnNext) {
                    this.btnNext.visible = this.activeStep < this.steps.length;
                    if (this.btnNext.visible)
                        this.updateButtonText();
                }
                if (this.btnPrev) {
                    this.btnPrev.visible = this.activeStep > 0 && this.steps.length > 1;
                }
            }
        }
        get steps() {
            return this._steps ?? [];
        }
        set steps(value) {
            this._steps = value;
            this.state.steps = value;
            this.renderSteps();
        }
        get finishCaption() {
            return this._finishCaption ?? '';
        }
        set finishCaption(value) {
            this._finishCaption = value ?? '';
        }
        get showNavButtons() {
            return this._showNavButtons ?? true;
        }
        set showNavButtons(value) {
            this._showNavButtons = value ?? true;
            if (this.btnPrev)
                this.btnPrev.visible = value;
            if (this.btnNext)
                this.btnNext.visible = value;
        }
        get isFinalStep() {
            return this.activeStep === this.steps.length - 1;
        }
        updateButtonText() {
            const finishCaption = this.isFinalStep && this.finishCaption;
            if (this.showNavButtons) {
                this.btnNext.caption = finishCaption || '$next';
            }
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
            this.updateStyle('--text-primary', this.tag?.activeTextColor);
            this.updateStyle('--colors-primary-main', this.tag?.activeBgColor);
            this.updateStyle('--text-secondary', this.tag?.inactiveTextColor);
            this.updateStyle('--action-disabled', this.tag?.inactiveBgColor);
            this.updateStyle('--text-third', this.tag?.completedBgColor);
            this.updateStyle('--colors-success-main', this.tag?.completedTextColor);
        }
        updateStatus(index, value) {
            this.state.setCompleted(index, value);
        }
        onPrevious() {
            if (this.activeStep <= 0)
                return;
            this._updateStep(this.activeStep - 1);
        }
        async onNext() {
            if (this.onBeforeNext) {
                await this.onBeforeNext(this, this.activeStep + 1);
            }
            if (this.state.checkStep()) {
                if (this.isFinalStep) {
                    try {
                        this.btnNext.rightIcon.spin = true;
                        this.btnNext.rightIcon.visible = true;
                        if (this.onDone)
                            await this.onDone(this);
                    }
                    catch { }
                    this.btnNext.rightIcon.spin = false;
                    this.btnNext.rightIcon.visible = false;
                }
                else {
                    this._updateIndexs(this.activeStep + 1);
                }
            }
        }
        async onStepChanged(index) {
            if (this.onBeforeNext && this.activeStep < index) {
                await this.onBeforeNext(this, index);
            }
            if (index > this.state.furthestStepIndex && !this.state.checkStep())
                return;
            this._updateIndexs(index);
        }
        _updateIndexs(step) {
            this._updateStep(step);
            if (this.activeStep > this.state.furthestStepIndex) {
                this.state.furthestStepIndex = this.activeStep;
            }
        }
        _updateStep(step) {
            const oldStep = this._activeStep;
            this.activeStep = step;
            if (this.onChanged)
                this.onChanged(this, oldStep);
        }
        renderDivider() {
            return (this.$render("i-panel", { position: "absolute", top: "1rem", left: "calc(-50% + 1rem)", right: "calc(50% + 1rem)" },
                this.$render("i-panel", { border: { bottom: { width: 1, style: 'solid', color: Theme.divider } }, class: "step-divider" })));
        }
        renderIcon(iconData, index) {
            if (iconData) {
                const width = iconData?.width ?? 16;
                const height = iconData?.height ?? 16;
                if (iconData.image) {
                    this.$render("i-icon", { image: { ...iconData.image }, width: width, height: height });
                }
                return this.$render("i-icon", { name: iconData.name, width: width, height: height });
            }
            else {
                return this.$render("i-label", { caption: (index + 1).toString(), font: { size: '0.875rem', color: Theme.text.secondary } });
            }
        }
        renderSteps() {
            this.pnlStepper.clearInnerHTML();
            this.stepElms = [];
            const isStepIconPanelShown = this.steps.length > 1;
            this.steps.forEach((item, i) => {
                const divider = i > 0 ? this.renderDivider() : [];
                const step = (this.$render("i-vstack", { class: 'step', position: "relative", padding: { left: '0.5rem', right: '0.5rem' }, stack: { grow: '1', shrink: '1', basis: '0%' }, horizontalAlignment: "center", gap: "1rem", onClick: () => this.onStepChanged(i) },
                    divider,
                    this.$render("i-panel", { visible: isStepIconPanelShown },
                        this.$render("i-hstack", { class: "step-icon", width: "2rem", height: "2rem", background: { color: Theme.action.disabled }, border: { radius: '50%' }, horizontalAlignment: "center", verticalAlignment: "center" }, this.renderIcon(item.icon, i))),
                    this.$render("i-panel", { class: "text-center step-label-container", width: "100%" },
                        this.$render("i-label", { class: "step-label", caption: item.name, font: { size: '0.875rem', color: Theme.text.secondary } }))));
                this.pnlStepper.append(step);
                this.stepElms.push(step);
            });
            this.activeStep = this.state.activeStep;
        }
        async init() {
            this.i18n.init({ ...translations_json_1.default });
            this._updateStep = this._updateStep.bind(this);
            await super.init();
            await this.btnNext.ready();
            this.state = new global_1.State({ activeStep: 0, steps: [] });
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            this.onBeforeNext = this.getAttribute('onBeforeNext', true) || this.onBeforeNext;
            this.onDone = this.getAttribute('onDone', true) || this.onDone;
            const steps = this.getAttribute('steps', true);
            if (steps)
                this.steps = steps;
            const activeStep = this.getAttribute('activeStep', true);
            if (activeStep !== undefined)
                this.activeStep = activeStep;
            this.finishCaption = this.getAttribute('finishCaption', true, '');
            this.showNavButtons = this.getAttribute('showNavButtons', true, true);
            this.executeReadyCallback();
        }
        render() {
            return (this.$render("i-vstack", { gap: "1rem" },
                this.$render("i-hstack", { id: "pnlStepper", class: index_css_1.stepperStyle, position: "relative" }),
                this.$render("i-hstack", { horizontalAlignment: "space-between", verticalAlignment: "center", padding: { left: '0.5rem', right: '0.5rem' } },
                    this.$render("i-panel", null,
                        this.$render("i-button", { id: "btnPrev", caption: "$previous", padding: { top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }, font: { color: Theme.colors.primary.contrastText, transform: 'capitalize' }, visible: false, onClick: this.onPrevious })),
                    this.$render("i-panel", null,
                        this.$render("i-button", { id: "btnNext", caption: "$next", padding: { top: '0.25rem', bottom: '0.25rem', left: '0.75rem', right: '0.75rem' }, font: { color: Theme.colors.primary.contrastText, transform: 'capitalize' }, onClick: this.onNext })))));
        }
    };
    ScomStepper = __decorate([
        (0, components_2.customElements)('i-scom-stepper')
    ], ScomStepper);
    exports.default = ScomStepper;
});
