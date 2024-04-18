"use strict";(self.webpackChunkmovies_db_app=self.webpackChunkmovies_db_app||[]).push([[441],{5441:(e,n,t)=>{t.r(n),t.d(n,{default:()=>R});var r=t(5043),s=t(5475),o=t(6520),i=t(2110),a=t(6591),l=t(6494),d=t(5865),c=t(7600),u=t(1906),x=t(7739),h=t(7392),m=t(579);function p(e){let{id:n,title:t,overview:r,popularity:p,enableUserAction:v=!1,onAddFavorite:g,image:A="./movie-thumb.png"}=e;return(0,m.jsxs)(i.A,{sx:{height:"100%",display:"flex",flexDirection:"column"},children:[(0,m.jsx)(a.A,{component:"div",image:A,sx:{pt:"56.25%"}}),(0,m.jsxs)(l.A,{sx:{flexGrow:1},children:[(0,m.jsx)(d.A,{variant:"h5",gutterBottom:!0,children:t}),(0,m.jsx)(d.A,{variant:"body2",color:"text.secondary",children:r}),(0,m.jsx)(d.A,{variant:"button",display:"block",mt:2,children:p})]}),(0,m.jsxs)(c.A,{children:[(0,m.jsx)(u.A,{component:s.N_,to:"/movies/".concat(n),color:"secondary",children:"Datails"}),v&&(0,m.jsx)(x.A,{title:"Add to favorite",children:(0,m.jsx)(h.A,{onClick:()=>null===g||void 0===g?void 0:g(n),children:(0,m.jsx)(o.A,{})})})]})]})}const v=(0,r.memo)(p);var g=t(4858),A=t(950),j=t(3336),f=t(3193),b=t(618),y=t(5226),k=t(7121),w=t(1292),C=t(9413),I=t(4605),N=t(3217),_=t(7733),F=t(5529);function L(e){let{onApply:n}=e;const[t,s]=(0,r.useState)(""),{data:o=[],isLoading:i}=(0,F.q6)(t,{skip:!t}),{data:a=[],isLoading:l}=(0,F.eE)(),{handleSubmit:d,control:c}=(0,g.mN)({defaultValues:{keywords:[],genres:[]}}),x=(0,r.useMemo)((()=>(0,A.A)((e=>{s(e)}),1e3)),[]);return(0,m.jsx)(j.A,{sx:{m:2,p:.5},children:(0,m.jsxs)("form",{onSubmit:d(n),children:[(0,m.jsx)(f.A,{component:"fieldset",variant:"standard",sx:{m:2,display:"block"},children:(0,m.jsx)(g.xI,{name:"keywords",control:c,render:e=>{let{field:{onChange:n,value:t}}=e;return(0,m.jsx)(b.A,{multiple:!0,disablePortal:!0,loading:i,options:o,filterOptions:e=>e,getOptionLabel:e=>e.name,onChange:(e,t)=>n(t),value:t,isOptionEqualToValue:(e,n)=>e.id===n.id,onInputChange:(e,n)=>x(n),renderInput:e=>(0,m.jsx)(y.A,{...e,label:"Keywords"})})}})}),(0,m.jsx)(f.A,{sx:{m:2,display:"block"},component:"fieldset",variant:"standard",children:l?(0,m.jsx)(k.A,{width:300,height:480}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(w.A,{component:"legend",children:"Genres"}),(0,m.jsx)(C.A,{sx:{maxHeight:500},children:(0,m.jsx)(g.xI,{name:"genres",control:c,render:e=>{let{field:n}=e;return(0,m.jsx)(m.Fragment,{children:a.map((e=>(0,m.jsx)(I.A,{control:(0,m.jsx)(N.A,{value:e.id,checked:n.value.includes(e.id),onChange:(e,t)=>{const r=Number(e.target.value);t?n.onChange([...n.value,r]):n.onChange(n.value.filter((e=>e!==r)))}}),label:e.name},e.id)))})}})})]})}),(0,m.jsx)(u.A,{type:"submit",variant:"contained",startIcon:(0,m.jsx)(_.A,{}),sx:{m:2},children:"Apply filter"})]})})}var S=t(8903),E=t(9252),M=t(611),O=t(8581);const q={pageNumber:1,filters:{}};const R=function(){var e;const[n,t]=(0,r.useState)(q),{data:s}=(0,F.EA)(),{data:o,isFetching:i}=(0,F.Lg)(n),a=null!==(e=null===o||void 0===o?void 0:o.results)&&void 0!==e?e:[],l=null===o||void 0===o?void 0:o.hasMorePages,c=(0,r.useContext)(O.c),u=c.user!==O.L,x=(0,r.useCallback)((()=>{l&&t((e=>({...e,pageNumber:e.pageNumber+1})))}),[l]),{targetRef:h}=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{threshold:n=0,root:t=null,rootMargin:s="0px",onIntersect:o}=e,[i,a]=(0,r.useState)(),l=(0,r.useRef)(null);return(0,r.useEffect)((()=>{const e=l.current,r=new IntersectionObserver((e=>{const[n]=e;n.isIntersecting&&(null===o||void 0===o||o()),a(n)}),{threshold:n,root:t,rootMargin:s});return e&&r.observe(e),()=>{e&&r.disconnect()}}),[o,t,s,n]),{targetRef:l,entry:i}}({onIntersect:x}),p=(0,r.useCallback)((e=>{alert("In process! Action: ".concat(c.user.name," is trying to add movie").concat(e," to his favorite list."))}),[c.user.name]);return(0,m.jsxs)(S.Ay,{container:!0,spacing:2,sx:{flexWrap:"nowrap"},children:[(0,m.jsx)(S.Ay,{item:!0,xs:"auto",children:(0,m.jsx)(L,{onApply:e=>{const n={keywords:e.keywords.map((e=>e.id)),genres:e.genres};t({pageNumber:1,filters:n})}})}),(0,m.jsx)(S.Ay,{item:!0,xs:12,children:(0,m.jsxs)(E.A,{sx:{py:8},maxWidth:"lg",children:[!i&&!a.length&&(0,m.jsx)(d.A,{variant:"h6",children:"No movies were found that match your query."}),(0,m.jsx)(S.Ay,{container:!0,spacing:4,children:a.map(((e,n)=>{let{id:t,title:r,overview:o,popularity:i,backdrop_path:a}=e;return(0,m.jsx)(S.Ay,{item:!0,xs:12,sm:6,md:4,children:(0,m.jsx)(v,{id:t,title:r,overview:o,popularity:i,image:(l=a,l&&s?"".concat(null===s||void 0===s?void 0:s.images.base_url,"w780").concat(l):void 0),enableUserAction:u,onAddFavorite:p})},"".concat(t,"-").concat(n));var l}))}),(0,m.jsx)("div",{ref:h,children:i&&(0,m.jsx)(M.A,{color:"secondary",sx:{mt:3}})})]})})]})}}}]);
//# sourceMappingURL=441.cf8c03e9.chunk.js.map