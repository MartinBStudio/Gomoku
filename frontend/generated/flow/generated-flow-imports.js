import 'Frontend/generated/jar-resources/flow-component-renderer.js';
import '@vaadin/polymer-legacy-adapter/style-modules.js';
import 'Frontend/generated/jar-resources/vaadin-grid-flow-selection-column.js';
import '@vaadin/grid/theme/lumo/vaadin-grid-column.js';
import '@vaadin/app-layout/theme/lumo/vaadin-app-layout.js';
import '@vaadin/tooltip/theme/lumo/vaadin-tooltip.js';
import '@vaadin/button/theme/lumo/vaadin-button.js';
import 'Frontend/generated/jar-resources/buttonFunctions.js';
import 'Frontend/generated/jar-resources/dndConnector.js';
import '@vaadin/vertical-layout/theme/lumo/vaadin-vertical-layout.js';
import '@vaadin/horizontal-layout/theme/lumo/vaadin-horizontal-layout.js';
import '@vaadin/grid/theme/lumo/vaadin-grid-column-group.js';
import '@vaadin/context-menu/theme/lumo/vaadin-context-menu.js';
import 'Frontend/generated/jar-resources/contextMenuConnector.js';
import 'Frontend/generated/jar-resources/contextMenuTargetConnector.js';
import '@vaadin/grid/theme/lumo/vaadin-grid.js';
import '@vaadin/grid/theme/lumo/vaadin-grid-sorter.js';
import '@vaadin/checkbox/theme/lumo/vaadin-checkbox.js';
import 'Frontend/generated/jar-resources/gridConnector.js';
import '@vaadin/app-layout/theme/lumo/vaadin-drawer-toggle.js';
import 'Frontend/generated/jar-resources/lit-renderer.ts';
import '@vaadin/common-frontend/ConnectionIndicator.js';
import '@vaadin/vaadin-lumo-styles/color-global.js';
import '@vaadin/vaadin-lumo-styles/typography-global.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';

const loadOnDemand = (key) => {
  const pending = [];
  if (key === '596d574eb7052b72f8bcdca3a97159cab5e6f3ad08c7c465c84c1c622dd942eb') {
    pending.push(import('./chunks/chunk-596d574eb7052b72f8bcdca3a97159cab5e6f3ad08c7c465c84c1c622dd942eb.js'));
  }
  if (key === 'd8618f7d40c9dda46178406be327e4e47b2fb9cd889ab8ae340f490a94b22d64') {
    pending.push(import('./chunks/chunk-d8618f7d40c9dda46178406be327e4e47b2fb9cd889ab8ae340f490a94b22d64.js'));
  }
  if (key === 'f87b08ae7fc9bad1463c38dbd32aee464c997489e7b4c79e950fcceb8c22b83d') {
    pending.push(import('./chunks/chunk-f87b08ae7fc9bad1463c38dbd32aee464c997489e7b4c79e950fcceb8c22b83d.js'));
  }
  return Promise.all(pending);
}

window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow.loadOnDemand = loadOnDemand;