<template>
  <div class="q-pa-md">
    <!-- ปุ่มเพิ่มผู้ใช้ -->
    <div class="q-mb-md">
      <q-btn icon="add" label="เพิ่มผู้ใช้" color="primary" @click="onCreate" class="q-mb-md" />
    </div>

    <!-- กรองข้อมูล & Loader -->
    <q-input v-model="search" label="ค้นหาผู้ใช้..." dense filled clearable class="q-mb-md" :color="search.length > 0 ? 'blue' : 'grey'" />
    <q-select
      v-model="genderFilter"
      :options="genderOptions"
      label="กรองตามเพศ"
      dense
      filled
      clearable
      class="q-mb-md"
      :color="genderFilter ? 'purple' : 'grey'"
    />

    <q-table
      title="ผู้ใช้งานทั้งหมด"
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      v-if="rows.length > 0"
      class="bg-light-blue-1"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat dense round icon="edit" color="blue" @click="onEdit(props.row.id)" class="q-mr-sm" />
          <q-btn flat dense round icon="delete" color="red" @click="onDelete(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- กรณีไม่มีข้อมูล -->
    <q-banner v-else class="bg-grey-3 text-dark q-pa-md shadow-2">
      ไม่มีข้อมูลผู้ใช้
    </q-banner>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import router from "../router";

// กำหนด Column ของตาราง
const columns = [
  { name: 'id', align: 'center', label: 'รหัสผู้ใช้งาน', field: 'id', sortable: true },
  { name: 'firstname', align: 'center', label: 'ชื่อ', field: 'firstname', sortable: true },
  { name: 'lastname', align: 'center', label: 'นามสกุล', field: 'lastname', sortable: true },
  { name: 'age', align: 'center', label: 'อายุ', field: 'age', sortable: true },
  { name: 'gender', align: 'center', label: 'เพศ', field: 'gender', sortable: true },
  { name: 'interests', align: 'center', label: 'ความสนใจ', field: 'interests', sortable: true },
  { name: 'description', align: 'center', label: 'คำอธิบาย', field: 'description', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
];

// สถานะการโหลดข้อมูล
const loading = ref(true);
const rows = ref([]);
const search = ref("");
const genderFilter = ref(null);
const genderOptions = ["ชาย", "หญิง", "ไม่ระบุ"];

// ดึงข้อมูลจาก API
const fetchData = async () => {
  loading.value = true;
  try {
    const response = await fetch("http://localhost:8000/users/");
    const result = await response.json();
    rows.value = result;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    loading.value = false;
  }
};

// คำนวณ Filter & Sorting
const filteredRows = computed(() => {
  return rows.value
    .filter((row) => 
      (!search.value || row.firstname.includes(search.value) || row.lastname.includes(search.value)) &&
      (!genderFilter.value || row.gender === genderFilter.value)
    );
});

// ฟังก์ชันสร้างผู้ใช้ใหม่
const onCreate = () => {
  router.push('/createUsers');
};

// ฟังก์ชันแก้ไขผู้ใช้
const onEdit = (id) => {
  router.push('/updateUsers/' + id);
};

// ฟังก์ชันลบผู้ใช้ พร้อมแจ้งเตือนยืนยันก่อนลบ
const onDelete = async (id) => {
  if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
    try {
      const response = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      alert(result.message);
      if (result.status === "ok") {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

// โหลดข้อมูลเมื่อเปิดหน้า
onMounted(fetchData);
</script>

<style scoped>
.q-btn {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.q-banner {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.q-table {
  border-radius: 8px;
}

.q-select, .q-input {
  border-radius: 8px;
}
</style>
