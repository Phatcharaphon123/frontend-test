<template>
    <div class="q-pa-md">
      <q-card class="q-pa-md shadow-2" style="max-width: 500px; margin: auto;">
        <q-card-section>
          <div class="text-h6 text-primary">อัปเดตข้อมูลผู้ใช้</div>
        </q-card-section>
  
        <q-card-section v-if="loading">
          <div class="row justify-center">
            <q-spinner color="primary" size="3em" />
          </div>
          <div class="text-center q-mt-md">กำลังโหลดข้อมูล...</div>
        </q-card-section>
  
        <q-card-section v-else>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="user.firstname" label="ชื่อ" dense outlined required />
            <q-input v-model="user.lastname" label="นามสกุล" dense outlined required />
            <q-input v-model="user.age" label="อายุ" type="number" dense outlined required />
            <q-select v-model="user.gender" :options="['ชาย', 'หญิง', 'อื่นๆ']" label="เพศ" dense outlined required />
            <q-input v-model="user.interests" label="ความสนใจ" dense outlined required />
            <q-input v-model="user.description" label="คำอธิบาย" type="textarea" dense outlined required />
  
            <q-card-actions align="right">
              <q-btn label="ยกเลิก" color="negative" @click="onCancel" flat />
              <q-btn label="บันทึก" type="submit" color="primary" :loading="isSubmitting" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
  
      <!-- Snackbar แจ้งเตือน -->
      <q-dialog v-model="showSuccess">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6 text-green">อัปเดตสำเร็จ!</div>
            <p>ข้อมูลผู้ใช้ถูกบันทึกเรียบร้อย</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="ปิด" color="primary" @click="router.push('/')" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const user = ref({});
  const loading = ref(true);
  const isSubmitting = ref(false);
  const showSuccess = ref(false);
  
  // ดึงข้อมูลผู้ใช้จาก API
  const fetchUser = async () => {
    loading.value = true;
    try {
      const response = await fetch(`http://localhost:8000/users/${route.params.id}`);
      const result = await response.json();
      user.value = result;
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchUser);
  
  // ฟังก์ชันบันทึกข้อมูล
  const onSubmit = async () => {
    isSubmitting.value = true;
    try {
      const response = await fetch(`http://localhost:8000/users/${route.params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user.value)
      });
      const result = await response.json();
      
      if (result.status === "ok") {
        showSuccess.value = true;
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // ฟังก์ชันยกเลิก
  const onCancel = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .q-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
  }
  </style>
  