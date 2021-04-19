(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{10:function(e,t,n){},29:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),s=n(7),c=n.n(s),o=(n(29),n(12)),i=n(4),l=n.n(i),u=n(5),d=n(3),b=n(13),j=n(14),h=n(0),p=[{value:"MostRecent",label:"Date Listed (newest)"},{value:"LeastRecent",label:"Date Listed (oldest)"}];var f=function(e){var t=e.sortOrder,n=e.setSortOrder,a=(e.updateListings,Object(r.useRef)()),s=Object(r.useState)(!1),c=Object(d.a)(s,2),o=c[0],i=c[1];!function(e,t){Object(r.useEffect)((function(){var n=function(n){e.current&&!e.current.contains(n.target)&&(n.target.className&&n.target.className.includes("filter-sort-touch")||t(n))};return document.addEventListener("mousedown",n),document.addEventListener("touchstart",n),function(){document.removeEventListener("mousedown",n),document.removeEventListener("touchstart",n)}}),[e,t])}(a,(function(){return i(!1)}));var l=function(e){n(e.value),i(!1)};return Object(h.jsxs)("div",{children:[Object(h.jsxs)("button",{className:"flex-row filter-sort-container filter-sort-touch",onClick:function(){i(!o)},children:[Object(h.jsx)("img",{src:"images/sort.png",className:"filter-sort filter-sort-touch",alt:"sort"}),Object(h.jsx)("p",{className:"filter-sort-text filter-sort-touch",children:"SORT BY"})]}),o&&Object(h.jsx)("div",{ref:a,className:"filter-sort-options",children:p.map((function(e){return Object(h.jsx)("button",{className:t===e.value?"filter-sort-option option-chosen":"filter-sort-option",onClick:function(){return l(e)},children:Object(h.jsx)("p",{className:"sort-option-text",children:e.label})},e.value)}))})]})};var m,x=function(e){var t=e.houseTypes,n=e.setHouseTypes,a=e.updateListings,s=Object(r.useRef)(),c=Object(r.useState)(!1),o=Object(d.a)(c,2),i=o[0],l=o[1];!function(e,t){Object(r.useEffect)((function(){var n=function(n){e.current&&!e.current.contains(n.target)&&(n.target.className&&n.target.className.includes("filter-type-touch")||t(n))};return document.addEventListener("mousedown",n),document.addEventListener("touchstart",n),function(){document.removeEventListener("mousedown",n),document.removeEventListener("touchstart",n)}}),[e,t])}(s,(function(){return l(!1)}));var u=function(){l(!i)};return Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:"flex-row",children:[i?Object(h.jsx)("button",{className:"flex-row filter-type-container filter-type-touch type-pressed",onClick:function(){return u()},children:"House Type"}):Object(h.jsx)("button",{className:"flex-row filter-type-container filter-type-touch",onClick:function(){return u()},children:"House Type"}),Object(h.jsx)("div",{className:"filter-type-arrow",children:i?Object(h.jsx)("img",{src:"images/down_arrow_white.png",className:"downarrow filter-type-touch",alt:"down_arrow",onClick:function(){return u()}}):Object(h.jsx)("img",{src:"images/down_arrow_2.png",className:"downarrow filter-type-touch",alt:"down_arrow",onClick:function(){return u()}})})]}),i&&Object(h.jsxs)("div",{ref:s,className:"filter-type-options",style:{width:150},children:[Object(h.jsx)("p",{className:"filter-type-title",children:"Home Type"}),t.map((function(e,r){return Object(h.jsxs)("button",{className:"filter-type-btn flex-row",onClick:function(){return function(e){var r=JSON.parse(JSON.stringify(t));r[e.index].selected=!t[e.index].selected,n(r)}(e)},children:[e.selected?Object(h.jsx)("img",{src:"images/check_clicked.png",alt:"checkbox empty",className:"filter-check"}):Object(h.jsx)("img",{src:"images/check_empty.png",alt:"checkbox empty",className:"filter-check"}),Object(h.jsx)("p",{style:{textAlign:"left"},children:e.label})]},r)})),Object(h.jsx)("button",{className:"filter-type-done",onClick:function(){return a(),void u()},children:"Done"})]})]})},O=(n(10),new Intl.NumberFormat),g=function(e){var t=e.item,n=e.setItem,a=e.name,s=e.type,c=Object(r.useState)(!1),o=Object(d.a)(c,2),i=o[0],l=o[1],u=Object(r.useState)(!1),b=Object(d.a)(u,2),j=b[0],p=b[1],f=function(){switch(s){case"$":return Object(h.jsx)("p",{className:"low-high-dollar",children:"$"});case"ft":return Object(h.jsx)("p",{className:"low-high-feet",children:"ft."});default:return null}};return Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{className:"low-high-text",children:a}),Object(h.jsxs)("div",{className:"low-high-row",children:[Object(h.jsxs)("div",{className:"low-high-container",children:[f(),i?Object(h.jsx)("input",{className:"low-high-input",type:"number",value:t.low,onChange:function(e){return function(e){var r=e;""===r&&(r="Min"),n({low:r,high:t.high})}(e.target.value)},onBlur:function(e){l(!1)}}):Object(h.jsx)("input",{className:"low-high-input",type:"text",value:"Min"===t.low||"year"===s?t.low:O.format(t.low),onFocus:function(){return l(!0)},readOnly:!0})]}),Object(h.jsxs)("div",{className:"low-high-container",children:[f(),j?Object(h.jsx)("input",{className:"low-high-input",type:"number",value:t.high,onChange:function(e){return function(e){var r=e;""===r&&(r="Max"),n({low:t.low,high:r})}(e.target.value)},onBlur:function(e){p(!1)}}):Object(h.jsx)("input",{className:"low-high-input",type:"text",value:"Max"===t.high||"year"===s?t.high:O.format(t.high),onFocus:function(){return p(!0)},readOnly:!0})]}),"Min"!=t.low||"Max"!=t.high?Object(h.jsx)("button",{className:"low-high-reset-container",onClick:function(){n({low:"Min",high:"Max"})},children:Object(h.jsx)("img",{src:"images/reset.png",alt:"reset filter",className:"low-high-reset-img"})}):Object(h.jsx)("button",{className:"low-high-reset-container reset-hidden",children:Object(h.jsx)("img",{src:"images/reset.png",alt:"reset filter",className:"low-high-reset-img"})})]})]})},v=n(15),w=n.n(v),y=(Object(j.a)(w.a)(m||(m=Object(b.a)(["\n    \n  .react-dropdown-select-clear,\n  .react-dropdown-select-dropdown-handle {\n    color: #888;\n  }\n  .react-dropdown-select-option {\n    border: 1px solid #fff;\n  }\n  .react-dropdown-select-item {\n    color: #333;\n  }\n  .react-dropdown-select-input {\n    color: #333;\n  }\n  .react-dropdown-select-dropdown {\n    position: absolute;\n    left: 0;\n    border: solid;\n    border-color: transparent;\n    border-radius: 4px;\n    width: 220px;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    max-height: 200px;\n    overflow: auto;\n    z-index: 9;\n    background: #fff;\n    color: #333 !important;\n\n    -webkit-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);\n    -moz-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);\n    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);\n  }\n  .react-dropdown-select-item {\n    color: #333;\n    :hover {\n       background-color: #d9ddff;\n    }\n  }\n  .react-dropdown-select-item.react-dropdown-select-item-selected,\n  .react-dropdown-select-item.react-dropdown-select-item-active {\n    color: #fff;\n    background: #818cdc;\n  }\n  .react-dropdown-select-item.react-dropdown-select-item-disabled {\n    background: #818cdc;\n    color: #ccc;\n  }\n"]))),[{value:"Any",label:"Any"},{value:"1 day",label:"1 day"},{value:"7 days",label:"7 days"},{value:"14 days",label:"14 days"},{value:"30 days",label:"30 days"},{value:"90 days",label:"90 day"},{value:"6 months",label:"6 months"},{value:"12 months",label:"12 months"},{value:"24 months",label:"24 months"},{value:"36 months",label:"36 months"}]),N=[{value:"In the last 7 days",label:"In the last 7 days"},{value:"In the last 30 days",label:"In the last 30 days"},{value:"In the last 60 days",label:"In the last 60 days"},{value:"In the last 90 days",label:"In the last 90 days"},{value:"In the last 3 months",label:"In the last 3 months"},{value:"In the last 6 months",label:"In the last 6 months"},{value:"In the last 12 months",label:"In the last 12 months"}];var k,L=function(e){var t=e.setReqBody,n=e.reqBody,a=(e.updateListings,Object(r.useRef)()),s=Object(r.useState)(!1),c=Object(d.a)(s,2),i=c[0],b=c[1];!function(e,t){Object(r.useEffect)((function(){var n=function(n){e.current&&!e.current.contains(n.target)&&(n.target.className&&n.target.className.includes("filter-more-touch")||t(n))};return document.addEventListener("mousedown",n),document.addEventListener("touchstart",n),function(){document.removeEventListener("mousedown",n),document.removeEventListener("touchstart",n)}}),[e,t])}(a,(function(){return b(!1)}));var j=Object(r.useState)({low:"Min",high:"Max"}),p=Object(d.a)(j,2),f=p[0],m=p[1],x=Object(r.useState)({low:"Min",high:"Max"}),O=Object(d.a)(x,2),v=(O[0],O[1],Object(r.useState)({low:"Min",high:"Max"})),w=Object(d.a)(v,2),k=(w[0],w[1],Object(r.useState)({low:"Min",high:"Max"})),L=Object(d.a)(k,2),M=L[0],S=L[1],I=Object(r.useState)({low:"Min",high:"Max"}),C=Object(d.a)(I,2),B=C[0],R=C[1],A=Object(r.useState)({low:"Min",high:"Max"}),E=Object(d.a)(A,2),T=E[0],q=E[1],F=Object(r.useState)({low:"Min",high:"Max"}),P=Object(d.a)(F,2),H=P[0],D=P[1],Y=Object(r.useState)(y[0]),$=Object(d.a)(Y,2),U=($[0],$[1],Object(r.useState)(N[0])),z=Object(d.a)(U,2),W=(z[0],z[1],function(){b(!i)}),_=function(){var e=Object(u.a)(l.a.mark((function e(){var r,a,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r={},a=["Bathrooms","Beds","Price","SqFt","YearBuilt"],s=0;s<a.length;s++)J(a[s],r);t(Object(o.a)(Object(o.a)({},n),r)),W();case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(e,t){switch(e){case"Bathrooms":V(e,T,t);break;case"Beds":V(e,B,t);break;case"Price":V(e,f,t);break;case"SqFt":V(e,M,t);break;case"YearBuilt":V(e,H,t);break;default:return}},V=function(e,t,n){"Min"!==t.low&&/^\d+$/.test(t.low)?n[e+"Low"]=parseInt(t.low):n[e+"Low"]=0,"Max"!==t.high&&/^\d+$/.test(t.high)?n[e+"High"]=parseInt(t.high):n[e+"High"]=1e8};return Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{className:"flex-row",children:i?Object(h.jsx)("button",{className:"flex-row filter-more-container filter-more-touch type-pressed",onClick:function(){return W()},children:Object(h.jsx)("img",{src:"images/filter_white.png",alt:"filter",className:"filter-more-img filter-more-touch"})}):Object(h.jsx)("button",{className:"flex-row filter-more-container",onClick:function(){return W()},children:Object(h.jsx)("img",{src:"images/filter_gray.png",alt:"filter",className:"filter-more-img"})})}),i&&Object(h.jsxs)("div",{ref:a,className:"filter-type-options",children:[Object(h.jsx)(g,{item:f,setItem:m,name:"Listing Price",type:"$"}),Object(h.jsx)(g,{item:M,setItem:S,name:"Square Feet",type:"ft"}),Object(h.jsx)(g,{item:B,setItem:R,name:"Beds",type:""}),Object(h.jsx)(g,{item:T,setItem:q,name:"Baths",type:""}),Object(h.jsx)(g,{item:H,setItem:D,name:"Year Built",type:"year"}),Object(h.jsx)("button",{className:"filter-type-done",onClick:function(){return _()},children:"Set filters"})]})]})},M=Object(j.a)(w.a)(k||(k=Object(b.a)(["\n    \n  .react-dropdown-select-clear,\n  .react-dropdown-select-dropdown-handle {\n    color: #888;\n  }\n  .react-dropdown-select-option {\n    border: 1px solid #fff;\n  }\n  .react-dropdown-select-item {\n    color: #333;\n  }\n  .react-dropdown-select-input {\n    color: #333;\n  }\n  .react-dropdown-select-dropdown {\n    position: absolute;\n    left: 0;\n    border: solid;\n    border-color: transparent;\n    border-radius: 4px;\n    width: 360px;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    max-height: 300px;\n    overflow: auto;\n    z-index: 9;\n    background: #fff;\n    color: #333 !important;\n\n    -webkit-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);\n    -moz-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);\n    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);\n  }\n  .react-dropdown-select-item {\n    color: #333;\n    :hover {\n       background-color: #d9ddff;\n    }\n  }\n  .react-dropdown-select-item.react-dropdown-select-item-selected,\n  .react-dropdown-select-item.react-dropdown-select-item-active {\n    color: #fff;\n    background: #818cdc;\n  }\n  .react-dropdown-select-item.react-dropdown-select-item-disabled {\n    background: #818cdc;\n    color: #ccc;\n  }\n"]))),S=function(e){var t=e.locations,n=e.focusedLocation,a=e.setFocusedLocation,s=e.setCenter,c=e.houseTypes,o=e.setHouseTypes,i=e.sortOrder,d=e.setSortOrder,b=e.setReqBody,j=e.reqBody,p=e.updateListings,m=e.bounds;Object(r.useEffect)(Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))),[m]);return Object(h.jsxs)("div",{className:"filter-container",children:[Object(h.jsxs)("div",{className:"flex-row",children:[Object(h.jsxs)("div",{className:"flex-row",children:[Object(h.jsx)("img",{src:"images/search.png",className:"filter-search",alt:"search"}),Object(h.jsx)(M,{options:t,values:[n],onChange:function(e){return function(e){void 0===e||null===e||0==e.length?a(null):(a(e[0]),s({lat:e[0].Lat,lng:e[0].Long}))}(e)},style:{width:360,height:28,borderColor:"#888888",borderRadius:4,paddingLeft:36,color:"#333333",fontSize:18,backgroundColor:"white"},closeOnSelect:!0})]}),Object(h.jsx)(x,{houseTypes:c,setHouseTypes:o,updateListings:p}),Object(h.jsx)(L,{setReqBody:b,reqBody:j,updateListings:p})]}),Object(h.jsx)(f,{sortOrder:i,setSortOrder:d,updateListings:p})]})},I=n(24),C=n(18),B=n.n(C),R=Intl.NumberFormat(),A=function(e){var t=e.property,n=e.isModal;console.log(t);return Object(h.jsxs)("div",{className:"flex-row prop-container",children:[Object(h.jsx)("div",{className:"prop-col-1",children:Object(h.jsx)("img",{src:t.HouseImageURL,className:n?"prop-image-lg":"prop-image",alt:"Single family home"})}),Object(h.jsxs)("div",{className:"prop-col-2",children:[Object(h.jsxs)("p",{className:"prop-title",children:[t.FullAddress,", ",t.City]}),Object(h.jsxs)("div",{className:"prop-text-container",children:[Object(h.jsx)("p",{children:function(){var e="";return null!==t.ListPrice&&(e+="List: $"+R.format(t.ListPrice)+"\xa0\xa0"),t.OfferPrice&&"Need Agent Input"!==t.OfferPrice&&(e+=" Offer: $"+R.format(t.OfferPrice)+"\xa0\xa0"),t.RenovationPrice&&"Need Agent Input"!==t.RenovationPrice&&(e+=" Reno: $"+R.format(t.RenovationPrice)),e}()}),Object(h.jsxs)("div",{className:"flex-row",children:[t.RentLow&&Object(h.jsxs)("p",{children:["Rent Low: $",R.format(Math.round(t.RentLow))+"\xa0\xa0"]}),t.RentHigh&&Object(h.jsxs)("p",{children:["Rent High: $",R.format(Math.round(t.RentHigh))]})]}),Object(h.jsx)("p",{children:function(){var e="";return t.Beds&&(e+=t.Beds+" Bed"),t.Beds&&t.Baths&&(e+=" / "),t.Baths&&(e+=t.Baths+" Bath\xa0\xa0"),t.SquareFeet&&(e+=R.format(t.SquareFeet)+" sqft. house"),e}()}),Object(h.jsx)("p",{children:function(){var e="";return t.YearBuilt&&(e+="Built: "+t.YearBuilt+"\xa0\xa0"),t.YearRenovated&&(e+="Renovated: "+t.YearRenovated),t.LotFootage&&(e+=R.format(t.LotFootage)+" sqft. lot size"),e}()})]}),Object(h.jsxs)("div",{className:"flex-row flex-start prop-text-container",children:[Object(h.jsxs)("div",{className:"prop-proforma-col-1",children:[Object(h.jsx)("p",{children:"Investor Equity Required"}),Object(h.jsx)("p",{children:"Investor IRR (Year 7)"}),Object(h.jsx)("p",{children:"Investor Yield (Year 1)"}),Object(h.jsx)("p",{children:"Arrived Upfront Revenue"}),Object(h.jsx)("p",{children:"Arrived Property AUM Fees (7 yr)"})]}),Object(h.jsxs)("div",{children:[Object(h.jsxs)("p",{children:["$",R.format(Math.round(t.ProformaData.InvestorEquityRequired))]}),Object(h.jsxs)("p",{children:[Math.round(1e4*t.ProformaData.InvestorIRR)/100,"%"]}),Object(h.jsxs)("p",{children:[Math.round(1e4*t.ProformaData.InvestorYield)/100,"%"]}),Object(h.jsxs)("p",{children:["$",R.format(Math.round(t.ProformaData.ArrivedUpfrontRevenue))]}),Object(h.jsxs)("p",{children:["$",R.format(Math.round(t.ProformaData.ArrivedPropertyAUMFees))]})]})]})]})]})},E=Intl.NumberFormat(),T=document.getElementById("root");B.a.setAppElement(T);var q={content:{top:"20%",left:"15%",height:"50vh",width:"70vw",paddingLeft:"24px",paddingBottom:"36px",overflow:"visible"}},F=function(e){var t=e.property,n=Object(r.useState)(!1),a=Object(d.a)(n,2),s=a[0],c=a[1],o=Object(r.useState)(!1),i=Object(d.a)(o,2),l=i[0],u=i[1];return Object(h.jsxs)("button",{className:"marker-container",onClick:function(){return u(!0)},onMouseEnter:function(){return c(!0)},onMouseLeave:function(){return c(!1)},children:[Object(h.jsx)("div",{className:"marker-button"}),s&&Object(h.jsx)("div",{className:"marker-prev",children:Object(h.jsxs)("div",{className:"flex-row flex-start",children:[Object(h.jsx)("img",{src:t.HouseImageURL,className:"marker-image",alt:""}),Object(h.jsxs)("div",{className:"marker-col",children:[Object(h.jsxs)("p",{className:"marker-text marker-price",children:["$",E.format(t.ListPrice)]}),Object(h.jsxs)("div",{className:"marker-row",children:["None"!==t.Beds&&Object(h.jsx)("p",{className:"marker-text",children:t.Beds+" Beds"}),"None"!==t.Beds&&"None"!==t.Baths&&Object(h.jsx)("p",{className:"marker-text",children:"/ "}),"None"!==t.Baths&&Object(h.jsx)("p",{className:"marker-text",children:t.Baths+" Baths"})]}),t.SquareFeet&&t.SquareFeet>0&&Object(h.jsx)("p",{className:"marker-text",children:E.format(t.SquareFeet)+" sqft"})]})]})}),Object(h.jsx)("div",{onClick:function(e){return e.stopPropagation()},children:Object(h.jsxs)(B.a,{isOpen:l,onRequestClose:function(){return u(!1)},contentLabel:"Listing Modal",style:q,children:[Object(h.jsx)(A,{property:t,isModal:!0}),Object(h.jsx)("button",{className:"marker-modal-close",onClick:function(){return u(!1)},children:Object(h.jsx)("img",{className:"modal-img-close",src:"images/close_modal.png",alt:"close modal"})})]})})]})},P="AIzaSyBuqbU9Jz7IRv0VQiJjVgg2zyqPoM85Ek0",H=function(e){var t=e.center,n=e.data,a=e.setBounds,s=e.updateListings,c=Object(r.useState)(10),o=Object(d.a)(c,1)[0],i=Object(r.useState)(null),l=Object(d.a)(i,2),u=l[0],b=l[1],j=Object(r.useState)(!0),p=Object(d.a)(j,2),f=p[0],m=p[1],x=Object(r.useState)(!0),O=Object(d.a)(x,2),g=O[0],v=O[1];Object(r.useEffect)((function(){if(u){var e=u.getBounds(),n=e.getNorthEast(),r=e.getSouthWest();a({Lat:{Max:n.lat(),Min:r.lat()},Long:{Max:n.lng(),Min:r.lng()}}),u.setCenter(t)}}),[t]);return Object(h.jsxs)("div",{className:"map-container",children:[Object(h.jsx)("button",{className:g?"filter-search-here search-disabled":"filter-search-here",disabled:g,onClick:function(){return v(!0),void s()},children:"Search Here"}),Object(h.jsx)(I.a,{bootstrapURLKeys:{key:P},defaultCenter:{lat:36.07967,lng:-94.222055},defaultZoom:o,resetBoundsOnResize:!0,yesIWantToUseGoogleMapApiInternals:!0,onGoogleApiLoaded:function(e){var n=e.map;e.maps;return function(e){b(e),e.setCenter(t),m(!1)}(n)},onChange:function(){return function(){if(u&&!f){v(!1);var e=u.getBounds(),t=e.getNorthEast(),n=e.getSouthWest();a({Lat:{Max:t.lat(),Min:n.lat()},Long:{Max:t.lng(),Min:n.lng()}})}}()},children:n.map((function(e,t){if(e.Latitude&&e.Longitude)return Object(h.jsx)(F,{lat:e.Latitude,lng:e.Longitude,property:e},t)}))})]})},D=10,Y=function(e){var t=e.currentListings,n=e.fetchDetailedListings,a=e.data,s=(Math.round(t.length/D),Object(r.useState)(1)),c=Object(d.a)(s,2),o=c[0],i=c[1],l=Object(r.useState)(!1),u=Object(d.a)(l,2),b=u[0],j=(u[1],Object(r.useRef)(!0));Object(r.useEffect)((function(){j.current?j.current=!1:n(a,o*D-D,o*D)}),[o]),Object(r.useEffect)((function(){i(1)}),[a]);var p=function(e){var t=Number(e.target.textContent);i(t)};return b?Object(h.jsx)("div",{className:"property-list",children:Object(h.jsx)("p",{children:"Loading data..."})}):Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{className:"property-list",children:t.map((function(e,t){return Object(h.jsx)(A,{property:e,isModal:!1},t)}))}),Object(h.jsxs)("div",{className:"pagination",children:[Object(h.jsx)("button",{onClick:function(){i((function(e){return e-1}))},className:"prev ".concat(1===o?"disabled":""),children:"prev"}),function(){var e=5*Math.floor((o-1)/5);return new Array(5).fill().map((function(t,n){if(a[(e+n)*D])return e+n+1}))}().map((function(e,t){if(e)return Object(h.jsx)("button",{onClick:p,className:"paginationItem ".concat(o===e?"active":null),children:Object(h.jsx)("span",{children:e})},t)})),Object(h.jsx)("button",{onClick:function(){i((function(e){return e+1}))},className:void 0!==a[o*D]?"next":"next disabled",children:"next"})]})]})},$="https://huskymarket.club",U=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat($,"/").concat("GetAllListings","?OrderType=").concat(n),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type"},body:JSON.stringify(t)});case 2:return r=e.sent,e.next=5,r.json();case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),z=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat($,"/GetSingleListing?ListingID=").concat(t));case 2:return n=e.sent,e.abrupt("return",n.json());case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r,a,s,c,o,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat($,"/GetAllLocations"));case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,r=[],a=0;case 8:if(!(a<n.length)){e.next=25;break}s=n[a],c=!1,(o=s.State).length>2&&(o=J(o,"abbr"),s.State=o),i=0;case 14:if(!(i<r.length)){e.next=21;break}if(r[i].City!=s.City||r[i].State!=s.State){e.next=18;break}return c=!0,e.abrupt("break",21);case 18:i++,e.next=14;break;case 21:!1===c&&(s.label=s.City+", "+o,s.value=a,r.push(s));case 22:a++,e.next=8;break;case 25:return e.abrupt("return",r);case 26:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r,a,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat($,"/GetAllHomeTypes"));case 2:return t=e.sent,e.next=5,t.json();case 5:for(n=e.sent,r=[],a=0;a<n.length;a++)(s=n[a]).Quantity>1&&r.push({value:s.HomeType,label:s.HomeType,index:a,selected:!0});return e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function J(e,t){var n=[["Arizona","AZ"],["Alabama","AL"],["Alaska","AK"],["Arkansas","AR"],["California","CA"],["Colorado","CO"],["Connecticut","CT"],["Delaware","DE"],["Florida","FL"],["Georgia","GA"],["Hawaii","HI"],["Idaho","ID"],["Illinois","IL"],["Indiana","IN"],["Iowa","IA"],["Kansas","KS"],["Kentucky","KY"],["Louisiana","LA"],["Maine","ME"],["Maryland","MD"],["Massachusetts","MA"],["Michigan","MI"],["Minnesota","MN"],["Mississippi","MS"],["Missouri","MO"],["Montana","MT"],["Nebraska","NE"],["Nevada","NV"],["New Hampshire","NH"],["New Jersey","NJ"],["New Mexico","NM"],["New York","NY"],["North Carolina","NC"],["North Dakota","ND"],["Ohio","OH"],["Oklahoma","OK"],["Oregon","OR"],["Pennsylvania","PA"],["Rhode Island","RI"],["South Carolina","SC"],["South Dakota","SD"],["Tennessee","TN"],["Texas","TX"],["Utah","UT"],["Vermont","VT"],["Virginia","VA"],["Washington","WA"],["West Virginia","WV"],["Wisconsin","WI"],["Wyoming","WY"]];if("abbr"==t){e=e.replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}));for(var r=0;r<n.length;r++)if(n[r][0]==e)return n[r][1]}else if("name"==t){e=e.toUpperCase();for(var a=0;a<n.length;a++)if(n[a][1]==e)return n[a][0]}}var V=function(){var e=Object(r.useState)(!0),t=Object(d.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)(null),c=Object(d.a)(s,2),i=c[0],b=c[1],j=Object(r.useState)(null),p=Object(d.a)(j,2),f=p[0],m=p[1],x=Object(r.useState)(null),O=Object(d.a)(x,2),g=O[0],v=O[1],w=Object(r.useState)(null),y=Object(d.a)(w,2),N=y[0],k=y[1],L=Object(r.useState)(null),M=Object(d.a)(L,2),I=M[0],C=M[1],B=Object(r.useState)(null),R=Object(d.a)(B,2),A=R[0],E=R[1],T=Object(r.useState)(null),q=Object(d.a)(T,2),F=q[0],P=q[1],D=Object(r.useState)("MostRecent"),$=Object(d.a)(D,2),J=$[0],V=$[1],G=Object(r.useState)({}),K=Object(d.a)(G,2),Q=K[0],Z=K[1];Object(r.useEffect)(Object(u.a)(l.a.mark((function e(){var t,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=13;break}return X(),e.next=4,W();case 4:return t=e.sent,C(t),b(t[1]),m({lat:t[1].Lat,lng:t[1].Long}),e.next=10,_();case 10:r=e.sent,k(r),a(!1);case 13:case"end":return e.stop()}}),e)}))),[]),Object(r.useEffect)(Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n||X();case 1:case"end":return e.stop()}}),e)}))),[J,Q]);var X=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U(Object(o.a)(Object(o.a)({},Q),g),J);case 2:return t=e.sent,E(t),e.next=6,ee(t,0,10);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=Object(u.a)(l.a.mark((function e(t,n,r){var a,s,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=[],s=n;case 2:if(!(s<r)){e.next=13;break}if(!(s>=t.length)){e.next=5;break}return e.abrupt("break",13);case 5:return c=t[s],e.next=8,z(c.ListingID);case 8:o=e.sent,a.push(o);case 10:s++,e.next=2;break;case 13:P(a);case 14:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}();return n||null==F||null==A?Object(h.jsx)("div",{}):Object(h.jsxs)("div",{children:[Object(h.jsx)(S,{locations:I,focusedLocation:i,setFocusedLocation:b,setCenter:m,houseTypes:N,setHouseTypes:k,sortOrder:J,setSortOrder:V,setReqBody:Z,reqBody:Q,updateListings:X,bounds:g}),Object(h.jsxs)("div",{className:"flex-row flex-start",children:[Object(h.jsx)(H,{center:f,data:A,setBounds:v,updateListings:X}),Object(h.jsx)(Y,{currentListings:F,fetchDetailedListings:ee,data:A})]})]})},G=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,58)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),s(e),c(e)}))};c.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(V,{})}),document.getElementById("root")),G()}},[[57,1,2]]]);
//# sourceMappingURL=main.2c1f7272.chunk.js.map