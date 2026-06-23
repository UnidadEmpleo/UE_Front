<template>
  <div :class="clase">
    
    <div v-for="(option,index) in options" :key="index">
      <input :id="key" :value="option.value" class="form-check-input" type="radio" 
        :name="name"  />
      <label class="custom-control-label" :for="id">
        {{option.text}}
      </label>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "MaterialRadio",
  props: {
    options: { type: Array, default: () => [] },
    modelValue: { type: [String, Number, Boolean, Object, null], default: null },
    name: {type: String,required: true,},
    id: {type: String,required: true,},
    checked: {type: Boolean,default: false,},
    desc: {type: String,required: false,},
    clase:{type: String,required: false,},
  },
  setup(props, { emit }) {
    const handleChange = (event) => {
      const isChecked = event.target.checked;
      emit("update:checked", isChecked); // Emit the updated value
      emit("change", { name: props.name, checked: isChecked }); // Emit a generic change event
    };

    return {
      handleChange,
    };
  },
};
</script>
