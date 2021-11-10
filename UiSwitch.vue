<script>
import { computed, reactive } from "@vue/reactivity";
import {
  defineComponent,
  getCurrentInstance,
  h,
  nextTick,
  resolveDynamicComponent,
  watch,
} from "@vue/runtime-core";
import { vibrate } from "/src/utils/core";
import props from "./props";

export default defineComponent({
  name: "UiSwitch",
  inheritAttrs: false,
  props: props(),
  emits: ["update:modelValue"],
  setup(p, { emit, slots }) {
    const data = reactive({
      inputDirtied: false,
      manualChecked: false,
    });

    const i = getCurrentInstance();

    const methods = {
      validate() {
        data.inputDirtied = true;
        p.validate(vmodel.value);
        this.setValidationMessage();
      },

      toggle(value) {
        const inactive = p.readonly || p.disabled;

        if (inactive) {
          return;
        }

        emit("update:modelValue", value);

        data.manualChecked = value;
      },

      setValidationMessage() {
        nextTick(() => {
          p.validate(vmodel.value);

          const input = i.refs.input;
          const message = validation.value.message;

          input?.setCustomValidity?.(message);
        });
      },
    };

    methods.setValidationMessage();

    if (typeof p.modelValue == "undefined") {
      data.manualChecked = p.initial || false;
    }

    const scoping = { "data-ui-switch": "" };

    const div = (d, c) => h("div", d, c);

    const input = (d, c) => h("input", d, c);

    const vmodel = computed(() => {
      if (typeof p.modelValue == "boolean") {
        return p.modelValue;
      }
      return data.manualChecked;
    });

    const validation = computed(() => {
      if (typeof p.validate != "function") {
        return {
          valid: undefined,
          message: "",
        };
      }

      const validator = p.validate?.(vmodel.value);

      if (typeof validator == "undefined" || !data.inputDirtied) {
        return {
          valid: undefined,
          message: "",
        };
      }

      if (typeof validator == "string") {
        return {
          valid: false,
          message: validator,
        };
      }

      if (validator === true) {
        return {
          valid: true,
          message: "",
        };
      }

      return {
        valid: undefined,
        message: "",
      };
    });

    watch(
      () => validation.value,
      () => {
        methods.setValidationMessage();
      }
    );

    const payload = computed(() => ({
      active: vmodel.value,
      validation: validation.value,
      toggle: methods.toggle,
    }));

    const getSize = computed(() => {
      const output = {
        width: "",
        height: "",
      };

      if (typeof p.width == "string") {
        output.width = p.width;
      } else if (typeof p.width == "number") {
        output.width = `${p.width}px`;
      }

      if (typeof p.height == "string") {
        output.height = p.height;
      } else if (typeof p.height == "number") {
        output.height = `${p.height}px`;
      }

      return output;
    });

    return () => {
      // const inactive = p.readonly || p.disabled;

      return [
        slots.prepend?.(payload.value) || null,
        h(
          resolveDynamicComponent(p.tag),
          {
            ...scoping,
            role: "switch",
            "aria-checked": `${vmodel.value}`,
            "aria-readonly": p.readonly,
            class: [
              "root",
              {
                checked: vmodel.value,
              },
            ],
            style: {
              "--ui-height": getSize.value.height,
              "--ui-width": getSize.value.width,
            },
            onClick: () => {
              i.refs?.input?.click?.();

              vibrate();
            },
          },
          [
            div(
              {
                ...scoping,
                class: [
                  "track",
                  {
                    checked: vmodel.value,
                  },
                ],
              },
              [slots.track?.(payload.value) || null]
            ),
            div(
              {
                ...scoping,
                class: [
                  "thumb",
                  {
                    checked: vmodel.value,
                  },
                ],
              },
              [
                input({
                  ref: "input",
                  ...scoping,
                  type: "checkbox",
                  id: p.id,
                  tabindex: "-1",
                  checked: vmodel.value ? "checked" : undefined,
                  required: p.required,
                  disabled: p.disabled,
                  readonly: p.readonly,
                  class: ["input"],

                  onInput: (e) => {
                    const value = e.currentTarget.checked;

                    data.inputDirtied = true;

                    methods.toggle(value);

                    p.validate?.(p.modelValue);
                  },
                }),

                slots.thumb?.(payload.value) || null,
              ]
            ),

            slots.default?.(payload.value) || null,
          ]
        ),
        slots.append?.(payload.value) || null,
      ];
    };
  },
});
</script>

<style>
.root[data-ui-switch] {
  --ui-height: 28px;
  --ui-width: 44px;
  --ui-track-height: 100%;
  --ui-track-width: 100%;
  --ui-track-radius: 16px;
  --ui-track-background: #999;
  --ui-track-background-checked: #007bff;
  --ui-thumb-size: 25px;
  --ui-thumb-radius: 50%;
  --ui-thumb-translatex: calc(
    var(--ui-width) - var(--ui-thumb-size) - var(--ui-thumb-offset)
  );
  --ui-thumb-offset: 1.5px;
  --ui-thumb-shadow: 0px 0.5px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 2px 0px rgb(0 0 0 / 15%), 0px 1px 3px 0px rgb(0 0 0 / 10%);
  --ui-thumb-background: #fff;

  height: var(--ui-height);
  width: var(--ui-width);
  display: inline-grid;
  place-items: center;
  position: relative;

  cursor: pointer;
  appearance: none;
  padding: 0;
  border: none;
  background: none;

  isolation: isolate;
}

.root[data-ui-switch]:focus-within {
  outline: solid;
}

.track[data-ui-switch] {
  height: var(--ui-track-height);
  width: var(--ui-track-width);
  border-radius: var(--ui-track-radius);
  position: absolute;
  background: var(--ui-track-background);
  isolation: isolate;
  pointer-events: none;
}

.track[data-ui-switch]::before {
  content: "";
  position: absolute;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  background: var(--ui-track-background-checked);
  opacity: 0;
  transition: 0.15s ease-in-out opacity;
  z-index: -1;
  left: 0;
}

.track[data-ui-switch].checked::before {
  opacity: 1;
}

.thumb[data-ui-switch] {
  z-index: 1;
  background-color: var(--ui-thumb-background);
  box-shadow: var(--ui-thumb-shadow);
  width: var(--ui-thumb-size);
  height: var(--ui-thumb-size);
  border-radius: var(--ui-thumb-radius);
  position: absolute;
  left: 0;
  transition: transform 0.2s, opacity 0.2s;
  /* transition-timing-function: var(--circOut);
    opacity: var(--t-body); */
  transform: translate3d(var(--ui-thumb-offset), 0, 0);
}

.thumb[data-ui-switch].checked {
  transform: translate3d(var(--ui-thumb-translatex), 0, 0);
}

.input[data-ui-switch] {
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-75%, -75%);
  pointer-events: none;
  appearance: none;
  opacity: 0;
  pointer-events: none;
}
</style>
