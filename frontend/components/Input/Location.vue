<template>
  <div>
    <div class="mb-3" v-show="countryVisible">
      <label class="form-label" :class="{ required: required }">Country</label>

      <select
        name="country"
        type="text"
        class="form-select"
        placeholder="Select your country"
        v-model="country"
        :required="required"
      >
        <option
          v-for="country of countries"
          :key="country.name"
          :value="country.name"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label" :class="{ required: required }">State</label>

      <select
        name="state"
        type="text"
        class="form-select"
        placeholder="Select your state"
        v-model="state"
        :required="required"
      >
        <option value="Unspecified">Unspecified</option>
        <option v-for="state of states" :key="state.name" :value="state.name">
          {{ state.name }}
        </option>
      </select>
    </div>
    <input
      name="currency"
      type="text"
      class="form-control"
      placeholder="Select your state"
      v-model="currency"
      hidden
    />
  </div>
</template>

<script>
import countriesAndStates from "~/assets/countries+states.json";
export default {
  props: {
    value: {
      country: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
        default: "Unspecified",
      },
    },
    required: {
      type: Boolean,
      default: false,
    },
    countryVisible: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      countries: countriesAndStates,
      country: this.value?.country,
      state: this.value?.state,
    };
  },
  computed: {
    states() {
      for (let country of this.countries) {
        if (country.name === this.country) {
          return country.states;
        }
      }
      return [];
    },
    currency() {
      for (let country of this.countries) {
        if (country.name === this.country) {
          return country.currency;
        }
      }
      return "";
    },
  },
};
</script>