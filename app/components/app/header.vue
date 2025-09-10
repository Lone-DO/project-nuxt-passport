<template>
  <header id="app-header" class="navbar bg-primary text-primary-content">
    <div class="navbar-start">
      <nuxt-link to="/" class="btn btn-ghost text-xl">
        Traveler's Dashboard
        <!--
          TODO: Add n18n for swapping between Deutsche und Englische Sprache
          - DE: Reise - Armaturenbrett, EN: Traveler's Dashboard
        -->
      </nuxt-link>
    </div>
    <div class="navbar-end">
      <AppThemeToggle />
      <AuthButton />
    </div>
  </header>
</template>
