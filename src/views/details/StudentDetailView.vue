<script setup lang="ts">
import Vue from "vue"

import { type StudentDetail } from '@/type'
import { VueElement, type PropType } from 'vue'
import axios from 'axios'

defineProps({
    student: {
        type: Object as PropType<StudentDetail>,
        require: true
    }
})



</script>

<template>
    <div v-if="student">
        <p>Name: {{ student.first_name }} {{ student.last_name }}</p>
        <p>Student ID: {{ student.sid }}</p>
        <p>Course: {{ student.course }}</p>
        <p>Advisor: {{ student.advisor }}</p>
    </div>
</template>