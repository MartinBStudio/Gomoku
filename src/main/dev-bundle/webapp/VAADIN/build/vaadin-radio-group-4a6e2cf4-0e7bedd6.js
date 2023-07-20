import{U as e,y as i,j as d,l as p,F as a}from"./indexhtml-79e760f9.js";import{labelProperties as l,helperTextProperties as s,errorMessageProperties as n}from"./vaadin-text-field-e82c445d-6d62bc11.js";const c={tagName:"vaadin-radio-group",displayName:"RadioButtonGroup",elements:[{selector:"vaadin-radio-group",displayName:"Group",properties:[e.backgroundColor,e.borderColor,e.borderWidth,e.borderRadius,e.padding]},{selector:"vaadin-radio-group::part(label)",displayName:"Label",properties:l},{selector:"vaadin-radio-group::part(helper-text)",displayName:"Helper text",properties:s},{selector:"vaadin-radio-group::part(error-message)",displayName:"Error message",properties:n},{selector:"vaadin-radio-group vaadin-radio-button",displayName:"Radio buttons",properties:[{propertyName:"--vaadin-radio-button-size",displayName:"Radio button size",defaultValue:"var(--lumo-font-size-l)",editorType:i.range,presets:d.lumoFontSize,icon:"square"}]},{selector:"vaadin-radio-group vaadin-radio-button::part(radio)",displayName:"Radio part",properties:[e.backgroundColor,e.borderColor,e.borderWidth]},{selector:"vaadin-radio-group vaadin-radio-button[checked]::part(radio)",stateAttribute:"checked",stateElementSelector:"vaadin-radio-group vaadin-radio-button",displayName:"Radio part (when checked)",properties:[e.backgroundColor,e.borderColor,e.borderWidth]},{selector:"vaadin-radio-group vaadin-radio-button::part(radio)::after",displayName:"Selection indicator",properties:[{...p.iconColor,propertyName:"border-color"}]},{selector:"vaadin-radio-group vaadin-radio-button label",displayName:"Label",properties:[a.textColor,a.fontSize,a.fontWeight,a.fontStyle]}],setupElement(t){const o=document.createElement("vaadin-radio-button"),r=document.createElement("label");r.textContent="Some label",r.setAttribute("slot","label"),o.append(r),t.append(o)}};export{c as default};
