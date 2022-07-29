

<template>
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <!-- <Home /> -->
  <div :style="bgs" class="w-full min-h-screen mg-0 box-border pt-10" ref="bg">
    <Note v-show="show_com.note" @click.self="show_com.note = false"/>
    <Wallpaper  v-show="show_com.wallpaper" @click.self="show_com.wallpaper = false"/>
    <p class="text-center text-white text-7xl">{{show_time.time}}</p>
    <p class="text-center text-white text-sm mb-5">{{show_time.time_two}}</p>
    <!-- 搜索框 -->
    <p class=" mb-5">
      <div>
      <input type="text" class=" min-w-100 w-1/3 h-12 my-0 mx-auto block outline-none rounded-3xl pl-5" @keyup.enter="search()" v-model="searchStr.str" placeholder="输入搜索内容">
      </div>
    </p>
    <!-- 组件 -->
    <div class="w-2/3 bg-transparent m-auto flex flex-wrap justify-center">
      <div><button class="btn_item m-0 mr-8" @click="show_com.note = true">便笺</button><p class="m-0 w-16 text-center text-white text-sm" >便笺</p></div>
      <div><button class="btn_item m-0 mr-8" @click="show_com.wallpaper = true">壁纸</button><p class="m-0 w-16 text-center text-white text-sm">壁纸</p></div>
      <div><button class="btn_item m-0 mr-8">设置</button><p class="m-0 w-16 text-center text-white text-sm">设置</p></div>

    </div>
    
  </div>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref} from 'vue'
import Wallpaper from './components/Wallpaper.vue'
import Note from './components/Note.vue'
import bg2 from './assets/bg2.png'
import emitter from './untils/bus'


let bg:any = ref(HTMLElement);
let bgs = {
  backgroundImage:`url('${sessionStorage.getItem('bgUrl') || bg2}')`,
  backgroundSize:'cover',
}

let show_com:any = reactive({
  note:false,
  wallpaper:false
})

let searchStr:any = reactive({
  str:''
})
function search(){
  window.open(`http://www.baidu.com/s?wd=${searchStr.str}`,'_blank')
}
//时间
var show_time:any = reactive({
  time:'00:00:00',
  time_two:'00月00日 星期一'
})
var clock:any
function timeClock(){
  clearInterval(clock)
  clock = setInterval(() => {
    let weekName:string[] = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    let date = new Date();
    let month:number = setTime(date.getMonth() + 1);
    let day:number = setTime(date.getDate());
    let week:number = date.getDay();
    let hour:number = setTime(date.getHours());
    let min:number  = setTime(date.getMinutes());
    let second:number = setTime(date.getSeconds());
    show_time.time = hour + ":" + min + ":" + second
    show_time.time_two = month + '月' + day + '日' + ' ' + weekName[week]
  },1000)
  
}
//当前编辑时间
function setTime(time:any){
    return time<10?'0' + time:time;
}

onMounted(() => {
  timeClock();
  //设置壁纸
  emitter.on('bgImage',(e:any) => {
    sessionStorage.setItem('bgUrl',e);
    bgs.backgroundImage = `url('${sessionStorage.getItem('bgUrl')}')`
    bg.value.style.backgroundImage = `url('${sessionStorage.getItem('bgUrl')}')`
  })
})
</script>

<style>
#app{
margin:0;
padding:0;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0;
}
</style>
