<template>
  <!-- 欢迎界面 -->
    <div :style="bg" class="overflow-hidden h-full" v-if="!show_what.state"  style="border-top-right-radius:25px;border-bottom-right-radius:25px;">
    <p class="text-center text-5xl text-gray-200 mt-8">{{show_time.time}}</p>
    <p class="text-center text-gray-200 mt-8"><b>{{pome.msg.content}}</b>--{{pome.msg.author}}《{{pome.msg.origin}}》</p>

    </div>

  <div class="overflow-hidden h-full" @keydown="change()" v-if="show_what.state"  style="border-top-right-radius:25px;border-bottom-right-radius:25px;">
    <input class="text-center border-b-2 w-full outline-none pl-4 pt-3 font-bold text-xl" style="background-color: #f0f1f4;" placeholder="请输入标题" v-model = "all.allMessage.title"/>
    <textarea :style="imgs" style="resize:none;" class="leading-9 text-gray-800 tracking-widest font-medium bg-repeat h-5/6 text-lg w-full outline-none pl-4 bg-yellow-50" placeholder="请输入内容。。。。。。" v-model="all.allMessage.content"></textarea>
    <div class="w-full py-5 text-center" style="background:#f0f1f4;">
      <span class=" float-left ml-5 mr-5 text-xs">创建时间：{{all.allMessage.oldtime}}  &nbsp;&nbsp;&nbsp;&nbsp; 最后一次编辑：{{timeStr.time}}</span>
      <span class="float-left text-xs" :class="state.state?' text-green-600':' text-red-500'">{{state.state?'备份成功！':'未备份'}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import emitter from '../../untils/bus';
import img2 from '../../assets/underline2.png'
import img3 from '../../assets/yellow_line.png'
import bg2 from '../../assets/bg.png'
import { onMounted, reactive } from 'vue';
import axios from 'axios';
let imgs = {
  backgroundImage:`url('${img3}')`,
  backgroundSize:'auto 36px',
}
let bg = {
  backgroundImage:`url('${bg2}')`,
  backgroundSize:'cover',
  backgroundRepeat:'no-repeat'
}
//每日诗词
var pome:any = reactive({
  msg:''
})
function getPome(){
  axios.post("https://v1.jinrishici.com/all.json")
    .then((res) => {
      pome.msg = res.data
      
    })
    .catch((err) => {
      console.log("发送失败！",err)
    })
}
//欢迎页面显示时间
var show_time:any = reactive({
  time:'00:00:00'
})
var clock:any
function timeClock(){
  clearInterval(clock)
  clock = setInterval(() => {
    let date = new Date();
    let hour:number = setTime(date.getHours());
    let min:number  = setTime(date.getMinutes());
    let second:number = setTime(date.getSeconds());
    show_time.time = hour + ":" + min + ":" + second
  },1000)
  
}
//当前编辑时间
function setTime(time:any){
    return time<10?'0' + time:time;
}
//存储信息
let all:any = reactive({
  allMessage:{}
})
//保存状态
let state:any = reactive({
    state:0
})
// 显示 欢迎界面false 或者 编辑界面 true
let show_what:any = reactive({
  state:false
})

var timeStr:any = reactive({
  time:''
})
function nowTime(){
var date = new Date();
var day:number = setTime(date.getDate());
var year:number = setTime(date.getFullYear());
var month:number = setTime(date.getMonth() + 1);
var hour:number = setTime(date.getHours());
var min:number  = setTime(date.getMinutes());
var second:number = setTime(date.getSeconds());
timeStr.time = year + '-' + month + "-" + day + " " + hour + ":" + min + ":" + second
}


var timer:any
function change(){
    nowTime()
    state.state = 0
    clearTimeout(timer)
    timer = setTimeout(() => {
      all.allMessage.time = timeStr.time
      axios.post("http://localhost:8081/api/editContent",all.allMessage)
    .then((res) => {
      state.state = 1
    })
    .catch((err) => {
      console.log("发送失败！",err)
    })
    }, 1000);
}

onMounted(() => {
  //获取时间
  timeClock()
  //获取古诗词
  getPome()
  emitter.on("message",(e:any)=>{
    all.allMessage = e
  })
  emitter.on("show",(e) => {
    show_what.state = e
  });
  emitter.on("time",(e) => {
    timeStr.time = all.allMessage.time
  })
})

</script>


<style>


</style>