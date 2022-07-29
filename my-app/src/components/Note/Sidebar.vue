<template>
    <div class="mx-auto h-full side_bg float-left md:max-w-1/3 overflow-y-auto" style="border-top-left-radius:25px;border-bottom-left-radius:25px;">
        <h2 class="py-8 text-center text-lg ">{{h_name}}</h2>
       <ul>
        <li class="rounded-lg border-r-8 border-r-green-400 border-l-8 border-l-green-400 bg-white mb-2 cursor-pointer" @click="show_welcome()">
            <p class="side_title pl-6">欢迎使用便笺</p>
            <p class="side_content pl-6">使用帮助</p>
        </li>
        <li ref='side_item' class="side_li rounded-lg relative" @mouseenter="show_btn($event)" @mouseleave="hidden_btn($event)"  @click="show_page($event,item)" v-for="(item, index) in all_container.list">
            <p class="side_title">{{item.title == ''?'无标题':item.title}}</p>
            <p class="side_content">{{item.content == ''?'内容为空':item.content}}</p>
            <span class="absolute w-5 h-5 right-2 top-0 hidden" @click.stop="del(item.id)">X</span>
        </li>
       </ul>
       <div @click="addContent()" class="absolute left-4 bottom-4 w-10 h-10 cursor-pointer rounded-full bg-green-400 text-white text-center text-lg leading-10 hover:bg-green-700">+</div>
    </div>
</template>

<script setup lang="ts">
import emitter from '../../untils/bus';
import {ref, onMounted, reactive, onUpdated, onBeforeMount} from 'vue'
import axios from 'axios';
const side_item = ref(HTMLElement) as any;
let h_name:string = '便 笺'

//删除按钮显示
function show_btn(event){
  try{
    event.target.children[2].classList.remove("hidden")
  }catch{

  }
}
function hidden_btn(event){
  event.target.children[2].classList.add("hidden")
}
//删除
function del(id:number){
    if(confirm("确定要删除吗？")){
      axios.post("http://localhost:8081/api/delContent",{id:id})
    .then((res) => {
      getContent()
      show_welcome()
    })
    .catch((err) => {
      console.log("删除失败！",err)
    })
    }
}


// 文本内容
let all_container:any = reactive({
    list:{}
});

function addContent(){
    axios.post("http://localhost:8081/api/addContent")
    .then((res) => {
      console.log("创建成功！")
      getContent()
    })
    .catch((err) => {
      console.log("发送失败！",err)
    })
}

function getContent(){
  axios.get("http://localhost:8081/api/getContent")
    .then((res) => {
      all_container.list = res.data.content
    }).catch((err) => {
      console.log(err);
    })

}
function show_welcome(){
  side_item.value.forEach(item => {
        item.classList.remove('side_active')
    });
  emitter.emit("show",false)
}

//侧边栏标签点击事件
function show_page(event,items){
    side_item.value.forEach(item => {
        item.classList.remove('side_active')
    });
    event.currentTarget.classList.add('side_active')
    emitter.emit("message",items)
    emitter.emit("show",true)
    emitter.emit("time",'sqlTime')
}

onMounted(async () => {
    await getContent(); 
})
// 默认第一个便笺打开
onUpdated(() =>{
  
    
})

</script>

<style>
.show_btn{
  display:block;
}
</style>