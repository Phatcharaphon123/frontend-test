<template>
    <div class="q-pa-md flex flex-center">
      <q-card class="q-pa-lg shadow-2" style="max-width: 500px; width: 100%">
        <q-card-section>
          <div class="text-h6 text-primary">เพิ่มผู้ใช้ใหม่</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="firstname" label="ชื่อ" outlined required />
            <q-input v-model="lastname" label="นามสกุล" outlined required />
            <q-input v-model="age" label="อายุ" type="number" outlined required />
            <q-select v-model="gender" :options="genderOptions" label="เพศ" outlined required />
            <q-input v-model="interests" label="ความสนใจ" outlined required />
            <q-input v-model="description" label="คำอธิบาย" outlined required />
  
            <q-btn 
              type="submit" 
              label="เพิ่มผู้ใช้" 
              color="primary" 
              class="full-width" 
              :loading="isSubmitting"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const firstname = ref('');
  const lastname = ref('');
  const age = ref('');
  const gender = ref('');
  const interests = ref('');
  const description = ref('');
  const isSubmitting = ref(false);
  
  const genderOptions = ['ชาย', 'หญิง', 'ไม่ระบุ'];
  
  const onSubmit = async () => {
    isSubmitting.value = true;
  
    try {
      const response = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: firstname.value,
          lastname: lastname.value,
          age: age.value,
          gender: gender.value,
          interests: interests.value,
          description: description.value
        }),
      });
  
      const result = await response.json();
      alert(result.message);
      
      if (result.status === 'เพิ่มสำเร็จ') {
        router.push('/');
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  