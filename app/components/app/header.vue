<template>
  <header id="app-header" class="navbar bg-primary text-primary-content">
    <div class="navbar-start">
      <nuxt-link to="/" class="btn btn-ghost text-xl ">
        Travel Log
      </nuxt-link>
    </div>
    <div class="navbar-end">
      <AppThemeToggle />
      <AuthButton />
    </div>
  </header>
</template>
