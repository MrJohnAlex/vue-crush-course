<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        name="frontend"
        id="frontend"
        checked
        @change="setFilters"
      />
      <label for="frontend">FrontEnd</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        name="backend"
        id="backend"
        checked
        @change="setFilters"
      />
      <label for="backend">BackEnd</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        name="career"
        id="career"
        checked
        @change="setFilters"
      />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>
<script>
export default {
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilters(event) {
      const setId = event.target.id;
      const active = event.target.checked;
      const updateFilter = {
        ...this.filters,
        [setId]: active,
      };
      this.filters = updateFilter;
      this.$emit('change-filter', updateFilter);
    },
  },
};
</script>
<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
