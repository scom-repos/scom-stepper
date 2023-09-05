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
            '.step.--active .step-icon': {
                background: Theme.colors.primary.main,
            },
            '.step.--active .step-label': {
                color: `${Theme.text.primary} !important`
            },
            '.step.--active .step-label-container > .step-label': {
                fontWeight: 600
            }
        }
    });
});
define("@scom/scom-stepper/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-stepper", ["require", "exports", "@ijstech/components", "@scom/scom-stepper/index.css.ts"], function (require, exports, components_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomStepper = class ScomStepper extends components_2.Module {
        constructor() {
            super(...arguments);
            this._activeStep = 0;
        }
        get activeStep() {
            return this._activeStep;
        }
        set activeStep(step) {
            if (this._activeStep === step)
                return;
            if (this._steps && this._steps.length) {
                const activeStep = this._steps[this._activeStep];
                const targetStep = this._steps[step];
                if (activeStep)
                    activeStep.classList.remove('--active');
                if (targetStep)
                    targetStep.classList.add('--active');
            }
            this._activeStep = step;
        }
        set steps(value) {
            this.renderSteps(value);
        }
        previous() {
            if (this.activeStep <= 0)
                return;
            this._updateStep(this.activeStep - 1);
        }
        next() {
            if (this.activeStep >= this._steps.length - 1)
                return;
            this._updateStep(this.activeStep + 1);
        }
        _updateStep(step) {
            this.activeStep = step;
            if (this.onChanged)
                this.onChanged(this, this.activeStep);
        }
        renderDivider() {
            return (this.$render("i-panel", { position: "absolute", top: "1rem", left: "calc(-50% + 1rem)", right: "calc(50% + 1rem)" },
                this.$render("i-panel", { border: { bottom: { width: 1, style: 'solid', color: Theme.divider } } })));
        }
        renderSteps(steps) {
            this.pnlStepper.clearInnerHTML();
            this._steps = [];
            steps.forEach((item, i) => {
                const divider = i > 0 ? this.renderDivider() : [];
                const step = (this.$render("i-vstack", { class: 'step' + (i == this.activeStep ? ' --active' : ''), position: "relative", padding: { left: '0.5rem', right: '0.5rem' }, stack: { grow: '1', shrink: '1', basis: '0%' }, horizontalAlignment: "center", gap: "1rem", onClick: () => this._updateStep(i) },
                    divider,
                    this.$render("i-panel", null,
                        this.$render("i-hstack", { class: "step-icon", width: "2rem", height: "2rem", background: { color: Theme.action.disabled }, border: { radius: '50%' }, horizontalAlignment: "center", verticalAlignment: "center" },
                            this.$render("i-label", { class: "step-label", caption: (i + 1).toString(), font: { size: '0.875rem', color: Theme.text.secondary } }))),
                    this.$render("i-panel", { class: "text-center step-label-container", width: "100%" },
                        this.$render("i-label", { class: "step-label", caption: item.name, font: { size: '0.875rem', color: Theme.text.secondary } }))));
                this.pnlStepper.append(step);
                this._steps.push(step);
            });
        }
        init() {
            this._updateStep = this._updateStep.bind(this);
            super.init();
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            const steps = this.getAttribute('steps', true);
            if (steps)
                this.steps = steps;
            const activeStep = this.getAttribute('activeStep', true);
            if (activeStep !== undefined)
                this.activeStep = activeStep;
        }
        render() {
            return this.$render("i-hstack", { id: "pnlStepper", class: index_css_1.stepperStyle, position: "relative" });
        }
    };
    ScomStepper = __decorate([
        (0, components_2.customElements)('i-scom-stepper')
    ], ScomStepper);
    exports.default = ScomStepper;
});
