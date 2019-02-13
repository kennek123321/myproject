<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>

<template>
    <div>
      <h2>{{msg}}</h2>
      <button @click="getCookie">使用cookie</button>
      <button @click="delCookie">删除cookie</button>
    </div>
</template>

<script>

    import Cookies from 'js-cookie';
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'This is First Vue!'
            }
        },
        methods:{
          getCookie(){
//            console.log(Cookies);
            Cookies.set('hello','world',{ expires: 7, path: '' });
          },
          delCookie(){
//            console.log(Cookies);
            Cookies.remove('hello');
          }
        }
    }
</script>


