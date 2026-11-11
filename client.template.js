/**
 * Williams Martini Racing — client half.
 *
 * A complete livery for the Web client: Light/Dark tokens, the Martini
 * four-stripe rails, the supplied die-cut logo, an FW40 photo ghost, a pit-board
 * mode switch, and a Martini Racing settings page. The host half is empty.
 *
 * `__LOGO__`, `__PLATE__`, `__CAR_NIGHT__` and `__CAR_PAPER__` are base64
 * payloads substituted by `tools/inline-assets.mjs`.
 */
window.__ModuleLoader__.load({
  id: '@williams/dsh-martini-theme',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** One override for both built-in schemes, so neither mode is left behind. */
    const m = (light, dark) => ({ light, dark });

    const LOGO = 'data:image/webp;base64,__LOGO__';
    const PLATE = 'data:image/webp;base64,__PLATE__';
    const CAR_NIGHT = 'data:image/webp;base64,__CAR_NIGHT__';
    const CAR_PAPER = 'data:image/webp;base64,__CAR_PAPER__';

    const DISPLAY_FONT =
      '"Bahnschrift SemiCondensed", "Bahnschrift", "Arial Narrow", "Segoe UI Variable Display", "Segoe UI", sans-serif';

    /* -------------------------------------------------------------------- */
    /* Palette                                                              */
    /* -------------------------------------------------------------------- */

    const TOKENS = {
      // Canvas and layers
      '--dsw-alias-bg-base': m('#F1F5FA', '#040B16'),
      '--dsw-alias-bg-document-preview': m('#E6EDF6', '#081525'),
      '--dsw-alias-label-document-preview': m('#33475E', '#B9CBE0'),
      '--dsw-alias-bg-layer-1': m('#FAFCFF', '#08182B'),
      '--dsw-alias-bg-layer-2': m('#FFFFFF', '#0B2038'),
      '--dsw-alias-bg-layer-3': m('#FFFFFF', '#102A46'),
      '--dsw-alias-bg-mask-1': m('#081B3247', '#00000099'),
      '--dsw-alias-bg-mask-2': m('#081B322E', '#00000047'),
      '--dsw-alias-bg-mask-3': m('#081B328A', '#0000008A'),
      '--dsw-alias-bg-mask-drop': m('#F1F5FAB3', '#0A1B2FB3'),
      '--dsw-alias-bg-mask-photo': m('#081B32E0', '#000000E6'),
      '--dsw-alias-bg-module-platform': m('#E4ECF6', '#0D2440'),
      '--dsw-alias-bg-multi-select': m('#EAF1F9', '#0C223B'),
      '--dsw-alias-bg-overlay': m('#DCE6F2', '#12283F'),
      '--dsw-alias-bg-skeleton': m('#081B320A', '#EAF3FF14'),

      // Borders
      '--dsw-alias-border-inverted': m('#00000000', '#EAF3FF0F'),
      '--dsw-alias-border-inverted2': m('#00000000', '#EAF3FF14'),
      '--dsw-alias-border-l1': m('#081B3214', '#EAF3FF14'),
      '--dsw-alias-border-l2-darkmode-thin': m('#081B321A', '#EAF3FF14'),
      '--dsw-alias-border-l2': m('#081B321F', '#EAF3FF24'),
      '--dsw-alias-border-l3': m('#081B3233', '#EAF3FF38'),
      '--dsw-alias-border-l4': m('#081B3252', '#EAF3FF52'),

      // Brand and buttons
      '--dsw-alias-brand-primary': m('#071A31', '#EAF3FF'),
      '--dsw-alias-brand-primary-invert': m('#071A31', '#EAF3FF'),
      '--dsw-alias-brand-primary-new-colorprimary-new-color': m('#008FD0', '#35C4F0'),
      '--dsw-alias-brand-text': m('#071A31', '#EAF3FF'),
      '--dsw-alias-button-contrast-fill': m('#071A31', '#18344F'),
      '--dsw-alias-button-elevated-fill': m('#FFFFFF', '#0B2038'),
      '--dsw-alias-button-floating-fill': m('#FFFFFF', '#0A1B2F'),
      '--dsw-alias-button-floating-hover': m('#EEF5FC', '#102A46'),
      '--dsw-alias-button-ghost-active-border': m('#54687D', '#EAF3FF66'),
      '--dsw-alias-button-ghost-active-fill': m('#E6EEF8', '#0E2742'),
      '--dsw-alias-button-ghost-active-hover': m('#DCE7F4', '#12283F'),
      '--dsw-alias-button-info-fill': m('#009FDF', '#1FB3E4'),
      '--dsw-alias-button-info-hover': m('#0087C2', '#35C4F0'),
      '--dsw-alias-button-primary-dimmed': m('#D9E9F6', '#102A46'),
      '--dsw-alias-button-primary-fill': m('#009FDF', '#1FB3E4'),
      '--dsw-alias-button-primary-hover': m('#0087C2', '#35C4F0'),
      '--dsw-alias-button-tool-bar-fill': m('#071A3166', '#546A8080'),
      '--dsw-alias-button-tool-bar-fill-invisible': m('#071A3133', '#20364D5C'),
      '--dsw-alias-button-tool-bar-hover': m('#071A3188', '#546A8099'),

      // Interaction
      '--dsw-alias-interactive-bg-active': m('#071A311A', '#EAF3FF24'),
      '--dsw-alias-interactive-bg-hover': m('#071A310F', '#EAF3FF14'),
      '--dsw-alias-interactive-bg-hover-accent': m('#009FDF12', '#35C4F01F'),
      '--dsw-alias-interactive-bg-hover-danger': m('#E4002B14', '#FF2D4B26'),
      '--dsw-alias-interactive-bg-hover-solid': m('#DCE7F4', '#102A46'),

      // Labels
      '--dsw-alias-label-caption': m('#63778D', '#89A2BC'),
      '--dsw-alias-label-dimmed': m('#D7E1EC', '#243C57'),
      '--dsw-alias-label-primary': m('#071A31', '#EAF3FF'),
      '--dsw-alias-label-primary-bluish': m('#006A9E', '#A9E6FA'),
      '--dsw-alias-label-primary-dimmed': m('#20364D', '#D3E4F5'),
      '--dsw-alias-label-primary-foreground': m('#F8FBFF', '#EAF3FF'),
      '--dsw-alias-label-primary-inverted': m('#FFFFFF', '#EAF3FF'),
      '--dsw-alias-label-secondary': m('#344A61', '#C3D6E9'),
      '--dsw-alias-label-tertiary': m('#5C7188', '#97AEC6'),
      '--dsw-alias-link': m('#0072AD', '#6AD6FA'),
      '--dsw-alias-menu-icon': m('#20364D', '#D3E4F5'),

      // Markdown and code
      '--dsw-alias-markdown-citation': m('#E4EEF9', '#102A46'),
      '--dsw-alias-markdown-code-block': m('#EAF1F8', '#030B16'),
      '--dsw-alias-markdown-code-block-banner': m('#F1F6FC', '#08182B'),
      '--dsw-alias-markdown-code-segment-selected': m('#FFFFFF', '#102A46'),
      '--dsw-alias-markdown-code-segment-unselected': m('#E7EFF8', '#030B16'),
      '--dsw-alias-markdown-inline-code': m('#E9F1F9', '#0D2440'),
      '--dsw-alias-markdown-placeholder': m('#E9F1F9', '#0D2440'),
      '--dsw-alias-markdown-tag': m('#E4EEF9', '#102A46'),

      // Scrollbars
      '--dsw-alias-scrollbar-bg-l1': m('#071A3114', '#EAF3FF14'),
      '--dsw-alias-scrollbar-bg-l2': m('#071A311F', '#EAF3FF1F'),
      '--dsw-alias-scrollbar-hover-l1': m('#009FDF99', '#35C4F099'),
      '--dsw-alias-scrollbar-hover-l2': m('#0087C299', '#35C4F099'),

      // State colors
      '--dsw-alias-state-business-primary': m('#008FD0', '#4FD3F7'),
      '--dsw-alias-state-business-tertiary': m('#DDF2FC', '#05293A'),
      '--dsw-alias-state-error-primary': m('#D01736', '#FF6B7D'),
      '--dsw-alias-state-error-secondary': m('#E4002B', '#FF8E9C'),
      '--dsw-alias-state-idle-primary': m('#8D9FB3', '#526A82'),
      '--dsw-alias-state-success-primary': m('#0E8A5F', '#6FF0B8'),
      '--dsw-alias-state-success-secondary': m('#1FA673', '#44D69E'),
      '--dsw-alias-state-success-tertiary': m('#DDF4EA', '#0A2E24'),
      '--dsw-alias-state-warn-label': m('#8A5B00', '#FFD37E'),
      '--dsw-alias-state-warn-primary': m('#B57400', '#FFC24D'),
      '--dsw-alias-state-warn-secondary': m('#D9920A', '#FFB020'),
      '--dsw-alias-state-warn-tertiary': m('#FBEFD2', '#2E2411'),
      '--dsw-alias-code-diff-added': m('#0E8A5F14', '#6FF0B818'),
      '--dsw-alias-code-diff-deleted': m('#D0173614', '#FF6B7D18'),
      '--dsw-alias-file-diff-added-bg': m('#E2F4EC', '#0E2A20'),
      '--dsw-alias-file-diff-added-gutter': m('#EEF9F3', '#0A1E17'),
      '--dsw-alias-file-diff-added-marker': m('#0E8A5F', '#6FF0B8'),
      '--dsw-alias-file-diff-deleted-bg': m('#FBE7EB', '#2A141B'),
      '--dsw-alias-file-diff-deleted-gutter': m('#FDEFEF', '#1E0E13'),
      '--dsw-alias-file-diff-deleted-marker': m('#D01736', '#FF6B7D'),

      // Surfaces and menus
      '--dsw-alias-settings-card-fill': m('#FFFFFF', '#0B2038'),
      '--dsw-alias-settings-card-stroke': m('#081B321A', '#EAF3FF1F'),
      '--dsw-alias-toast-bg': m('#071A31', '#EAF3FF'),
      '--dsw-alias-toast-label': m('#F8FBFF', '#040B16'),
      '--dsw-alias-tooltip-bg': m('#071A31', '#EAF3FF'),
      '--dsw-alias-tooltip-key-bg': m('#26405B', '#D3E4F5'),
      '--dsw-alias-onboarding-accent': m('#009FDF', '#35C4F0'),
      '--dsw-alias-onboarding-card-fill': m('#FFFFFF', '#0B2038'),
      '--dsw-alias-onboarding-checkbox-border': m('#081B3242', '#EAF3FF42'),
      '--dsw-alias-onboarding-secondary-fill': m('#E4EEF9', '#102A46'),
      '--dsw-menu-surface-fill': m('#FFFFFFF0', '#08182BE6'),
      '--dsw-menu-backdrop-filter': m('blur(28px) saturate(145%)', 'blur(28px) saturate(145%)'),
      '--dsw-specific-menu': m('#FFFFFFF0', '#08182BE6'),
      '--dsw-specific-bubble': m('#FFFFFF', '#0D2440'),
      '--dsw-specific-bubble-highlight': m('#F7FAFE', '#12283F'),
      '--dsw-specific-input-major': m('#FFFFFF', '#061322'),
      '--dsw-specific-login-input': m('#FAFCFF', '#061322'),
      '--dsw-specific-selector': m('#E4ECF6', '#0D2440'),
      '--dsw-specific-sidebar-fill': m('#E6EDF7', '#05101F'),
      '--dsw-specific-sidebar-nav-item-active': m('#FFFFFF', '#0B2038'),
      '--dsw-specific-sidebar-nav-item-active-accent': m('#009FDF', '#35C4F0'),
      '--dsw-specific-sidebar-nav-item-hover': m('#DCE7F4', '#0A1B2F'),
      '--dsw-specific-tip': m('#FFFFFF', '#0D2440'),

      // Shape, focus, depth
      '--dsw-radius-xs': m('2px', '2px'),
      '--dsw-radius-sm': m('4px', '4px'),
      '--dsw-radius-md': m('6px', '6px'),
      '--dsw-radius-lg': m('10px', '10px'),
      '--dsw-radius-xl': m('14px', '14px'),
      '--dsw-radius-panel': m('18px', '18px'),
      '--dsw-focus-ring-color': m('#009FDF', '#35C4F0'),
      '--dsw-focus-ring-width': m('2px', '2px'),
      '--dsw-elevation-stroke-color': m('var(--dsw-alias-border-l4)', 'var(--dsw-alias-border-l2)'),
      '--dsw-shadow-lv1': m('0 1px 0 #071A3114, 0 0 0 1px #071A310F', '0 1px 0 #00000080, 0 0 0 1px #EAF3FF0A'),
      '--dsw-shadow-lv1-blur': m('0 6px 18px #071A3114', '0 6px 18px #00000066'),
      '--dsw-shadow-lv2': m('0 2px 0 #071A3110, 0 10px 28px #071A3114, 0 0 0 1px #071A3114', '0 2px 0 #00000099, 0 10px 28px #00000066, 0 0 0 1px #EAF3FF1A'),
      '--dsw-shadow-lv3': m('0 24px 64px #071A311F, 0 0 0 1px #071A311A', '0 24px 64px #00000099, 0 0 0 1px #EAF3FF1F'),
      '--dsw-linear-gradient-think': m('linear-gradient(180deg, #FFFFFF 20.19%, #FFFFFF00 100%)', 'linear-gradient(180deg, #0B2038 20.19%, #0B203800 100%)'),
      '--dsw-linear-think-select': m('linear-gradient(180deg, #EEF5FC 20.19%, #EEF5FC00 100%)', 'linear-gradient(180deg, #102A46 20.19%, #102A4600 100%)'),

      // Theme-local values read by the stylesheet
      '--wm-navy': m('#0A2242', '#071A31'),
      '--wm-navy-deep': m('#051426', '#020812'),
      '--wm-blue': m('#009FDF', '#35C4F0'),
      '--wm-blue-deep': m('#0077B6', '#009FDF'),
      '--wm-blue-bright': m('#4FD3F7', '#7ADDFA'),
      '--wm-red': m('#E4002B', '#FF2D4B'),
      '--wm-red-deep': m('#B00022', '#D80028'),
      '--wm-ice': m('#F5F9FE', '#EAF3FF'),
      '--wm-silver': m('#B9C9DA', '#8199B2'),
      '--wm-gold': m('#EFBF4C', '#FFD166'),
      '--wm-ink': m('#071A31', '#EAF3FF'),
      '--wm-paper': m('#F1F5FA', '#040B16'),
      '--wm-line': m('#081B321F', '#EAF3FF1F'),
      '--wm-line-strong': m('#081B3238', '#EAF3FF38'),
      '--wm-plate': m('#FFFFFF', '#08182B'),
      '--wm-plate-ink': m('#071A31', '#EAF3FF'),
      '--wm-soft': m('#009FDF14', '#35C4F01F'),
      '--wm-blue-soft': m('#009FDF1F', '#35C4F02E'),
      '--wm-red-soft': m('#E4002B1A', '#FF2D4B24'),
      '--wm-glow': m('#009FDF24', '#0E6E9940'),
      '--wm-grid': m('#071A310A', '#EAF3FF0A'),
      '--wm-art-opacity': m('0.14', '0.17'),
      '--wm-stripe-opacity': m('0.11', '0.16'),
      '--wm-wordmark-opacity': m('0.28', '0.32'),
      '--wm-checker': m('#071A31', '#EAF3FF'),
      '--wm-display': m(DISPLAY_FONT, DISPLAY_FONT),
    };

    /* -------------------------------------------------------------------- */
    /* Stylesheet                                                           */
    /* -------------------------------------------------------------------- */

    const CSS = String.raw`
      /* ---------- Canvas ------------------------------------------------- */

      body[data-wm-theme] {
        background-color: var(--dsw-alias-bg-base);
        color: var(--dsw-alias-label-primary);
        accent-color: var(--wm-blue);
        -webkit-font-smoothing: antialiased;
        background-image:
          radial-gradient(72% 46% at 86% -6%, var(--wm-glow), transparent 72%),
          linear-gradient(180deg,
            color-mix(in srgb, var(--wm-blue) 3%, transparent),
            transparent 34%);
      }

      body[data-wm-theme] ::selection,
      body[data-wm-theme]::selection {
        background: color-mix(in srgb, var(--wm-blue) 36%, transparent);
        color: var(--dsw-alias-label-primary);
      }

      body[data-wm-theme] [class*="frame"] {
        background-color: var(--dsw-alias-bg-base);
        background-image: none;
      }

      body[data-wm-theme] [class*="frame"] [class*="frame"] {
        background-color: var(--dsw-alias-bg-base) !important;
        background-image: none !important;
      }

      body[data-wm-theme] [class*="centerCol"] {
        background-color: transparent;
      }

      body[data-wm-theme] [data-conversation-content] {
        background-color: transparent !important;
        background-image: none !important;
      }

      body[data-wm-theme] [class*="rightbarCol"],
      body[data-wm-theme] [class*="bottomRow"] {
        background-color: transparent !important;
        background-image: none !important;
        border-color: color-mix(in srgb, var(--wm-line) 70%, transparent) !important;
        box-shadow: none !important;
      }

      body[data-wm-theme] [class*="frame"] :has([data-composer-card]) {
        background: transparent !important;
      }

      body[data-wm-theme] [data-composer-seat],
      body[data-wm-theme] [class*="frame"] [class*="bottomRow"] {
        background-color: transparent !important;
        background-image: none !important;
        border-color: color-mix(in srgb, var(--wm-line) 70%, transparent) !important;
        box-shadow: none !important;
      }

      /* ---------- Sidebar ------------------------------------------------ */

      body[data-wm-theme] [class*="sidebarCol"] {
        position: relative;
        background-color: var(--dsw-specific-sidebar-fill);
        border-right: 1px solid var(--wm-line);
      }

      /* The four-stripe livery runs down the rail's inner edge, then fades. */
      body[data-wm-theme] [class*="sidebarCol"]::after {
        content: "";
        position: absolute;
        top: 0;
        right: -1px;
        bottom: 0;
        width: 4px;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          var(--wm-blue-bright) 0 1px,
          var(--wm-blue) 1px 2px,
          var(--wm-red) 2px 3px,
          var(--wm-blue) 3px 4px);
        opacity: .9;
        -webkit-mask-image: linear-gradient(180deg, #000 0, #000 38%, transparent 88%);
        mask-image: linear-gradient(180deg, #000 0, #000 38%, transparent 88%);
      }

      body[data-wm-theme] [class*="sidebarCol"] > [data-slot="sidebar"] > [class*="root"] {
        background-color: var(--dsw-specific-sidebar-fill);
        background-image:
          radial-gradient(92% 42% at 50% -6%, var(--wm-blue-soft), transparent 74%),
          linear-gradient(180deg, transparent 58%, var(--wm-red-soft) 160%);
      }

      html[data-windows-titlebar] body[data-wm-theme] [class*="frame"]::before {
        background-image: radial-gradient(
          calc(var(--wm-col-left, 280px) * 0.82) 130%
          at calc(var(--wm-col-left, 280px) / 2) 100%,
          var(--wm-blue-soft),
          transparent 78%);
      }

      body[data-wm-theme] .wm-brand {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        min-width: 0;
        line-height: 1;
        user-select: none;
      }

      body[data-wm-theme] .wm-side-logo {
        display: block;
        width: 62px;
        height: auto;
        max-width: none;
        filter: drop-shadow(0 2px 4px rgba(2, 12, 26, .28));
      }

      body[data-wm-theme] [data-slot="sidebar.brand.mark"],
      body[data-wm-theme] [class*="brandMark"] {
        width: 62px !important;
        height: 28px !important;
        flex: none !important;
        overflow: visible !important;
      }

      body[data-wm-theme] [class*="sidebarCol"] {
        container-type: inline-size;
      }

      @container (max-width: 120px) {
        body[data-wm-theme] .wm-side-logo {
          width: 38px;
        }

        body[data-wm-theme] [data-slot="sidebar.brand.mark"],
        body[data-wm-theme] [class*="brandMark"] {
          width: 38px !important;
          height: 18px !important;
        }

        body[data-wm-theme] .wm-brand {
          gap: 4px;
        }
      }

      body[data-wm-theme] .wm-brand__text {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
      }

      body[data-wm-theme] .wm-brand__name {
        font-family: var(--wm-display);
        font-size: 14px;
        font-style: italic;
        font-weight: 800;
        letter-spacing: .055em;
        line-height: .92;
        color: var(--dsw-alias-label-primary);
        white-space: nowrap;
      }

      body[data-wm-theme] .wm-brand__sub {
        font-family: var(--wm-display);
        font-size: 6.5px;
        font-weight: 600;
        letter-spacing: .24em;
        line-height: 1;
        color: var(--dsw-alias-label-tertiary);
        white-space: nowrap;
      }

      body[data-wm-theme] [role="treeitem"][aria-selected="true"] {
        background: linear-gradient(90deg, var(--wm-blue-soft), transparent 94%) !important;
        box-shadow:
          inset 3px 0 0 var(--wm-blue),
          inset 5px 0 0 var(--wm-red);
      }

      body[data-wm-theme] [class*="sessionRow"]:hover {
        background: var(--dsw-alias-interactive-bg-hover) !important;
      }

      /* ---------- Hero --------------------------------------------------- */

      body[data-wm-theme] [data-phase="hero"] {
        position: relative;
      }

      /* A very large, outlined Williams ghost sits behind the empty state. */
      body[data-wm-theme] [data-phase="hero"]::before {
        content: "WILLIAMS";
        position: absolute;
        top: -4px;
        left: 34%;
        z-index: 0;
        font-family: var(--wm-display);
        font-size: clamp(76px, 11.5vw, 190px);
        font-style: italic;
        font-weight: 800;
        letter-spacing: -.035em;
        line-height: .76;
        color: transparent;
        -webkit-text-stroke: 1px color-mix(in srgb, var(--wm-blue) 30%, transparent);
        opacity: .55;
        pointer-events: none;
        white-space: nowrap;
      }

      body[data-wm-theme] [data-phase="hero"] [class*="headline"] {
        font-family: var(--wm-display) !important;
        font-style: italic;
        font-weight: 800 !important;
        letter-spacing: -.025em !important;
        text-transform: uppercase;
      }

      body[data-wm-theme] [class*="fishHitbox"] {
        padding: 0 !important;
        width: auto !important;
        height: auto !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        overflow: visible !important;
      }

      body[data-wm-theme] .wm-hero {
        display: inline-flex;
        flex-direction: column;
        gap: 8px;
        transform: rotate(-1.1deg);
        transform-origin: left bottom;
      }

      body[data-wm-theme] .wm-hero__logo {
        display: block;
        width: 148px;
        height: auto;
        filter:
          drop-shadow(0 1px 0 rgba(255, 255, 255, .5))
          drop-shadow(0 10px 22px rgba(2, 12, 26, .3));
      }

      body[data-wm-theme] .wm-hero__meta {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding-left: 2px;
        color: var(--dsw-alias-label-tertiary);
        font-family: var(--wm-display);
        font-size: 8px;
        font-weight: 600;
        letter-spacing: .22em;
        line-height: 1;
        text-transform: uppercase;
        white-space: nowrap;
      }

      body[data-wm-theme] .wm-hero__code {
        color: var(--wm-blue);
        font-weight: 800;
        letter-spacing: .12em;
      }

      body[data-wm-theme] .wm-hero__dot {
        width: 2px;
        height: 2px;
        border-radius: 99px;
        background: currentColor;
        opacity: .6;
      }

      /* ---------- Turn rail ---------------------------------------------- */

      body[data-wm-theme] [class*="marks"] > [class*="mark"]::before {
        background: color-mix(in srgb, var(--wm-blue) var(--wm-tick, 55%), var(--wm-silver)) !important;
      }

      body[data-wm-theme] [class*="markActive"] {
        --wm-tick: 100%;
      }

      body[data-wm-theme] [class*="markActive"]::before {
        width: 24px !important;
        height: 3px !important;
        border-radius: 1px;
        box-shadow: 0 0 10px color-mix(in srgb, var(--wm-blue) 70%, transparent);
      }

      body[data-wm-theme] [class*="SNx2jG_frame"] {
        background-color: transparent !important;
        background-image: none !important;
        border-radius: 8px;
      }

      /* ---------- Composer ----------------------------------------------- */

      body[data-wm-theme] [data-composer-card] {
        position: relative;
        background-color: var(--wm-plate) !important;
        background-image:
          linear-gradient(180deg,
            color-mix(in srgb, var(--wm-blue) 2.5%, transparent),
            transparent 42%) !important;
        border: 1px solid var(--wm-line-strong) !important;
        border-radius: 6px !important;
        box-shadow:
          inset 0 1px 0 color-mix(in srgb, #FFFFFF 8%, transparent),
          0 14px 36px rgba(2, 12, 26, .14) !important;
        transition: border-color .15s ease, box-shadow .15s ease;
      }

      /* The four livery stripes become the input's leading rule. */
      body[data-wm-theme] [data-composer-card]::before {
        content: "";
        position: absolute;
        top: -1px;
        left: 12px;
        width: 138px;
        height: 3px;
        border-radius: 2px;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          var(--wm-blue-bright) 0 12%,
          transparent 12% 14%,
          var(--wm-blue) 14% 40%,
          transparent 40% 42%,
          var(--wm-red) 42% 57%,
          transparent 57% 59%,
          var(--wm-blue) 59% 82%,
          transparent 82% 84%,
          var(--wm-silver) 84% 100%);
        opacity: .9;
      }

      body[data-wm-theme] [data-composer-card]:focus-within {
        border-color: color-mix(in srgb, var(--wm-blue) 72%, transparent) !important;
        box-shadow:
          inset 0 1px 0 color-mix(in srgb, #FFFFFF 8%, transparent),
          0 0 0 1px color-mix(in srgb, var(--wm-blue) 45%, transparent),
          0 16px 40px rgba(2, 12, 26, .18) !important;
      }

      body[data-wm-theme] [data-composer-placeholder] {
        color: var(--dsw-alias-label-tertiary);
      }

      /* ---------- Buttons ------------------------------------------------ */

      body[data-wm-theme] button[class*="newSession"] {
        position: relative;
        overflow: hidden;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, .18), transparent 46%),
          linear-gradient(100deg, #0AB0EA 0%, #008FD0 52%, #0072AD 100%) !important;
        color: #F7FBFF !important;
        border: 0 !important;
        border-radius: 4px !important;
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, .36),
          4px 4px 0 var(--wm-red),
          0 10px 24px color-mix(in srgb, var(--wm-blue) 30%, transparent) !important;
        font-family: var(--wm-display) !important;
        font-style: italic;
        font-weight: 800 !important;
        letter-spacing: .06em;
        text-transform: uppercase;
        transition: transform .12s ease, box-shadow .12s ease, filter .12s ease;
      }

      body[data-wm-theme] button[class*="newSession"]::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 6px;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, .85) 0 1.5px,
          transparent 1.5px 3px,
          rgba(228, 0, 43, .95) 3px 4.5px,
          transparent 4.5px 6px);
      }

      body[data-wm-theme] button[class*="newSession"]:hover {
        filter: saturate(1.08) brightness(1.04);
        transform: translate(-1px, -1px);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, .4),
          5px 5px 0 var(--wm-red),
          0 12px 28px color-mix(in srgb, var(--wm-blue) 34%, transparent) !important;
      }

      body[data-wm-theme] button[class*="newSession"]:active {
        transform: translate(1px, 1px);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, .3),
          2px 2px 0 var(--wm-red) !important;
      }

      body[data-wm-theme] button[class*="newSession"] kbd {
        border-color: rgba(255, 255, 255, .38) !important;
        background: rgba(255, 255, 255, .14) !important;
        color: #F7FBFF !important;
      }

      body[data-wm-theme] [class*="newSessionContent"],
      body[data-wm-theme] [class*="newSessionLabel"] {
        color: #F7FBFF !important;
      }

      body[data-wm-theme] button[aria-label="Send message"]:not(:disabled) {
        background:
          linear-gradient(180deg, rgba(255, 255, 255, .2), transparent 50%),
          linear-gradient(150deg, var(--wm-red), var(--wm-red-deep)) !important;
        color: #FFFFFF !important;
        border-radius: 5px !important;
        box-shadow:
          0 0 0 1px color-mix(in srgb, var(--wm-red-deep) 62%, transparent),
          0 0 0 3px color-mix(in srgb, var(--wm-blue) 16%, transparent),
          0 6px 16px color-mix(in srgb, var(--wm-red) 34%, transparent) !important;
        transition: filter .12s ease, transform .12s ease;
      }

      body[data-wm-theme] button[aria-label="Send message"]:not(:disabled):hover {
        filter: brightness(1.1) saturate(1.06);
        transform: translateY(-1px);
      }

      body[data-wm-theme] button[class*="themeCube"][aria-pressed="true"] {
        border-color: var(--wm-blue) !important;
        box-shadow: 0 0 0 1px var(--wm-blue), 3px 3px 0 var(--wm-blue-soft);
      }

      /* ---------- Bubble, scrollbars, glyphs ----------------------------- */

      body[data-wm-theme] [class*="userStack"] [class*="bubble"] {
        border: 1px solid var(--wm-line) !important;
        box-shadow:
          inset 3px 0 0 var(--wm-blue),
          inset 5px 0 0 var(--wm-red);
      }

      body[data-wm-theme] ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background: transparent;
      }

      body[data-wm-theme] ::-webkit-scrollbar-track {
        background: transparent;
      }

      body[data-wm-theme] ::-webkit-scrollbar-thumb {
        background: var(--dsw-alias-scrollbar-bg-l1);
        border-radius: 99px;
      }

      body[data-wm-theme] ::-webkit-scrollbar-thumb:hover {
        background: var(--dsw-alias-scrollbar-hover-l1);
      }

      body[data-wm-theme] [class*="entryIcon"] svg [fill="#FFBC4D"] {
        fill: var(--wm-blue) !important;
      }

      body[data-wm-theme] [class*="entryIcon"] svg [stroke="#FFCD78"] {
        stroke: var(--wm-blue) !important;
      }

      body[data-wm-theme] [class*="entryIcon"] svg [stroke="#679EFE"] {
        stroke: var(--wm-red) !important;
      }

      /* ---------- Artwork layer ------------------------------------------ */

      body[data-wm-theme] .wm-art {
        position: fixed;
        inset: 0;
        z-index: 4;
        overflow: hidden;
        pointer-events: none;
      }

      /* Paddock blueprint grid, feathered away from the reading column. */
      body[data-wm-theme] .wm-art__grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(var(--wm-grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--wm-grid) 1px, transparent 1px);
        background-size: 56px 56px;
        -webkit-mask-image: radial-gradient(90% 76% at 74% 32%, #000, transparent 78%);
        mask-image: radial-gradient(90% 76% at 74% 32%, #000, transparent 78%);
      }

      /* One oversized diagonal livery band on the right, at print opacity. */
      body[data-wm-theme] .wm-art__stripe {
        position: absolute;
        top: -26%;
        right: -20%;
        width: 46vw;
        height: 158%;
        transform: rotate(24deg);
        transform-origin: center;
        opacity: var(--wm-stripe-opacity);
        background: linear-gradient(
          to bottom,
          transparent 0 18%,
          var(--wm-blue) 18% 20.5%,
          transparent 20.5% 23.5%,
          var(--wm-blue) 23.5% 26%,
          transparent 26% 29%,
          var(--wm-red) 29% 31.5%,
          transparent 31.5% 34.5%,
          var(--wm-blue) 34.5% 37%,
          transparent 37% 100%);
        -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 34%, #000 100%);
        mask-image: linear-gradient(90deg, transparent 0, #000 34%, #000 100%);
      }

      /* The FW40 detail is printed into the corner and feathered on two edges. */
      body[data-wm-theme] .wm-art__car {
        position: absolute;
        right: -5vw;
        bottom: -11vh;
        width: min(32vw, 480px);
        aspect-ratio: 4 / 5;
        background-image: url("${CAR_PAPER}");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: var(--wm-art-opacity);
        mix-blend-mode: multiply;
        transform: rotate(-2.2deg);
        -webkit-mask-image:
          linear-gradient(to left, #000 0 34%, transparent 92%),
          linear-gradient(to top, #000 0 34%, transparent 92%),
          linear-gradient(to right, transparent 0, #000 26%);
        -webkit-mask-composite: source-in;
        mask-image:
          linear-gradient(to left, #000 0 34%, transparent 92%),
          linear-gradient(to top, #000 0 34%, transparent 92%),
          linear-gradient(to right, transparent 0, #000 26%);
        mask-composite: intersect;
      }

      body[data-wm-theme][data-ds-dark-theme] .wm-art__car {
        background-image: url("${CAR_NIGHT}");
        mix-blend-mode: normal;
        opacity: var(--wm-art-opacity);
      }

      /* Vertical MARTINI outline, like a garage wall decal. */
      body[data-wm-theme] .wm-art__wordmark {
        position: absolute;
        top: 3%;
        right: -2px;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        font-family: var(--wm-display);
        font-size: clamp(64px, 9.4vw, 158px);
        font-style: italic;
        font-weight: 800;
        letter-spacing: .04em;
        line-height: .8;
        color: transparent;
        -webkit-text-stroke: 1px color-mix(in srgb, var(--wm-blue) 40%, transparent);
        opacity: var(--wm-wordmark-opacity);
        user-select: none;
      }

      /* Livery stack under the window titlebar, starting at the rail edge. */
      body[data-wm-theme] .wm-art__flag {
        position: absolute;
        top: 0;
        left: var(--wm-col-left, 0);
        width: min(46vw, 520px);
        height: 14px;
        display: flex;
        flex-direction: column;
        gap: 1px;
        padding-top: 2px;
        -webkit-mask-image: linear-gradient(to right, #000 0 52%, transparent 100%);
        mask-image: linear-gradient(to right, #000 0 52%, transparent 100%);
      }

      body[data-wm-theme] .wm-art__flag i {
        display: block;
        height: 2px;
      }

      body[data-wm-theme] .wm-art__flag i:nth-child(1),
      body[data-wm-theme] .wm-art__flag i:nth-child(2),
      body[data-wm-theme] .wm-art__flag i:nth-child(4) {
        background: var(--wm-blue);
      }

      body[data-wm-theme] .wm-art__flag i:nth-child(3) {
        background: var(--wm-red);
      }

      /* Finish line along the floor. */
      body[data-wm-theme] .wm-art__checker {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 4px;
        opacity: .18;
        background-image:
          conic-gradient(
            var(--wm-checker) 0 25%,
            transparent 0 50%,
            var(--wm-checker) 0 75%,
            transparent 0);
        background-size: 8px 8px;
        -webkit-mask-image: linear-gradient(to right, transparent, #000 16%, #000 84%, transparent);
        mask-image: linear-gradient(to right, transparent, #000 16%, #000 84%, transparent);
      }

      /* ---------- Pit-wall decal ---------------------------------------- */

      body[data-wm-theme] .wm-pit {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        padding: 1px 2px;
        color: var(--dsw-alias-label-caption);
        font-family: var(--wm-display);
        font-size: 8.5px;
        font-weight: 600;
        letter-spacing: .2em;
        line-height: 1;
        text-transform: uppercase;
        user-select: none;
      }

      body[data-wm-theme] .wm-pit__logo {
        width: 42px;
        height: auto;
        flex: none;
        opacity: .95;
        filter: drop-shadow(0 1px 1px rgba(2, 12, 26, .22));
      }

      body[data-wm-theme] .wm-pit__bars {
        display: inline-flex;
        flex-direction: column;
        gap: 1px;
        width: 10px;
        flex: none;
        transform: skewX(-18deg);
      }

      body[data-wm-theme] .wm-pit__bar {
        display: block;
        height: 1.5px;
        border-radius: .5px;
      }

      body[data-wm-theme] .wm-pit__bar--blue { background: var(--wm-blue); }
      body[data-wm-theme] .wm-pit__bar--red { background: var(--wm-red); }

      body[data-wm-theme] .wm-pit__label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      body[data-wm-theme] .wm-pit__dot {
        width: 2px;
        height: 2px;
        flex: none;
        border-radius: 99px;
        background: currentColor;
        opacity: .55;
      }

      body[data-wm-theme] .wm-pit__code {
        color: var(--wm-blue);
        font-weight: 800;
        letter-spacing: .08em;
      }

      body[data-wm-theme] .wm-pit__number {
        color: var(--wm-red);
        font-size: 10px;
        font-style: italic;
        font-weight: 800;
        letter-spacing: .02em;
      }

      body[data-wm-theme] .wm-pit__checker {
        width: 24px;
        height: 7px;
        flex: none;
        border-radius: 1px;
        opacity: .5;
        background-image:
          conic-gradient(
            currentColor 0 25%,
            transparent 0 50%,
            currentColor 0 75%,
            transparent 0);
        background-size: 7px 7px;
      }

      /* ---------- Pit-board mode switch --------------------------------- */

      body[data-wm-theme] .wm-mode {
        box-sizing: border-box;
        position: relative;
        display: inline-flex;
        flex: none;
        align-items: center;
        width: 58px;
        height: 24px;
        margin: 0;
        padding: 0;
        border: 1px solid var(--wm-line-strong);
        border-radius: 4px;
        background: color-mix(in srgb, var(--wm-ink) 7%, transparent);
        box-shadow: inset 0 1px 0 color-mix(in srgb, #FFFFFF 8%, transparent);
        color: var(--dsw-alias-label-tertiary);
        cursor: pointer;
        transition: border-color .15s ease, background .15s ease;
      }

      body[data-wm-theme] .wm-mode:hover {
        border-color: var(--wm-blue);
        background: var(--wm-blue-soft);
      }

      body[data-wm-theme] .wm-mode:focus-visible {
        outline: 2px solid var(--wm-blue);
        outline-offset: 2px;
      }

      body[data-wm-theme] .wm-mode__thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 26px;
        height: 18px;
        border-radius: 3px;
        background: linear-gradient(180deg, var(--wm-blue-bright), var(--wm-blue));
        box-shadow: 0 2px 7px color-mix(in srgb, var(--wm-blue) 40%, transparent);
        transition: transform .18s cubic-bezier(.2, .8, .2, 1), background .18s ease;
      }

      body[data-wm-theme] .wm-mode[data-mode="night"] .wm-mode__thumb {
        transform: translateX(26px);
        background: linear-gradient(180deg, var(--wm-navy), var(--wm-navy-deep));
        box-shadow:
          0 2px 8px rgba(0, 0, 0, .3),
          inset 0 0 0 1px color-mix(in srgb, var(--wm-blue) 60%, transparent);
      }

      body[data-wm-theme] .wm-mode__icon {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 100%;
        transition: color .15s ease;
      }

      body[data-wm-theme] .wm-mode[data-mode="day"] .wm-mode__icon--day,
      body[data-wm-theme] .wm-mode[data-mode="night"] .wm-mode__icon--night {
        color: #FFFFFF;
      }

      body[data-wm-theme] .wm-mode[data-mode="day"] .wm-mode__icon--night,
      body[data-wm-theme] .wm-mode[data-mode="night"] .wm-mode__icon--day {
        color: color-mix(in srgb, var(--wm-ink) 44%, transparent);
      }

      /* ---------- Settings page ----------------------------------------- */

      body[data-wm-theme] .wm-set {
        max-width: 860px;
        margin: 0 auto;
        padding: 26px 30px 40px;
        color: var(--dsw-alias-label-primary);
      }

      body[data-wm-theme] .wm-set__hero {
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: 26px;
        padding: 26px 28px;
        border-radius: 10px;
        background:
          radial-gradient(120% 150% at 92% -20%, #0A7FB9 0%, transparent 58%),
          linear-gradient(112deg, #051426 0%, #082A4C 56%, #0A5C8A 100%);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, .14),
          0 16px 40px rgba(2, 12, 26, .28);
        color: #EAF3FF;
      }

      body[data-wm-theme] .wm-set__hero::before {
        content: "";
        position: absolute;
        top: -24%;
        right: -8%;
        width: 62%;
        height: 150%;
        transform: rotate(24deg);
        opacity: .24;
        background: linear-gradient(
          to bottom,
          transparent 0 12%,
          var(--wm-blue-bright) 12% 15%,
          transparent 15% 19%,
          var(--wm-blue) 19% 22%,
          transparent 22% 26%,
          var(--wm-red) 26% 29%,
          transparent 29% 33%,
          var(--wm-blue) 33% 36%,
          transparent 36% 100%);
      }

      body[data-wm-theme] .wm-set__hero::after {
        content: "FW40";
        position: absolute;
        right: 20px;
        bottom: -12px;
        font-family: var(--wm-display);
        font-size: 92px;
        font-style: italic;
        font-weight: 800;
        letter-spacing: -.03em;
        color: transparent;
        -webkit-text-stroke: 1px rgba(234, 243, 255, .16);
        pointer-events: none;
      }

      body[data-wm-theme] .wm-set__logo {
        position: relative;
        z-index: 1;
        width: 190px;
        max-width: 42%;
        height: auto;
        flex: none;
        transform: rotate(-1.4deg);
        filter: drop-shadow(0 10px 22px rgba(0, 0, 0, .38));
      }

      body[data-wm-theme] .wm-set__heroText {
        position: relative;
        z-index: 1;
        min-width: 0;
      }

      body[data-wm-theme] .wm-set__eyebrow {
        display: block;
        margin-bottom: 9px;
        color: var(--wm-blue-bright);
        font-family: var(--wm-display);
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .28em;
        text-transform: uppercase;
      }

      body[data-wm-theme] .wm-set__hero h2 {
        margin: 0 0 8px;
        font-family: var(--wm-display);
        font-size: 30px;
        font-style: italic;
        font-weight: 800;
        letter-spacing: -.01em;
        line-height: 1;
        text-transform: uppercase;
        color: #F7FBFF;
      }

      body[data-wm-theme] .wm-set__lead {
        max-width: 46ch;
        margin: 0;
        color: rgba(234, 243, 255, .74);
        font-size: 12.5px;
        line-height: 1.55;
      }

      body[data-wm-theme] .wm-set__stats {
        display: flex;
        gap: 22px;
        width: max-content;
        margin-top: 18px;
        padding: 8px 10px;
        border: 1px solid rgba(234, 243, 255, .1);
        border-radius: 3px;
        background: rgba(3, 12, 24, .32);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);
        backdrop-filter: blur(3px);
      }

      body[data-wm-theme] .wm-set__stat {
        display: flex;
        align-items: baseline;
        gap: 5px;
        color: rgba(234, 243, 255, .55);
        font-family: var(--wm-display);
        font-size: 8px;
        font-weight: 600;
        letter-spacing: .18em;
        text-transform: uppercase;
      }

      body[data-wm-theme] .wm-set__stat b {
        color: var(--wm-blue-bright);
        font-size: 15px;
        font-style: italic;
        letter-spacing: .02em;
      }

      body[data-wm-theme] .wm-set__section {
        margin-top: 28px;
      }

      body[data-wm-theme] .wm-set__sectionHead {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 11px;
      }

      body[data-wm-theme] .wm-set__section h3 {
        margin: 0;
        color: var(--dsw-alias-label-primary);
        font-family: var(--wm-display);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .2em;
        text-transform: uppercase;
      }

      body[data-wm-theme] .wm-set__hint {
        color: var(--dsw-alias-label-tertiary);
        font-size: 10.5px;
      }

      body[data-wm-theme] .wm-set__modes {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      body[data-wm-theme] .wm-set__mode {
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 11px;
        border: 1px solid var(--wm-line);
        border-radius: 7px;
        background: var(--wm-plate);
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
        transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease;
      }

      body[data-wm-theme] .wm-set__mode:hover {
        border-color: color-mix(in srgb, var(--wm-blue) 55%, var(--wm-line));
        transform: translateY(-1px);
      }

      body[data-wm-theme] .wm-set__mode[aria-pressed="true"] {
        border-color: var(--wm-blue);
        box-shadow:
          0 0 0 1px var(--wm-blue),
          0 8px 22px color-mix(in srgb, var(--wm-blue) 18%, transparent);
      }

      body[data-wm-theme] .wm-set__mode:focus-visible {
        outline: 2px solid var(--wm-blue);
        outline-offset: 2px;
      }

      body[data-wm-theme] .wm-set__swatch {
        position: relative;
        width: 74px;
        height: 50px;
        flex: none;
        overflow: hidden;
        border-radius: 4px;
        border: 1px solid rgba(7, 26, 49, .16);
      }

      body[data-wm-theme] .wm-set__swatch--day {
        background:
          linear-gradient(160deg, #FFFFFF 0 58%, #E8F0F9 58% 100%);
      }

      body[data-wm-theme] .wm-set__swatch--night {
        background:
          radial-gradient(80% 90% at 80% 0%, #0A5C8A, transparent 70%),
          linear-gradient(160deg, #061426 0 58%, #030B16 58% 100%);
      }

      body[data-wm-theme] .wm-set__swatch::before {
        content: "";
        position: absolute;
        left: 7px;
        right: 7px;
        bottom: 8px;
        height: 18px;
        border-radius: 2px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, .9), transparent),
          var(--wm-blue);
        opacity: .9;
      }

      body[data-wm-theme] .wm-set__swatch--night::before {
        background:
          linear-gradient(180deg, rgba(255, 255, 255, .18), transparent),
          #0A2A4A;
        box-shadow: inset 0 0 0 1px rgba(53, 196, 240, .32);
      }

      body[data-wm-theme] .wm-set__swatch::after {
        content: "";
        position: absolute;
        left: 7px;
        top: 8px;
        width: 4px;
        height: 30px;
        background: linear-gradient(
          90deg,
          var(--wm-blue-bright) 0 1px,
          var(--wm-blue) 1px 2px,
          var(--wm-red) 2px 3px,
          var(--wm-blue) 3px 4px);
      }

      body[data-wm-theme] .wm-set__modeText {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
      }

      body[data-wm-theme] .wm-set__modeName {
        display: flex;
        align-items: center;
        gap: 7px;
        font-family: var(--wm-display);
        font-size: 14px;
        font-style: italic;
        font-weight: 700;
        letter-spacing: .02em;
        text-transform: uppercase;
      }

      body[data-wm-theme] .wm-set__modeNote {
        color: var(--dsw-alias-label-tertiary);
        font-size: 10.5px;
        line-height: 1.4;
      }

      body[data-wm-theme] .wm-set__active {
        display: inline-block;
        padding: 1px 5px;
        border-radius: 2px;
        background: var(--wm-blue-soft);
        color: var(--wm-blue);
        font-family: var(--wm-display);
        font-size: 7px;
        font-weight: 700;
        font-style: normal;
        letter-spacing: .16em;
      }

      body[data-wm-theme] .wm-set__palette {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      body[data-wm-theme] .wm-set__chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 7px 5px 5px;
        border: 1px solid var(--wm-line);
        border-radius: 4px;
        background: var(--wm-plate);
        color: var(--dsw-alias-label-secondary);
        font-family: var(--wm-display);
        font-size: 7.5px;
        font-weight: 600;
        letter-spacing: .11em;
        text-transform: uppercase;
      }

      body[data-wm-theme] .wm-set__chip i {
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 3px;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .14);
      }

      body[data-wm-theme] .wm-set__details {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }

      body[data-wm-theme] .wm-set__detail {
        padding: 12px 13px;
        border: 1px solid var(--wm-line);
        border-left: 2px solid var(--wm-blue);
        border-radius: 4px;
        background: var(--wm-plate);
      }

      body[data-wm-theme] .wm-set__detail b {
        display: block;
        margin-bottom: 4px;
        color: var(--dsw-alias-label-primary);
        font-family: var(--wm-display);
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .16em;
        text-transform: uppercase;
      }

      body[data-wm-theme] .wm-set__detail span {
        color: var(--dsw-alias-label-tertiary);
        font-size: 10.5px;
        line-height: 1.45;
      }

      body[data-wm-theme] .wm-set__footer {
        margin-top: 24px;
        padding-top: 14px;
        border-top: 1px solid var(--wm-line);
        color: var(--dsw-alias-label-tertiary);
        font-size: 10.5px;
        line-height: 1.5;
      }

      /* ---------- Small screens and motion ------------------------------- */

      @media (max-width: 1180px) {
        body[data-wm-theme] .wm-art__wordmark {
          display: none;
        }
      }

      @media (max-width: 980px) {
        body[data-wm-theme] .wm-art__car {
          width: min(48vw, 380px);
        }

        body[data-wm-theme] .wm-set__details {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 720px) {
        body[data-wm-theme] .wm-art__car {
          display: none;
        }

        body[data-wm-theme] .wm-set {
          padding: 18px 16px 30px;
        }

        body[data-wm-theme] .wm-set__hero {
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
        }

        body[data-wm-theme] .wm-set__logo {
          width: 160px;
          max-width: 80%;
        }

        body[data-wm-theme] .wm-set__modes {
          grid-template-columns: 1fr;
        }

        body[data-wm-theme] .wm-pit__label,
        body[data-wm-theme] .wm-pit__bars {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        body[data-wm-theme] button[class*="newSession"],
        body[data-wm-theme] button[aria-label="Send message"],
        body[data-wm-theme] .wm-mode__thumb,
        body[data-wm-theme] .wm-set__mode,
        body[data-wm-theme] [data-composer-card] {
          transition: none;
        }
      }
    `;

    /* -------------------------------------------------------------------- */
    /* Behaviour                                                            */
    /* -------------------------------------------------------------------- */

    const NS = 'williams-martini';
    const RAIL_FALLOFF = 17;

    const en = {
      'mode.toLight': 'Switch to daylight',
      'mode.toDark': 'Switch to night race',
      'settings.nav': 'Martini Racing',
      'settings.eyebrow': 'Livery · FW40 · 2017',
      'settings.title': 'Williams Martini Racing',
      'settings.lead':
        'A paddock-to-floodlight livery for DeepSeek Harness, cut from the Martini four-stripe livery and the FW40 detail.',
      'settings.choose': 'Choose the light',
      'settings.chooseHint': 'Switches the whole shell',
      'settings.paddock': 'Paddock',
      'settings.paddockNote': 'Ice white, ink navy, daylight blue.',
      'settings.night': 'Night race',
      'settings.nightNote': 'Deep navy, floodlights, electric blue.',
      'settings.active': 'Active',
      'settings.palette': 'Race palette',
      'settings.paletteHint': 'Six colours, nothing else',
      'settings.details': 'Livery details',
      'settings.detail1': 'Martini rails',
      'settings.detail1Note': 'Four-stripe edges on the rail, composer and buttons.',
      'settings.detail2': 'Supplied artwork',
      'settings.detail2Note': 'The die-cut Martini roundel and the FW40 sidepod detail.',
      'settings.detail3': 'Race typography',
      'settings.detail3Note': 'Condensed italic display type and pit-board micro labels.',
      'settings.footnote':
        'The theme is a token layer: the built-in Light, Dark and System preference still works. Disabling the plugin restores the stock palette and removes every livery surface.',
      'settings.colour.navy': 'Ink navy',
      'settings.colour.blue': 'Martini blue',
      'settings.colour.red': 'Rosso',
      'settings.colour.ice': 'Ice white',
      'settings.colour.silver': 'Silverstone',
      'settings.colour.gold': 'Podium gold',
      'settings.statLivery': 'stripes',
      'settings.statNumber': 'race number',
      'settings.statSeason': 'season',
    };

    const zh = {
      'mode.toLight': '切换到日间模式',
      'mode.toDark': '切换到夜赛模式',
      'settings.nav': '马天尼赛车',
      'settings.eyebrow': '涂装 · FW40 · 2017',
      'settings.title': '威廉姆斯·马天尼车队',
      'settings.lead': '为 DeepSeek Harness 打造的围场到夜赛涂装，取白马天尼四道条纹与 FW40 侧箱细节。',
      'settings.choose': '选择光线',
      'settings.chooseHint': '切换整个界面',
      'settings.paddock': '围场',
      'settings.paddockNote': '冰白、墨蓝与日光蓝。',
      'settings.night': '夜赛',
      'settings.nightNote': '深海军蓝、泛光灯与电光蓝。',
      'settings.active': '当前',
      'settings.palette': '赛车色板',
      'settings.paletteHint': '只有这六种颜色',
      'settings.details': '涂装细节',
      'settings.detail1': '马天尼条纹',
      'settings.detail1Note': '侧栏、输入框与按钮上的四道条纹边缘。',
      'settings.detail2': '原始素材',
      'settings.detail2Note': '模切马天尼徽标与 FW40 侧箱特写。',
      'settings.detail3': '赛车字体',
      'settings.detail3Note': '窄体斜体标题与维修区标牌式小字。',
      'settings.footnote':
        '主题以令牌层实现，内置的浅色、深色与跟随系统仍然有效。停用插件后即恢复默认色板并移除所有涂装表面。',
      'settings.colour.navy': '墨海军蓝',
      'settings.colour.blue': '马天尼蓝',
      'settings.colour.red': '赛车红',
      'settings.colour.ice': '冰白',
      'settings.colour.silver': '银石',
      'settings.colour.gold': '领奖台金',
      'settings.statLivery': '道条纹',
      'settings.statNumber': '号赛车',
      'settings.statSeason': '赛季',
    };

    /**
     * Writes --wm-tick on every turn-rail mark: 100% at the active turn, fading
     * toward silver with distance from it. CSS cannot compare siblings.
     */
    function paintRailFalloff() {
      for (const rail of document.querySelectorAll('[class*="marks"]')) {
        const marks = Array.from(rail.children).filter(
          (el) => typeof el.className === 'string' && el.className.includes('_mark'),
        );
        if (marks.length === 0) continue;
        const active = marks.findIndex((el) => el.className.includes('markActive'));
        marks.forEach((el, i) => {
          const mix = active < 0 ? 55 : Math.max(0, 100 - Math.abs(i - active) * RAIL_FALLOFF);
          el.style.setProperty('--wm-tick', `${mix}%`);
        });
      }
    }

    /**
     * Tracks the active scheme through the theme service, the source of truth
     * for the resolved palette. The service emits `theme/change`; reading the
     * snapshot also covers the first mount before any change event.
     */
    function useDarkScheme(clock) {
      const [dark, setDark] = React.useState(clock.read);
      React.useEffect(() => {
        const sync = () => setDark(clock.read());
        sync();
        return clock.subscribe(sync);
      }, [clock]);
      return dark;
    }

    /** The Martini roundel: four livery stripes under a red race disc. */
    function MartiniMark({ size = 24 }) {
      return h(
        'svg',
        {
          viewBox: '0 0 64 64',
          width: size,
          height: size,
          role: 'img',
          'aria-label': 'Martini Racing',
          style: { display: 'block', flex: 'none' },
        },
        h(
          'defs',
          null,
          h(
            'linearGradient',
            { id: 'wmMarkNavy', x1: '0', y1: '0', x2: '0', y2: '1' },
            h('stop', { offset: '0', stopColor: '#0A2A4A' }),
            h('stop', { offset: '1', stopColor: '#04101F' }),
          ),
          h(
            'linearGradient',
            { id: 'wmMarkRed', x1: '0', y1: '0', x2: '0', y2: '1' },
            h('stop', { offset: '0', stopColor: '#F02542' }),
            h('stop', { offset: '1', stopColor: '#C80022' }),
          ),
          h('clipPath', { id: 'wmMarkClip' }, h('circle', { cx: 32, cy: 32, r: 27 })),
        ),
        h('circle', { cx: 32, cy: 32, r: 30, fill: '#F7FBFF', opacity: 0.96 }),
        h('circle', { cx: 32, cy: 32, r: 28, fill: 'url(#wmMarkNavy)' }),
        h(
          'g',
          { clipPath: 'url(#wmMarkClip)' },
          h('rect', { x: 0, y: 13, width: 64, height: 3.6, fill: '#28B9E8' }),
          h('rect', { x: 0, y: 19, width: 64, height: 3.6, fill: '#009FDF' }),
          h('rect', { x: 0, y: 25, width: 64, height: 3.6, fill: '#E4002B' }),
          h('rect', { x: 0, y: 31, width: 64, height: 3.6, fill: '#009FDF' }),
        ),
        h('circle', {
          cx: 32,
          cy: 32,
          r: 13.5,
          fill: 'url(#wmMarkRed)',
          stroke: '#EFBF4C',
          strokeWidth: 2.4,
        }),
        h(
          'text',
          {
            x: 32,
            y: 38.5,
            textAnchor: 'middle',
            fontFamily: 'Bahnschrift, Segoe UI, sans-serif',
            fontSize: 17,
            fontStyle: 'italic',
            fontWeight: 800,
            fill: '#FFFFFF',
          },
          'M',
        ),
      );
    }

    /** Sidebar lockup: the supplied die-cut logo plus the team name. */
    function BrandLockup() {
      return h(
        'span',
        { className: 'wm-brand', role: 'img', 'aria-label': 'Williams Martini Racing' },
        h(
          'span',
          { className: 'wm-brand__text' },
          h('span', { className: 'wm-brand__name' }, 'WILLIAMS'),
          h('span', { className: 'wm-brand__sub' }, 'MARTINI RACING'),
        ),
      );
    }

    /** The supplied sticker as the sidebar brand mark. */
    function SidebarLogo() {
      return h('img', {
        className: 'wm-side-logo',
        src: LOGO,
        alt: 'Martini Racing',
        draggable: false,
      });
    }

    /** Hero plate: the supplied die-cut logo with a small race-code caption. */
    function HeroMark() {
      return h(
        'span',
        { className: 'wm-hero' },
        h('img', {
          className: 'wm-hero__logo',
          src: LOGO,
          width: 148,
          height: 66,
          alt: 'Williams Martini Racing',
          draggable: false,
        }),
        h(
          'span',
          { className: 'wm-hero__meta', 'aria-hidden': true },
          h('span', { className: 'wm-hero__code' }, 'FW40'),
          h('span', { className: 'wm-hero__dot' }),
          h('span', null, '2017'),
          h('span', { className: 'wm-hero__dot' }),
          h('span', null, '№19'),
        ),
      );
    }

    /** Pit-wall strip under the composer. */
    function PitStrip() {
      return h(
        'div',
        { className: 'wm-pit', 'aria-hidden': true },
        h('img', { className: 'wm-pit__logo', src: PLATE, alt: '', draggable: false }),
        h(
          'span',
          { className: 'wm-pit__bars' },
          ['blue', 'blue', 'red', 'blue'].map((colour, i) =>
            h('i', { key: i, className: `wm-pit__bar wm-pit__bar--${colour}` }),
          ),
        ),
        h('span', { className: 'wm-pit__label' }, 'Williams Martini Racing'),
        h('span', { className: 'wm-pit__dot' }),
        h('span', { className: 'wm-pit__code' }, 'FW40'),
        h('span', { className: 'wm-pit__number' }, '19'),
        h('span', { className: 'wm-pit__checker' }),
      );
    }

    function SunIcon() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 11, height: 11, 'aria-hidden': true },
        h('circle', { cx: 8, cy: 8, r: 3, fill: 'currentColor' }),
        h('path', {
          d: 'M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3.05 3.05l1.13 1.13M11.82 11.82l1.13 1.13M12.95 3.05l-1.13 1.13M4.18 11.82l-1.13 1.13',
          stroke: 'currentColor',
          strokeWidth: 1.4,
          strokeLinecap: 'round',
        }),
      );
    }

    function MoonIcon() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 11, height: 11, 'aria-hidden': true },
        h('path', {
          d: 'M13.2 9.6A5.6 5.6 0 0 1 6.4 2.8a5.6 5.6 0 1 0 6.8 6.8Z',
          fill: 'currentColor',
        }),
      );
    }

    function ModeToggle({ t, setTheme, clock }) {
      const dark = useDarkScheme(clock);
      const action = dark ? t('mode.toLight') : t('mode.toDark');
      const onClick = React.useCallback(() => setTheme(dark ? 'light' : 'dark'), [dark, setTheme]);
      return h(
        'button',
        {
          type: 'button',
          className: 'wm-mode',
          'aria-label': action,
          title: action,
          'data-mode': dark ? 'night' : 'day',
          onClick,
        },
        h('span', { className: 'wm-mode__icon wm-mode__icon--day' }, h(SunIcon)),
        h('span', { className: 'wm-mode__icon wm-mode__icon--night' }, h(MoonIcon)),
        h('span', { className: 'wm-mode__thumb', 'aria-hidden': true }),
      );
    }

    function ModeCard({ mode, label, note, active, onSelect, t }) {
      return h(
        'button',
        {
          type: 'button',
          className: 'wm-set__mode',
          'aria-pressed': active,
          onClick: onSelect,
        },
        h('span', { className: `wm-set__swatch wm-set__swatch--${mode}`, 'aria-hidden': true }),
        h(
          'span',
          { className: 'wm-set__modeText' },
          h(
            'span',
            { className: 'wm-set__modeName' },
            label,
            active ? h('span', { className: 'wm-set__active' }, t('settings.active')) : null,
          ),
          h('span', { className: 'wm-set__modeNote' }, note),
        ),
      );
    }

    const CHIPS = [
      ['#071A31', 'settings.colour.navy'],
      ['#009FDF', 'settings.colour.blue'],
      ['#E4002B', 'settings.colour.red'],
      ['#F1F5FA', 'settings.colour.ice'],
      ['#B9C9DA', 'settings.colour.silver'],
      ['#EFBF4C', 'settings.colour.gold'],
    ];

    function MartiniSettings({ t, setTheme, clock }) {
      const dark = useDarkScheme(clock);
      return h(
        'div',
        { className: 'wm-set' },
        h(
          'header',
          { className: 'wm-set__hero' },
          h('img', {
            className: 'wm-set__logo',
            src: LOGO,
            alt: 'Martini Racing',
            draggable: false,
          }),
          h(
            'div',
            { className: 'wm-set__heroText' },
            h('span', { className: 'wm-set__eyebrow' }, t('settings.eyebrow')),
            h('h2', null, t('settings.title')),
            h('p', { className: 'wm-set__lead' }, t('settings.lead')),
            h(
              'div',
              { className: 'wm-set__stats' },
              h('span', { className: 'wm-set__stat' }, h('b', null, '4'), ' ', t('settings.statLivery')),
              h('span', { className: 'wm-set__stat' }, h('b', null, '19'), ' ', t('settings.statNumber')),
              h('span', { className: 'wm-set__stat' }, h('b', null, '2017'), ' ', t('settings.statSeason')),
            ),
          ),
        ),
        h(
          'section',
          { className: 'wm-set__section' },
          h(
            'div',
            { className: 'wm-set__sectionHead' },
            h('h3', null, t('settings.choose')),
            h('span', { className: 'wm-set__hint' }, t('settings.chooseHint')),
          ),
          h(
            'div',
            { className: 'wm-set__modes' },
            h(ModeCard, {
              mode: 'day',
              label: t('settings.paddock'),
              note: t('settings.paddockNote'),
              active: !dark,
              onSelect: () => setTheme('light'),
              t,
            }),
            h(ModeCard, {
              mode: 'night',
              label: t('settings.night'),
              note: t('settings.nightNote'),
              active: dark,
              onSelect: () => setTheme('dark'),
              t,
            }),
          ),
        ),
        h(
          'section',
          { className: 'wm-set__section' },
          h(
            'div',
            { className: 'wm-set__sectionHead' },
            h('h3', null, t('settings.palette')),
            h('span', { className: 'wm-set__hint' }, t('settings.paletteHint')),
          ),
          h(
            'div',
            { className: 'wm-set__palette' },
            CHIPS.map(([colour, key]) =>
              h(
                'span',
                { key, className: 'wm-set__chip' },
                h('i', { style: { background: colour }, 'aria-hidden': true }),
                t(key),
              ),
            ),
          ),
        ),
        h(
          'section',
          { className: 'wm-set__section' },
          h('div', { className: 'wm-set__sectionHead' }, h('h3', null, t('settings.details'))),
          h(
            'div',
            { className: 'wm-set__details' },
            h(
              'div',
              { className: 'wm-set__detail' },
              h('b', null, t('settings.detail1')),
              h('span', null, t('settings.detail1Note')),
            ),
            h(
              'div',
              { className: 'wm-set__detail' },
              h('b', null, t('settings.detail2')),
              h('span', null, t('settings.detail2Note')),
            ),
            h(
              'div',
              { className: 'wm-set__detail' },
              h('b', null, t('settings.detail3')),
              h('span', null, t('settings.detail3Note')),
            ),
          ),
        ),
        h('footer', { className: 'wm-set__footer' }, t('settings.footnote')),
      );
    }

    return {
      inject: ['theme', 'slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { en, zh }), 'martini: locale');

        ctx.effect(() => {
          const root = document.documentElement;
          root.style.setProperty('--wm-display', DISPLAY_FONT);
          return () => root.style.removeProperty('--wm-display');
        }, 'martini: display font');

        ctx.effect(() => {
          document.body.setAttribute('data-wm-theme', 'martini');
          return () => document.body.removeAttribute('data-wm-theme');
        }, 'martini: body marker');

        ctx.effect(
          () => ctx.theme.overrideTokens('@williams/dsh-martini-theme', TOKENS),
          'martini: token overrides',
        );

        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.wmTheme = 'martini';
          style.textContent = CSS;
          document.head.append(style);
          return () => style.remove();
        }, 'martini: global styles');

        ctx.effect(() => {
          const art = document.createElement('div');
          art.className = 'wm-art';
          art.setAttribute('aria-hidden', 'true');
          art.innerHTML =
            '<div class="wm-art__grid"></div>' +
            '<div class="wm-art__stripe"></div>' +
            '<div class="wm-art__car"></div>' +
            '<div class="wm-art__wordmark">MARTINI</div>' +
            '<div class="wm-art__flag"><i></i><i></i><i></i><i></i></div>' +
            '<div class="wm-art__checker"></div>';
          document.body.append(art);
          return () => art.remove();
        }, 'martini: artwork layer');

        ctx.effect(() => {
          let pending = 0;
          const schedule = () => {
            if (pending) return;
            pending = requestAnimationFrame(() => {
              pending = 0;
              paintRailFalloff();
            });
          };
          paintRailFalloff();
          const observer = new MutationObserver(schedule);
          observer.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['class'],
          });
          return () => {
            observer.disconnect();
            if (pending) cancelAnimationFrame(pending);
            for (const el of document.querySelectorAll('[class*="marks"] > *')) {
              el.style.removeProperty('--wm-tick');
            }
          };
        }, 'martini: rail falloff');

        ctx.effect(() => {
          const root = document.documentElement;
          let watched = null;
          let left = -1;
          const sync = () => {
            const column = document.querySelector('[class*="centerCol"]');
            const next = column ? Math.round(column.getBoundingClientRect().left) : 0;
            if (next === left) return;
            left = next;
            root.style.setProperty('--wm-col-left', `${next}px`);
          };
          const ro = new ResizeObserver(sync);
          const ensure = () => {
            const column = document.querySelector('[class*="centerCol"]');
            if (column && column !== watched) {
              if (watched) ro.unobserve(watched);
              watched = column;
              ro.observe(column);
            }
            sync();
          };
          ensure();
          ro.observe(document.body);
          window.addEventListener('resize', ensure);
          let pending = 0;
          const observer = new MutationObserver(() => {
            if (pending) return;
            pending = requestAnimationFrame(() => {
              pending = 0;
              ensure();
            });
          });
          observer.observe(document.body, { subtree: true, childList: true });
          return () => {
            observer.disconnect();
            ro.disconnect();
            window.removeEventListener('resize', ensure);
            if (pending) cancelAnimationFrame(pending);
            root.style.removeProperty('--wm-col-left');
          };
        }, 'martini: artwork anchor');

        const t = ctx.locale.bind(NS);
        const setTheme = (id) => ctx.theme.setTheme(id);
        const clock = {
          read: () => ctx.theme.getTheme().active.colorScheme === 'dark',
          subscribe: (fn) => ctx.on('theme/change', fn),
        };

        ctx.slots.inject('conversation.session.header.utilities', () =>
          ctx.slots.register(
            { name: 'conversation.session.header.utilities', id: 'wm-mode-toggle', order: 5 },
            (props) => h(ModeToggle, { ...props, t, setTheme, clock }),
          ),
        );

        ctx.slots.inject('sidebar.brand.mark', () =>
          ctx.slots.register({ name: 'sidebar.brand.mark', priority: -1 }, SidebarLogo),
        );

        ctx.slots.inject('sidebar.brand.name', () =>
          ctx.slots.register({ name: 'sidebar.brand.name', priority: -1 }, BrandLockup),
        );

        ctx.slots.inject('conversation.hero.brand.mark', () =>
          ctx.slots.register(
            { name: 'conversation.hero.brand.mark' },
            ({ size }) => h(HeroMark, { size }),
          ),
        );

        ctx.slots.inject('conversation.composer.dock', () =>
          ctx.slots.register(
            { name: 'conversation.composer.dock', id: 'wm-pit-strip', order: 2 },
            PitStrip,
          ),
        );

        ctx.slots.inject('settings.section', () =>
          ctx.slots.register(
            {
              name: 'settings.section',
              id: 'martini-racing',
              order: 12,
              label: () => t('settings.nav'),
            },
            (props) => h(MartiniSettings, { ...props, t, setTheme, clock }),
          ),
        );

        ctx.slots.inject('settings.section.icon', () =>
          ctx.slots.register(
            { name: 'settings.section.icon', id: 'martini-racing', order: 12 },
            ({ size }) => h(MartiniMark, { size: size || 16 }),
          ),
        );
      },
    };
  },
});
