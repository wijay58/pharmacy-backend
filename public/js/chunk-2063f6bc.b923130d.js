(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2063f6bc"],{"2b7f":function(t,e,n){"use strict";var r=n("483b"),a=n.n(r);a.a},"483b":function(t,e,n){},7277:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("WidgetsDropdown"),n("CRow",[n("CCol",{attrs:{md:"4"}},[n("CCard",[n("CCardBody",[n("CCol",[n("h4",{staticClass:"card-title mb-3",attrs:{id:"traffic"}},[t._v("Monthly Report")])]),n("CCol",{staticClass:"d-md-block",attrs:{size:"sm"}},[n("CButtonGroup",{attrs:{vertical:""}},t._l(t.selectArr,(function(e,r){return n("CButton",{key:r,staticClass:"mx-0",attrs:{color:"outline-secondary",pressed:e===t.selected},on:{click:function(n){return t.selection(e)}}},[t._v(" "+t._s(e)+" ")])})),1)],1),n("MainChartExample",{key:t.componentKey,staticStyle:{height:"400px","margin-top":"40px"},attrs:{data:t.data}})],1)],1)],1),n("CCol",{attrs:{md:"8"}},[n("CCard",[n("CCardBody",[n("CCol",{attrs:{sm:"5"}},[n("h4",{staticClass:"card-title mb-0",attrs:{id:"traffic"}},[t._v("Yearly Report "+t._s((new Date).getFullYear()))])]),n("ChartLineSimple",{staticStyle:{height:"515px","margin-top":"40px"}})],1)],1)],1)],1)],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CChartDoughnut",{attrs:{datasets:t.defaultDatasets,options:t.defaultOptions,labels:["Expenses","Sales"]}})},s=[],i=n("f485"),c=n("2ef0"),u=n.n(c),l={name:"MainChartExample",components:{CChartDoughnut:i["CChartDoughnut"]},data:function(){return{expenses:0,sales:0}},props:["data"],computed:{defaultDatasets:function(){return[{backgroundColor:["#E46651","#41B883"],data:[this.data.purchaseNumber,this.data.salesNumber]}]},defaultOptions:function(){return{maintainAspectRatio:!1,legend:{display:!0}}}},methods:{}},h=l,d=n("2877"),p=Object(d["a"])(h,o,s,!1,null,null,null),f=p.exports,m=n("150c"),C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CRow",[n("CCol",{staticStyle:{cursor:"pointer"},attrs:{sm:"12",md:"6",lg:"3"},on:{click:function(e){return t.navigate()}}},[n("CWidgetDropdown",{attrs:{color:"warning",header:"Create new Sale"},scopedSlots:t._u([{key:"footer",fn:function(){return[n("CIcon",{staticClass:"mt-0 icon",attrs:{name:"cil-print"}})]},proxy:!0}])})],1),n("CCol",{staticClass:"h-10",attrs:{sm:"12",md:"6",lg:"3"}},[n("CWidgetDropdown",{attrs:{color:"danger",header:"Rs "+t.expenseNumber,text:"Expenses this Month"},scopedSlots:t._u([{key:"footer",fn:function(){return[n("CIcon",{staticClass:"mt-0 icon1",attrs:{name:"cil-money"}})]},proxy:!0}])})],1),n("CCol",{staticClass:"h-10",attrs:{sm:"12",md:"6",lg:"3"}},[n("CWidgetDropdown",{attrs:{color:"success",header:"Rs "+t.salesNumber,text:"Sales Today"},scopedSlots:t._u([{key:"footer",fn:function(){return[n("CIcon",{staticClass:"mt-0 icon1",attrs:{name:"cil-chart-line"}})]},proxy:!0}])})],1),n("CCol",{staticClass:"h-190",attrs:{sm:"12",md:"6",lg:"3"}},[n("CWidgetDropdown",{attrs:{color:"primary",header:t.medicineNumber,text:"Number of Available Medicines"},scopedSlots:t._u([{key:"footer",fn:function(){return[n("CIcon",{staticClass:"mt-0 icon1",attrs:{name:"cil-healing"}})]},proxy:!0}])})],1)],1)},g=[];function v(t,e,n,r,a,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(r,a)}function b(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function s(t){v(o,r,a,s,i,"next",t)}function i(t){v(o,r,a,s,i,"throw",t)}s(void 0)}))}}var x={name:"WidgetsDropdown",data:function(){return{salesNumber:0,salesArr:[],expenseNumber:0,expenseArr:[],incomeNumber:"",medicineNumber:""}},mounted:function(){this.getExpenses(),this.getSales(),this.getMedicineData()},methods:{getExpenses:function(){var t=this;return b(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("http://localhost:3000/purchase/getMonth").then((function(e){var n=new Date,r=n.getMonth()+1,a=u.a.find(e.data,(function(t){return t._id==r}));t.expenseNumber=a.total})).catch((function(t){console.log(t)}));case 2:case"end":return e.stop()}}),e,this)})))()},getSales:function(){var t=this;return b(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("http://localhost:3000/sales/getToday").then((function(e){var n=0;e.data.forEach((function(t){n+=parseFloat(t.total)})),t.salesNumber=n})).catch((function(t){console.log(t.response)}));case 2:case"end":return e.stop()}}),e,this)})))()},getMedicineData:function(){var t=this;this.$http.get("http://localhost:3000/medicine/get").then((function(e){t.medicineNumber=String(e.data.length)})).catch((function(t){console.log(t.response)}))},navigate:function(){this.$router.push({name:"Cashier"})}}},y=x,w=(n("2b7f"),Object(d["a"])(y,C,g,!1,null,"8b32eca6",null)),M=w.exports,_=n("c1df"),D=n.n(_);function N(t,e,n,r,a,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(r,a)}function R(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function s(t){N(o,r,a,s,i,"next",t)}function i(t){N(o,r,a,s,i,"throw",t)}s(void 0)}))}}var k={name:"Dashboard",components:{MainChartExample:f,WidgetsDropdown:M,ChartLineSimple:m["a"]},data:function(){return{getmonth:function(){var t=D()().subtract("month").startOf("month").format("MMMM");return t},getYear:function(){var t=D()().year();return t},selected:"",selectArr:[],data:{salesNumber:0,purchaseNumber:0},componentKey:0}},mounted:function(){var t=D()().format("YYYY-MMMM"),e=D()().subtract(1,"month").format("YYYY-MMMM"),n=D()().subtract(2,"month").format("YYYY-MMMM");this.selectArr.push(n),this.selectArr.push(e),this.selectArr.push(t),this.selected=t,this.selection(t)},methods:{selection:function(t){var e=this;return R(regeneratorRuntime.mark((function n(){var r,a,o,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.selected=t,r=t.split("-")[1],a=t.split("-")[0],o=D()().month(r).format("M"),s={Year:a,Month:o},n.next=7,e.$http.get("http://localhost:3000/sales/getMonthlyReport",s).then((function(t){var n=u.a.find(t.data,(function(t){return t._id==o}));e.data.salesNumber=n?n.total:0})).catch((function(t){console.log(t.response),401==t.response.status&&e.$store.dispatch("logout").then((function(){}))}));case 7:return n.next=9,e.$http.get("http://localhost:3000/purchase/getMonthlyReport",s).then((function(t){var n=u.a.find(t.data,(function(t){return t._id==o}));e.data.purchaseNumber=n?n.total:0})).catch((function(t){console.log(t.response),401==t.response.status&&e.$store.dispatch("logout").then((function(){}))}));case 9:e.forceRerender();case 10:case"end":return n.stop()}}),n,this)})))()},forceRerender:function(){this.componentKey+=1}}},Y=k,S=Object(d["a"])(Y,r,a,!1,null,null,null);e["default"]=S.exports}}]);
//# sourceMappingURL=chunk-2063f6bc.b923130d.js.map