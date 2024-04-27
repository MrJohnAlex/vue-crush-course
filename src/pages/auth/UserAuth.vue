<template>
  <div>
    <base-dialog :show="!!error" title="Something wrong!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="Authenticating......">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submit">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <base-button>{{ buttonCaption }}</base-button>
        <base-button mode="flat" type="button" @click="switchFormAction">{{
          switchButtonAction
        }}</base-button>
        <p v-if="!formIsValid" class="error">
          Please enter a valid email and password(must be at least 6 characters
          long)
        </p>
      </form>
    </base-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    buttonCaption() {
      if (this.mode == 'login') {
        return 'Login';
      } else {
        return 'SignUp';
      }
    },
    switchButtonAction() {
      if (this.mode == 'login') {
        return 'Signup Instead';
      } else {
        return 'Login Instead';
      }
    },
  },
  methods: {
    async submit() {
      this.formIsValid = true;
      if (
        this.email == '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode == 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error.massage || 'Failed to Authenticated';
      }
      this.isLoading = false;
    },
    switchFormAction() {
      if (this.mode == 'login') {
        this.mode = 'SignUp';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
.error {
  color: rgb(255, 0, 0);
}
</style>
