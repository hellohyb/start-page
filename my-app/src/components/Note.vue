<template>
    <div class="mask">
        <div class="rounded-3xl" style="max-width:850px;height:550px;position: relative;margin:100px auto;background-color: #f0f1f4;" >
        <SidebarVue/>
        <TabletVue/> 
    </div>
    </div>
    
</template>

<script setup lang="ts">
import SidebarVue from './Note/Sidebar.vue';
import TabletVue from './Note/Tablet.vue';

</script>


<style>

</style>