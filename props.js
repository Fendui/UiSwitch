import { setProp, prop, getConfig } from "/src/framework/props/utils";

const props = getConfig("UiSwitch");

export default function () {
  return {
    modelValue: prop(Boolean, setProp(props.modelValue, "boolean")),
    tag: prop(String, setProp(props.tag, "string") || "button"),
    id: prop(String, setProp(props.id, "string")),

    required: prop(Boolean, setProp(props.required, "boolean")),
    readonly: prop(Boolean, setProp(props.readonly, "boolean")),
    disabled: prop(Boolean, setProp(props.disabled, "boolean")),
    validate: prop(Function, setProp(props.validate, "function")),

    // used when there's no v-model
    initial: prop(Boolean, setProp(props.initial, "boolean")),

    height: prop([String, Number], setProp(props.height, ["string", "number"])),

    width: prop([String, Number], setProp(props.width, ["string", "number"]))
  };
}
