"use strict";(self.webpackChunksocial_app_ts=self.webpackChunksocial_app_ts||[]).push([[829],{829:function(e,n,s){s.r(n),s.d(n,{default:function(){return q}});var r=s(1413),t=s(5671),o=s(3144),l=s(136),i=s(5716),u=s(2791),a=s(7375),c=s(7781),f=s(3767),g=s(7246),p=s(493),h=s(866),d=s(4852),x=s(653),w=s(3044),m=s(5523),P=s(1440),j=s(6259),Z=s(7924),C=s(3504),v=s(2653),U=s(184),y=function(e){var n=e.user,s=e.followingProgress,r=e.followUnfollow;return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(d.ZP,{sx:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",p:"1rem"},children:[(0,U.jsxs)(x.Z,{sx:{width:"150px"},children:[(0,U.jsx)(C.OL,{to:"/profile/".concat(n.id),children:(0,U.jsx)(w.Z,{alt:"Avatar",src:null!==n.photos.small?n.photos.small:v,sx:{mb:"0.5rem"}})}),(0,U.jsx)(m.Z,{sx:{display:"block"},disabled:s.some((function(e){return e===n.id})),label:n.followed?"Unfollow":"Follow",control:(0,U.jsx)(P.Z,{checked:n.followed,onChange:n.followed?function(){return r(n.id,!1)}:function(){return r(n.id,!0)},name:"loading",color:"success"})})]}),(0,U.jsx)(j.Z,{sx:{width:"50%"},primary:n.name,secondary:null===n.status?"No status...":n.status})]}),(0,U.jsx)(Z.Z,{variant:"inset",component:"li"})]})},k=function(e){var n=e.onChangePage,s=e.totalUsersCount,r=e.currentPage,t=e.isFetching,o=e.users,l=e.followingProgress,i=e.followUnfollow,u=e.pageSize;if(t)return(0,U.jsx)(h.p,{});var a=Math.ceil(s/u);return(0,U.jsxs)("div",{children:[(0,U.jsx)(f.Z,{spacing:2,sx:{m:"1rem 0rem 2rem",alignItems:"center"},children:(0,U.jsx)(g.Z,{count:a,page:r,onChange:function(e,s){return n(s)}})}),(0,U.jsx)(p.Z,{children:o.map((function(e){return(0,U.jsx)(y,{user:e,followingProgress:l,followUnfollow:i},e.id)}))})]})},b=s(9627),F=s(2932),z=s(6916),S=function(e){return e.usersPage.pageSize},_=function(e){return e.usersPage.totalCount},I=function(e){return e.usersPage.currentPage},M=function(e){return e.usersPage.isFetching},A=function(e){return e.usersPage.followingProgress},D=(0,z.P1)((function(e){return e.usersPage.users}),(function(e){return e})),O=function(e){(0,l.Z)(s,e);var n=(0,i.Z)(s);function s(){var e;(0,t.Z)(this,s);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return(e=n.call.apply(n,[this].concat(o))).onChangePage=function(n){e.props.fetchUsers(n,e.props.pageSize)},e}return(0,o.Z)(s,[{key:"componentDidMount",value:function(){this.props.fetchUsers(this.props.currentPage,this.props.pageSize)}},{key:"shouldComponentUpdate",value:function(e,n){return e!==this.props||n!==this.state}},{key:"render",value:function(){return(0,U.jsx)(k,(0,r.Z)((0,r.Z)({},this.props),{},{onChangePage:this.onChangePage}))}}]),s}(u.Component),q=(0,c.qC)((0,a.$j)((function(e){return{users:D(e),pageSize:S(e),totalUsersCount:_(e),currentPage:I(e),isFetching:M(e),followingProgress:A(e)}}),{toggleIsFetching:b.MO,fetchUsers:b.uh,followUnfollow:b._V}),F.D)(O)}}]);
//# sourceMappingURL=829.5cdeb739.chunk.js.map