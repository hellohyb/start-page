<template>
  <div class="mask">
    <div class="Winmodel box-border pb-12" style="position: relative;margin:100px auto;">
      <!-- 侧边栏 -->
      <div id="sideBar" class="float-left h-full mt-6 overflow-auto">
        <p class="w-28 h-10 text-center">壁纸</p>
        <ul>
          <li ref="side_items" class="side_li h-12 w-28 leading-10 text-sm" v-for="(item) in categoryName.data" @click="show_content($event,item.old_id)">{{item.category}}</li>
        </ul>
      </div>
      <!-- 主体内容 -->
      <div id="content" class="flex h-full pt-6 flex-wrap overflow-auto">
        <span class="Wallpaper_item relative" v-for="(items) in categoryAll.data.list" @mouseenter="show_set($event)" @mouseleave="hidden_set($event)" >
          <img :title="items.tag" v-lazy="items.url" alt="" class="w-full h-full cursor-pointer">
          <span @click="click_set(items.url)" class="hidden w-32 h-10 absolute top-1/3 left-1/3 bg-transparent text-center leading-10 bg-teal-50 rounded-3xl text-green-400 hover:text-white hover:bg-green-600 cursor-pointer">设为壁纸</span>
        </span>
      </div>

    </div>
  </div>
  
</template>

<script setup lang="ts">
import axios from 'axios'
import {ref, onMounted, reactive} from 'vue'
import emitter from '../untils/bus';
function show_set(event:any){
  event.target.children[1].classList.remove('hidden')
}
function hidden_set(event:any){
  event.target.children[1].classList.add('hidden')
}
function click_set(url:any){
  emitter.emit('bgImage',url)
}

let side_items = ref(HTMLElement) as any;
defineProps({
    info:String
})
//分类列表
let categoryName:any = reactive({
  data:{}
})
let categoryAll:any = reactive({
  data:{}
})
//获取分类
function getCategory(){
  axios.get('http://wp.birdpaper.com.cn/intf/getCategory')
   .then((res) => {
    categoryName.data = res.data.data
   }).catch((err) => {
    console.log(err);
   })
}
//获取当前分类壁纸
function getCategoryAll(id:number){
    axios.get(`http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=${id}&pageno=1&count=100`)
   .then((res) => {
    categoryAll.data = res.data.data
    // console.log(categoryAll.data.list);
   }).catch((err) => {
    console.log(err);
   })
}
//侧边栏点击事件------展示壁纸
function show_content(event:any,id:number){
  //侧边栏显示点击效果
  side_items.value.forEach((item:any) => {
        item.classList.remove('side_active')
    });
  event.currentTarget.classList.add('side_active')
  //获取并存储壁纸
  categoryAll.data.list = {}
  getCategoryAll(id)

}

onMounted(() => {  
  getCategory();
  getCategoryAll(36)
})


</script>


<style>

</style>