import { Styles } from "@ijstech/components";

const Theme = Styles.Theme.ThemeVars;

export const stepperStyle = Styles.style({
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
})
