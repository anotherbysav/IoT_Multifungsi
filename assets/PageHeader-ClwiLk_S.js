import{c as l,_ as p,o as s,a as o,b as e,t,k as y,g as c,u as i,d,O as k,p as n,s as r}from"./index-DPkEmvor.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=l("CalendarIcon",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=l("ClockIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]),v={class:"page-head"},f={key:0},I={class:"datetime"},x={class:"dt-item"},S={class:"dt-item clock"},C={__name:"PageHeader",props:{title:{type:String,required:!0},subtitle:{type:String,default:""}},setup(a){const m=n(()=>new Intl.DateTimeFormat("id-ID",{day:"2-digit",month:"short",year:"numeric"}).format(r.clock)),u=n(()=>new Intl.DateTimeFormat("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(r.clock));return(h,D)=>(s(),o("div",v,[e("div",null,[e("h1",null,t(a.title),1),a.subtitle?(s(),o("p",f,t(a.subtitle),1)):y("",!0)]),e("div",I,[e("div",x,[c(i(_),{size:15}),d(t(m.value),1)]),e("div",S,[c(i(g),{size:15}),d(t(u.value),1)]),k(h.$slots,"actions",{},void 0)])]))}},N=p(C,[["__scopeId","data-v-24d890f4"]]);export{N as P};
