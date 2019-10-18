(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chat"],{"0df3":function(t,e,n){},"293a":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"layout"},[n("h1",[t._v("Welcome back, "+t._s(t.currentUser)+" !")]),n("MessagesList"),n("UsersList"),n("MessageForm",{attrs:{onSubmit:t.sendMessage}})],1)},a=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{staticClass:"form",on:{submit:function(e){return t.sendMessage(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],attrs:{type:"text",id:"name-input",placeholder:"Say something !"},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}}),n("button",{attrs:{type:"submit"}},[t._v("Send")])])},i=[],o={name:"MessageForm",props:{onSubmit:Function},data:function(){return{message:""}},methods:{sendMessage:function(t){t.preventDefault(),this.onSubmit(this.$data.message),this.$data.message=""}}},c=o,u=(n("642c"),n("2877")),l=Object(u["a"])(c,r,i,!1,null,"0891d78a",null),m=l.exports,d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"channel-title"},["public"===t.currentWindow?n("span",[t._v("Public Channel")]):n("span",[t._v("Your conversation with "+t._s(t.currentWindow))])]),n("ul",t._l(t.currentMessages,(function(e,s){return n("li",{key:s,staticClass:"message",class:{system:"System"===e.from,self:e.from===t.currentUser}},[n("strong",[t._v(t._s(e.from)+" :")]),n("span",[t._v(t._s(e.message))])])})),0)])},E=[],f=n("2f62"),_={name:"MessagesList",computed:Object(f["c"])(["currentWindow","currentMessages","currentUser"])},S=_,p=(n("c619"),Object(u["a"])(S,d,E,!1,null,"490f1438",null)),h=p.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"wrapper"},[n("li",[n("button",{class:{active:"public"===t.currentWindow},on:{click:function(e){return t.changeWindow("public")}}},[t._v("Public")])]),t._l(t.connectedUsers,(function(e){return n("li",{key:e},[n("button",{class:{active:t.currentWindow===e},attrs:{type:"button"},on:{click:function(n){return t.changeWindow(e)}}},[t._v(t._s(e))])])}))],2)},b=[],g=n("9797"),T={name:"UsersList",computed:Object(f["c"])(["connectedUsers","currentWindow"]),methods:Object(f["b"])([g["a"]])},C=T,O=(n("8447"),Object(u["a"])(C,v,b,!1,null,"6a0adfce",null)),w=O.exports,M=n("dc85"),N=n("c7c5"),$=n.n(N),U=Object(M["a"])(),G=U.on,V=U.emit,W=U.cleanup,L={name:"chat",mounted:function(){var t=this;V($.a.SOCKET_EVENTS.GET_USERS),V($.a.SOCKET_EVENTS.GET_PUBLIC_MESSAGES),G($.a.SOCKET_EVENTS.GET_USERS,(function(e){t.$store.dispatch(g["f"],e)})),G($.a.SOCKET_EVENTS.GET_PUBLIC_MESSAGES,(function(e){t.$store.dispatch(g["e"],e)})),G($.a.SOCKET_EVENTS.GET_PRIVATE_MESSAGES,(function(e){t.$store.dispatch(g["e"],e)})),G($.a.SOCKET_EVENTS.NEW_PUBLIC_MESSAGE,(function(e){t.$store.dispatch(g["d"],e)})),G($.a.SOCKET_EVENTS.NEW_PRIVATE_MESSAGE,(function(e){t.$store.dispatch(g["d"],e)}))},destroyed:function(){W()},computed:{currentUser:function(){return this.$store.state.currentUser},currentWindow:function(){return this.$store.state.currentWindow}},methods:{sendMessage:function(t){"public"===this.currentWindow?V($.a.SOCKET_EVENTS.NEW_PUBLIC_MESSAGE,t):V($.a.SOCKET_EVENTS.NEW_PRIVATE_MESSAGE,{message:t,to:this.currentWindow})}},watch:{currentWindow:function(t){"public"===t?V($.a.SOCKET_EVENTS.GET_PUBLIC_MESSAGES):V($.a.SOCKET_EVENTS.GET_PRIVATE_MESSAGES,t)}},components:{MessageForm:m,MessagesList:h,UsersList:w}},A=L,y=(n("8a8b"),Object(u["a"])(A,s,a,!1,null,"18f8ad5c",null));e["default"]=y.exports},"391e":function(t,e,n){},"642c":function(t,e,n){"use strict";var s=n("a790"),a=n.n(s);a.a},8447:function(t,e,n){"use strict";var s=n("d38b"),a=n.n(s);a.a},"871c":function(t,e,n){},"8a8b":function(t,e,n){"use strict";var s=n("0df3"),a=n.n(s);a.a},a790:function(t,e,n){},a952:function(t,e,n){},a9f9:function(t,e,n){"use strict";var s=n("871c"),a=n.n(s);a.a},bb51:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("h1",[t._v("The Super Chat App !")]),n("h2",[t._v("... done in an evening to learn Vue 😼")]),n("LoginForm",{attrs:{onSubmit:t.login}})],1)},a=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{on:{submit:function(e){return t.login(e)}}},[n("label",{attrs:{for:"name-input"}},[t._v("Choose Your Username")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{type:"text",id:"name-input"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),n("button",{attrs:{type:"submit"}},[t._v("Enter")]),t.error?n("div",{staticClass:"error"},[t._v("You need an username !😉")]):t._e()])},i=[],o={name:"LoginForm",props:{onSubmit:Function},data:function(){return{username:"",submitted:!1,error:!1}},methods:{login:function(t){this.$data.submitted=!0,t.preventDefault(),this.$data.username.length>0?this.onSubmit(this.$data.username):this.$data.error=!0}}},c=o,u=(n("e79f"),n("2877")),l=Object(u["a"])(c,r,i,!1,null,"1132f4ef",null),m=l.exports,d=n("dc85"),E=n("c7c5"),f=n.n(E),_=n("9797"),S=Object(d["a"])(),p=S.on,h=S.emit,v=S.cleanup,b={name:"home",mounted:function(){var t=this;p(f.a.SOCKET_EVENTS.LOGIN_SUCCESS,(function(e){t.$store.dispatch(_["b"],e)}))},destroyed:function(){v()},methods:{login:function(t){h(f.a.SOCKET_EVENTS.LOGIN,t)}},components:{LoginForm:m}},g=b,T=(n("a9f9"),Object(u["a"])(g,s,a,!1,null,null,null));e["default"]=T.exports},c619:function(t,e,n){"use strict";var s=n("a952"),a=n.n(s);a.a},d38b:function(t,e,n){},e79f:function(t,e,n){"use strict";var s=n("391e"),a=n.n(s);a.a}}]);
//# sourceMappingURL=chat.2bc07a54.js.map