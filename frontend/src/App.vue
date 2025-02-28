<template>
  <q-layout view="hHh lpR fFf">

    <!-- HEADER -->
    <q-header elevated class="bg-gradient text-white">
      <q-toolbar>
        <q-avatar square size="42px">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>
        <q-toolbar-title class="q-ml-sm text-weight-bold">
          USERS Information
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left" class="bg-secondary text-white">
        <q-route-tab to="/users" label="Users" icon="group" />
      </q-tabs>
    </q-header>

    <!-- MAIN CONTENT -->
    <q-page-container class="content-center">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style scoped>
/* Gradient Header */
.bg-gradient {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
}

/* จัดเนื้อหาให้อยู่ตรงกลาง */
.content-center {
  display: flex;
  justify-content: center;  /* จัดให้อยู่ตรงกลางแนวนอน */
  align-items: center;  /* จัดให้อยู่ตรงกลางแนวตั้ง */
  min-height: calc(100vh - 100px); /* ทำให้สูงเต็มจอ ลบส่วน Header ออก */
  padding: 20px;
}
</style>
