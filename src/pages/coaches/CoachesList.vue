<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Something wrong when data fetching"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <CoachFIlter @change-filter="setFilters" />
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
            >Login with register as a Coach</base-button
          >
          <base-button
            link
            to="/register"
            v-if="isLoggedIn && !isCoach && !isLoading"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filterCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          />
        </ul>
        <h3 v-else>No Coaches Found!</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
import CoachItem from '../../component/coaches/CoachItem.vue';
import BaseButton from '../../component/ui/BaseButton.vue';
import CoachFIlter from '../../component/coaches/CoachFIlter.vue';
import BaseDialog from '../../component/ui/BaseDialog.vue';
export default {
  components: {
    CoachItem,
    BaseButton,
    CoachFIlter,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  created() {
    this.loadCoaches();
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filterCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/fetchCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
    setFilters(updateFilters) {
      this.activeFilters = updateFilters;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
section ul {
  list-style: none;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
