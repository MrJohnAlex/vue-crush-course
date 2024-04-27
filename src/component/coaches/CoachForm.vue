<template>
  <form @submit.prevent="register">
    <div class="form-control" :class="{ invalid: !this.firstName.isValid }">
      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.value"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid" style="color: red">
        First Name must not be empty!
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !this.lastName.isValid }">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.value"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid" style="color: red">
        Last Name must not be empty!
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !this.description.isValid }">
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model="description.value"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid" style="color: red">
        Description must not be empty!
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !this.rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.trim="rate.value"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid" style="color: red">Rate must be greater than 0</p>
    </div>
    <div class="form-control" :class="{ invalid: !this.areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model.trim="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">FrontEnd Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model.trim="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="backend">BackEnd Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model.trim="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid" style="color: red">
        Please check one expertise!
      </p>
    </div>
    <base-button>Register</base-button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      firstName: {
        value: '',
        isValid: true,
      },
      lastName: {
        value: '',
        isValid: true,
      },
      description: {
        value: '',
        isValid: true,
      },
      rate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      isValidForm: true,
    };
  },
  methods: {
    clearValidity(input) {
      if (this[input].value === '') {
        return;
      }
      this[input].isValid = true;
    },
    validateForm() {
      if (this.firstName.value === '') {
        this.firstName.isValid = false;
        this.isValidForm = false;
      }
      if (this.lastName.value === '') {
        this.lastName.isValid = false;
        this.isValidForm = false;
      }
      if (this.description.value === '') {
        this.description.isValid = false;
        this.isValidForm = false;
      }
      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.isValidForm = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.isValidForm = false;
      }
    },
    register() {
      this.validateForm();
      if (!this.isValidForm) {
        return;
      }
      const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.description.value,
        hourlyRate: this.rate.value,
        areas: this.areas.value,
      };
      this.$emit('submit-form', formData);
    },
  },
};
</script>
<style scoped>
@import url('../css/coach-form.css');
</style>
