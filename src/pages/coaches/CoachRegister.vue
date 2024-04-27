<template>
  <section>
    <base-card>
      <h2>Register as a Coach now!</h2>
      <CoachForm @submit-form="register" />
    </base-card>
  </section>
</template>
<script>
import CoachForm from '../../component/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
  methods: {
    register(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    },
  },
};
</script>
