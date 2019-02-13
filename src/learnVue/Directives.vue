<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .paddingTop {
    height: 1000px;
  }
</style>

<template>
    <div>
      <!--<div v-if="myDir" v-my-directive>{{ msg }}</div>-->
      <!--<div class="paddingTop"></div>-->
      <!--自定义指令懒加载 不好用-->
      <!--<img v-lazy="img_url" />-->
      <img v-lazyload="img_url" >
      <div class="paddingTop"></div>
      <!--<img v-lazy="img_url2" />-->
      <img v-lazyload="img_url2" >
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
              msg: 'Hello World.',
              myDir: true,
              img_url: 'https://img3.aixuehuisi.com/logo.png',
              img_url2: 'https://jingdiaoxike.cn/static/site/img/nav__logo.png'
            }
        },

    /*- bind：指令第一次绑定到元素时调用，且只调用一次。
    - inserted：被绑定的元素插入父节点时调用（仅保证父节点存在，但并不一点已插入文档中）。
    - update：所在 Vue 实例（组件）的 Vnode 更新时调用（但可能发生在其子 Vnode 更新之前）。
    - componentUpdated：指令所在 Vue 实例（组件）的 VNode 及其子 VNode全部更新后调用。
    - unbind：指令与元素解绑时调用，也是只调用一次。*/

/*
      使用此scrollY属性来检查使用相对滚动函数（例如，scrollBy()，scrollByLines()或scrollByPages()）时文档是否已滚动。
该pageYOffset属性是该scrollY属性的别名：

window.pageYOffset == window.scrollY; // always true
    对于跨浏览器兼容性，请使用window.pageYOffset而不是window.scrollY。此外，旧版本的Internet Explorer（<9）不支持任何属性，必须通过检查其他非标准属性来解决。一个完全兼容的例子：

var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;*/


    directives: {
      'lazy':{
        inserted: function (el, binding) {
          console.log(el,"this is el");
          console.log(binding,"this is binding");
          var body = document.body;
          var offsetTop = el.offsetTop;
          var parent = el.offsetParent;
          // 获取绑定元素对于body顶部的距离
          while (parent && parent.tagName != 'body') {
            offsetTop += parent.offsetTop;
            parent = parent.offsetParent;
          }
          // 若出现在可视区域内，则直接赋值src
          if (body.scrollTop + body.clientHeight > offsetTop && body.scrollTop < offsetTop) {
            el.src = binding.value;
          } else {
            // 若暂未出现，则监听window的scroll事件
            var scrollFn = function () {
              // 出现在区域内才赋值src，并取消事件监听
              console.log(body.scrollTop + body.clientHeight,"body.scrollTop + body.clientHeight") //1082
              console.log(body.scrollTop,"this is ScrollTop") //0
              console.log(offsetTop,"offsetTop") //1183
              if (body.scrollTop + body.clientHeight > offsetTop && body.scrollTop < offsetTop) {
                el.src = binding.value;
                window.removeEventListener('scroll', scrollFn)
              }
            }
            window.addEventListener('scroll', scrollFn)
          }
        }
      },
      'my-directive': {
        bind: function (el, binding, vnode, oldVnode) {
//          console.log('bind');
        },
        inserted: function (el, binding, vnode, oldVnode) {
//          console.log('inserted');
        },
        update: function (el, binding, vnode, oldVnode) {
          console.log('update');
        },
        componentUpdated: function (el, binding, vnode, oldVnode) {
          console.log('componentUpdated');
        },
        unbind: function (el, binding, vnode, oldVnode) {
          console.log('unbind');
        },
      }
    }
    }
</script>


