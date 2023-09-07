import { Styles } from "@ijstech/components";

const Theme = Styles.Theme.ThemeVars;

export const stepperStyle = Styles.style({
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
    '.step.--done': {
    }
  }
})
