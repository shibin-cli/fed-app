(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fca61c66"],{2257:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return c})),n.d(t,"c",(function(){return o})),n.d(t,"f",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"g",(function(){return d}));var r=n("b32d");function a(e){return r["a"].post("/boss/menu/saveOrUpdate",e)}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;return r["a"].get("/boss/menu/getEditMenuInfo",{params:{id:e}})}function c(){return r["a"].get("/boss/menu/getAll")}function o(e){return r["a"].delete("/boss/menu/".concat(e))}function s(){return r["a"].get("/boss/menu/getMenuNodeList")}function i(e){return r["a"].post("/boss/menu/allocateRoleMenus",e)}function d(e){return r["a"].get("/boss/menu/getRoleMenus",{params:e})}},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var r=n("1d80"),a=n("5899"),u="["+a+"]",c=RegExp("^"+u+u+"*"),o=RegExp(u+u+"*$"),s=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(c,"")),2&e&&(n=n.replace(o,"")),n}};e.exports={start:s(1),end:s(2),trim:s(3)}},7156:function(e,t,n){var r=n("861d"),a=n("d2bb");e.exports=function(e,t,n){var u,c;return a&&"function"==typeof(u=t.constructor)&&u!==n&&r(c=u.prototype)&&c!==n.prototype&&a(e,c),e}},"7ca9":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-card",[n("el-tree",{ref:"tree",attrs:{data:e.menuNodes,"show-checkbox":"","default-expand-all":"","highlight-current":"","node-key":"id","default-checked-keys":e.checkedMenuId,props:e.defaultProps}}),n("div",{attrs:{align:"center"}},[n("el-button",{attrs:{type:"primary"},on:{click:e.onSave}},[e._v("保存")]),n("el-button",{on:{click:e.resetChecked}},[e._v("清空")])],1)],1)},a=[],u=(n("4160"),n("a9e3"),n("159b"),n("96cf"),n("1da1")),c=n("2b0e"),o=n("2257"),s=c["default"].extend({props:{roleId:{required:!0,type:[String,Number]}},data:function(){return{menuNodes:[],defaultProps:{children:"subMenuList",label:"name"},checkedMenuId:[]}},created:function(){this.loadMenuNodeList(),this.loadCheckMenus()},methods:{loadMenuNodeList:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["f"])();case 2:n=t.sent,r=n.data,r.data.length&&(e.menuNodes=r.data);case 5:case"end":return t.stop()}}),t)})))()},onSave:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["a"])({roleId:e.roleId,menuIdList:e.$refs.tree.getCheckedKeys()});case 2:n=t.sent,r=n.data,"000000"===r.code?(e.$message.success("保存成功"),e.$router.back()):e.$message.error(r.mesg);case 5:case"end":return t.stop()}}),t)})))()},loadCheckMenus:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["g"])({roleId:e.roleId});case 2:n=t.sent,r=n.data,a=[],e._resolveKeys(r.data,a),e.checkedMenuId=a;case 7:case"end":return t.stop()}}),t)})))()},_resolveKeys:function(e,t){var n=this;e.forEach((function(e){var r;e.selected&&t.push(e.id),null!==(r=e.subMenuList)&&void 0!==r&&r.length&&n._resolveKeys(e.subMenuList,t)}))},resetChecked:function(){this.$refs.tree.setCheckedKeys([])}}}),i=s,d=n("2877"),f=Object(d["a"])(i,r,a,!1,null,null,null);t["default"]=f.exports},a9e3:function(e,t,n){"use strict";var r=n("83ab"),a=n("da84"),u=n("94ca"),c=n("6eeb"),o=n("5135"),s=n("c6b6"),i=n("7156"),d=n("c04e"),f=n("d039"),l=n("7c73"),p=n("241c").f,h=n("06cf").f,g=n("9bf2").f,b=n("58a8").trim,v="Number",m=a[v],I=m.prototype,N=s(l(I))==v,k=function(e){var t,n,r,a,u,c,o,s,i=d(e,!1);if("string"==typeof i&&i.length>2)if(i=b(i),t=i.charCodeAt(0),43===t||45===t){if(n=i.charCodeAt(2),88===n||120===n)return NaN}else if(48===t){switch(i.charCodeAt(1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+i}for(u=i.slice(2),c=u.length,o=0;o<c;o++)if(s=u.charCodeAt(o),s<48||s>a)return NaN;return parseInt(u,r)}return+i};if(u(v,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var w,M=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof M&&(N?f((function(){I.valueOf.call(n)})):s(n)!=v)?i(new m(k(t)),n,M):k(t)},E=r?p(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),x=0;E.length>x;x++)o(m,w=E[x])&&!o(M,w)&&g(M,w,h(m,w));M.prototype=I,I.constructor=M,c(a,v,M)}}}]);
//# sourceMappingURL=chunk-fca61c66.0284699c.js.map