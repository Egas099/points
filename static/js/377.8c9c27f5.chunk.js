"use strict";(self.webpackChunkpoints_client=self.webpackChunkpoints_client||[]).push([[377],{8446:function(t,e,n){n.d(e,{B:function(){return p}});var r=n(3433),i=n(9439),a=n(2791),o=n(6030),s=n(9271),u=n(7477),l=n.n(u),c=n(6948),f=n(3962);function p(){var t=l()("saves",[]),e=(0,i.Z)(t,2),n=e[0],u=e[1],p=(0,o.I0)(),d=(0,s.k6)();return(0,a.useEffect)((function(){Array.isArray(n)||u([])}),[n]),{savesList:n,saveGame:function(t){var e=(0,c.Mk)(t);u([e].concat((0,r.Z)(n)))},deleteSave:function(t){return u(n.filter((function(e){return e.date!==t})))},deleteAllSaves:function(){return u([])},loadSave:function(t){var e=n.find((function(e){return e.date===t}));e?(p(f.wc(e.state)),d.push("/single")):console.error("The save requested for loading was not found.")}}}},1573:function(t,e,n){n.d(e,{i:function(){return r}});var r=n(6030).v9},3377:function(t,e,n){n.r(e),n.d(e,{default:function(){return St}});var r=n(9439),i=n(2791),a=n(1573),o="CellItem_wrapper__pyQvW",s="CellItem_content__wU-6T",u="CellItem_mover__Z9-vD",l=n(6982),c=n(2386),f=n(184),p=function(t){var e=t.cell,n=t.move,r=(0,a.i)((function(t){return t.gameState}));var i="".concat(o," \n    ").concat(r.mover!==e.player||r.moveBlock?"":u),p="".concat(s,"\n    ").concat((0,l.UB)(e.player,e.count));return(0,f.jsx)("div",{className:i,draggable:"false",children:e.allow&&(0,f.jsx)("div",{className:p,onClick:function(){var t=r.players.find((function(t){return t.player===e.player}));(null===t||void 0===t?void 0:t.entity.playerEntity)===c.T.localPlayer&&!r.moveBlock&&r.gameStarted&&r.mover===e.player&&n&&n(e)},draggable:"false",children:(0,f.jsx)("span",{children:function(t){switch(t){case 0:return"";case 1:return(0,f.jsx)(f.Fragment,{children:"\u2022"});case 2:return(0,f.jsx)(f.Fragment,{children:"\u2022\xa0\u2022"});case 3:return(0,f.jsxs)(f.Fragment,{children:["\u2022",(0,f.jsx)("br",{}),"\u2022\xa0\u2022"]});case 4:return(0,f.jsxs)(f.Fragment,{children:["\u2022\xa0\u2022",(0,f.jsx)("br",{}),"\u2022\xa0\u2022"]});case 5:return(0,f.jsxs)(f.Fragment,{children:["\u2022\xa0\u2022",(0,f.jsx)("br",{}),"\u2022",(0,f.jsx)("br",{}),"\u2022\xa0\u2022"]});default:return"!"}}(e.count)})})})},d="GameField_wrapper__G2YBN",m="GameField_content__e-ERj",h="GameField_row__sAnCD",v=function(t){var e=t.field,n=t.move;return(0,f.jsx)("div",{className:d,children:(0,f.jsx)("div",{className:m,children:e.map((function(t,e){return(0,f.jsx)("div",{className:h,children:t.map((function(t){return(0,f.jsx)(p,{cell:t,move:n},t.id)}))},e)}))})})},y="HeaderPanel_wrapper__7k9ke",g="HeaderPanel_content__72pV3",x="HeaderPanel_button__HalTg",E=function(t){var e=t.showMenu;return(0,f.jsx)("div",{className:y,children:(0,f.jsx)("div",{className:g,children:(0,f.jsx)("button",{onClick:e,className:x,children:"Menu"})})})},_="Popup_mask__yhffM",S="Popup_wrapper__N1aP+",b="Popup_content__F+3aB",N="Popup_main__nTmKq",w="Popup_button__yF5nC components_button__6uL8D",C=n(7462),j=n(3366),k=n(4578);function T(t,e){return t.replace(new RegExp("(^|\\s)"+e+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}var P=n(4164),B=!1,A=i.createContext(null),M="unmounted",Z="exited",O="entering",F="entered",D="exiting",R=function(t){function e(e,n){var r;r=t.call(this,e,n)||this;var i,a=n&&!n.isMounting?e.enter:e.appear;return r.appearStatus=null,e.in?a?(i=Z,r.appearStatus=O):i=F:i=e.unmountOnExit||e.mountOnEnter?M:Z,r.state={status:i},r.nextCallback=null,r}(0,k.Z)(e,t),e.getDerivedStateFromProps=function(t,e){return t.in&&e.status===M?{status:Z}:null};var n=e.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(t){var e=null;if(t!==this.props){var n=this.state.status;this.props.in?n!==O&&n!==F&&(e=O):n!==O&&n!==F||(e=D)}this.updateStatus(!1,e)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var t,e,n,r=this.props.timeout;return t=e=n=r,null!=r&&"number"!==typeof r&&(t=r.exit,e=r.enter,n=void 0!==r.appear?r.appear:e),{exit:t,enter:e,appear:n}},n.updateStatus=function(t,e){void 0===t&&(t=!1),null!==e?(this.cancelNextCallback(),e===O?this.performEnter(t):this.performExit()):this.props.unmountOnExit&&this.state.status===Z&&this.setState({status:M})},n.performEnter=function(t){var e=this,n=this.props.enter,r=this.context?this.context.isMounting:t,i=this.props.nodeRef?[r]:[P.findDOMNode(this),r],a=i[0],o=i[1],s=this.getTimeouts(),u=r?s.appear:s.enter;!t&&!n||B?this.safeSetState({status:F},(function(){e.props.onEntered(a)})):(this.props.onEnter(a,o),this.safeSetState({status:O},(function(){e.props.onEntering(a,o),e.onTransitionEnd(u,(function(){e.safeSetState({status:F},(function(){e.props.onEntered(a,o)}))}))})))},n.performExit=function(){var t=this,e=this.props.exit,n=this.getTimeouts(),r=this.props.nodeRef?void 0:P.findDOMNode(this);e&&!B?(this.props.onExit(r),this.safeSetState({status:D},(function(){t.props.onExiting(r),t.onTransitionEnd(n.exit,(function(){t.safeSetState({status:Z},(function(){t.props.onExited(r)}))}))}))):this.safeSetState({status:Z},(function(){t.props.onExited(r)}))},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(t,e){e=this.setNextCallback(e),this.setState(t,e)},n.setNextCallback=function(t){var e=this,n=!0;return this.nextCallback=function(r){n&&(n=!1,e.nextCallback=null,t(r))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(t,e){this.setNextCallback(e);var n=this.props.nodeRef?this.props.nodeRef.current:P.findDOMNode(this),r=null==t&&!this.props.addEndListener;if(n&&!r){if(this.props.addEndListener){var i=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],a=i[0],o=i[1];this.props.addEndListener(a,o)}null!=t&&setTimeout(this.nextCallback,t)}else setTimeout(this.nextCallback,0)},n.render=function(){var t=this.state.status;if(t===M)return null;var e=this.props,n=e.children,r=(e.in,e.mountOnEnter,e.unmountOnExit,e.appear,e.enter,e.exit,e.timeout,e.addEndListener,e.onEnter,e.onEntering,e.onEntered,e.onExit,e.onExiting,e.onExited,e.nodeRef,(0,j.Z)(e,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return i.createElement(A.Provider,{value:null},"function"===typeof n?n(t,r):i.cloneElement(i.Children.only(n),r))},e}(i.Component);function I(){}R.contextType=A,R.propTypes={},R.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:I,onEntering:I,onEntered:I,onExit:I,onExiting:I,onExited:I},R.UNMOUNTED=M,R.EXITED=Z,R.ENTERING=O,R.ENTERED=F,R.EXITING=D;var L=R,G=function(t,e){return t&&e&&e.split(" ").forEach((function(e){return r=e,void((n=t).classList?n.classList.remove(r):"string"===typeof n.className?n.className=T(n.className,r):n.setAttribute("class",T(n.className&&n.className.baseVal||"",r)));var n,r}))},U=function(t){function e(){for(var e,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))||this).appliedClasses={appear:{},enter:{},exit:{}},e.onEnter=function(t,n){var r=e.resolveArguments(t,n),i=r[0],a=r[1];e.removeClasses(i,"exit"),e.addClass(i,a?"appear":"enter","base"),e.props.onEnter&&e.props.onEnter(t,n)},e.onEntering=function(t,n){var r=e.resolveArguments(t,n),i=r[0],a=r[1]?"appear":"enter";e.addClass(i,a,"active"),e.props.onEntering&&e.props.onEntering(t,n)},e.onEntered=function(t,n){var r=e.resolveArguments(t,n),i=r[0],a=r[1]?"appear":"enter";e.removeClasses(i,a),e.addClass(i,a,"done"),e.props.onEntered&&e.props.onEntered(t,n)},e.onExit=function(t){var n=e.resolveArguments(t)[0];e.removeClasses(n,"appear"),e.removeClasses(n,"enter"),e.addClass(n,"exit","base"),e.props.onExit&&e.props.onExit(t)},e.onExiting=function(t){var n=e.resolveArguments(t)[0];e.addClass(n,"exit","active"),e.props.onExiting&&e.props.onExiting(t)},e.onExited=function(t){var n=e.resolveArguments(t)[0];e.removeClasses(n,"exit"),e.addClass(n,"exit","done"),e.props.onExited&&e.props.onExited(t)},e.resolveArguments=function(t,n){return e.props.nodeRef?[e.props.nodeRef.current,t]:[t,n]},e.getClassNames=function(t){var n=e.props.classNames,r="string"===typeof n,i=r?""+(r&&n?n+"-":"")+t:n[t];return{baseClassName:i,activeClassName:r?i+"-active":n[t+"Active"],doneClassName:r?i+"-done":n[t+"Done"]}},e}(0,k.Z)(e,t);var n=e.prototype;return n.addClass=function(t,e,n){var r=this.getClassNames(e)[n+"ClassName"],i=this.getClassNames("enter").doneClassName;"appear"===e&&"done"===n&&i&&(r+=" "+i),"active"===n&&t&&t.scrollTop,r&&(this.appliedClasses[e][n]=r,function(t,e){t&&e&&e.split(" ").forEach((function(e){return r=e,void((n=t).classList?n.classList.add(r):function(t,e){return t.classList?!!e&&t.classList.contains(e):-1!==(" "+(t.className.baseVal||t.className)+" ").indexOf(" "+e+" ")}(n,r)||("string"===typeof n.className?n.className=n.className+" "+r:n.setAttribute("class",(n.className&&n.className.baseVal||"")+" "+r)));var n,r}))}(t,r))},n.removeClasses=function(t,e){var n=this.appliedClasses[e],r=n.base,i=n.active,a=n.done;this.appliedClasses[e]={},r&&G(t,r),i&&G(t,i),a&&G(t,a)},n.render=function(){var t=this.props,e=(t.classNames,(0,j.Z)(t,["classNames"]));return i.createElement(L,(0,C.Z)({},e,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},e}(i.Component);U.defaultProps={classNames:""},U.propTypes={};var J=U,V=n(7898),Q=function(t){var e=t.show,n=t.timeout,r=void 0===n?V.UP:n,i=t.children;return(0,f.jsx)(J,{unmountOnExit:!0,in:e,timeout:r,classNames:"mask",children:(0,f.jsx)("div",{className:_,children:(0,f.jsx)(J,{in:e,timeout:r,classNames:"popup",children:i})})})},K=function(t){var e=t.show,n=t.title,r=t.text,i=t.callback,a=t.buttonText;return(0,f.jsx)(Q,{show:e,children:(0,f.jsx)("div",{className:S,children:(0,f.jsxs)("div",{className:b,children:[(0,f.jsxs)("div",{className:N,children:[(0,f.jsx)("h2",{children:n}),r&&(0,f.jsx)("p",{children:r})]}),(0,f.jsx)("button",{className:w,onClick:function(){return i()},children:a||"Ok"})]})})})},X=n(1523),H=function(t){var e=t.show,n=t.actions;return(0,f.jsx)(Q,{show:e,children:(0,f.jsx)("div",{className:S,children:(0,f.jsxs)("div",{className:b,children:[(0,f.jsx)("h2",{children:"Pause"}),(0,f.jsx)("button",{className:w,onClick:n.continue,children:"Continie"}),(0,f.jsx)("button",{className:w,disabled:void 0===n.save,onClick:n.save,children:"Save"}),(0,f.jsx)(X.rU,{to:"/menu/play/load",className:w,children:"Load"}),(0,f.jsx)(X.rU,{to:"/menu/settings",className:w,children:"Settings"}),(0,f.jsx)("button",{className:w,disabled:void 0===n.reset,onClick:n.reset,children:"Reset"}),(0,f.jsx)(X.rU,{to:"/menu/",className:w,children:"Main menu"})]})})})},q=n(3433),W=n(7762),Y=n(606);function $(t,e){return t.filter((function(t){return t.count===e}))}function z(t,e){return Math.max.apply(Math,(0,q.Z)(tt(t,e).map((function(t){return t.player!==e.player?t.count:0}))))}function tt(t,e){var n=(0,Y.r)(e.id),i=(0,r.Z)(n,2),a=i[0],o=i[1];return[(0,l.FJ)((function(){return t[a+1][o]}),null),(0,l.FJ)((function(){return t[a][o+1]}),null),(0,l.FJ)((function(){return t[a-1][o]}),null),(0,l.FJ)((function(){return t[a][o-1]}),null)].filter(Boolean)}function et(t){if(Array.isArray(t))return t[Math.floor(Math.random()*t.length)];throw new Error("The argument is not an array.")}function nt(t){return et(t)}function rt(t){return et(function(t){var e=t.reduce((function(t,e){return e.count>t?e.count:t}),0);return $(t,e)}(t))}function it(t){return $(t,3)}function at(t,e){for(var n=e,r=function(r){if((n=e.filter((function(e){return function(t,e){return tt(t,e).reduce((function(t,e){return null===e.player?t+1:t}),0)}(t.field,e)===r}))).length)return"break"},i=4;i>0;i--){if("break"===r(i))break}return n}function ot(t,e){return e.filter((function(e){return 3!==z(t.field,e)}))}function st(t,e){return e.filter((function(e){return 3===z(t.field,e)}))}function ut(t,e){return e.filter((function(e){return function(t,e){return tt(t,e).reduce((function(t,n){return n.player!==e.player&&null!==n.player?t+1:t}),0)}(t.field,e)>0}))}var lt={getRandomBot:function(t){return et(ct.filter((function(e){return e.difficulty===t}))).name},getBotById:function(t){return ct.find((function(e){return e.name===t}))},getBotMoveById:function(t,e){var n,r,i=null===(n=ct.find((function(e){return e.name===t})))||void 0===n?void 0:n.implementation,a=function(t,e){var n,r=[],i=(0,W.Z)(t);try{for(i.s();!(n=i.n()).done;){var a=n.value.filter((function(t){return t.player===e}));a.length>0&&(r=r.concat(a))}}catch(o){i.e(o)}finally{i.f()}return r}(e.field,e.gameState.mover);return i?r=i(e,a):(console.error("The requested bot implementation was not found. Random implementation will be chosen."),r=et(ct).implementation(e,a)),r||et(a)}},ct=[[{name:"a1",difficulty:"simple",description:"Random movement",implementation:function(t,e){return nt(e)}},{name:"a2",difficulty:"simple",description:"Three count priority mover",implementation:function(t,e){var n=it(e);if(n.length>0)return nt(n)}},{name:"a3",difficulty:"simple",description:"Expander & three point priority mover",implementation:function(t,e){var n=it(e);if(n.length>0)return nt(n);var r=at(t,e);return r.length?nt(r):nt(e)}},{name:"a4",difficulty:"simple",description:"Accumulator, big Bang",implementation:function(t,e){var n=function(t){for(var e=1;e<3;e++){var n=$(t,e);if(n.length>0)return n}return[]}(e);return n.length?nt(n):nt(e)}}],[{name:"b1",difficulty:"normal",description:"Priority for capturing enemy cells with three dots, if they are next to their own cells with three dots.",implementation:function(t,e){var n=it(e);if(n.length){var r=st(t,n);if(r.length)return nt(r)}}},{name:"b2",difficulty:"normal",description:"",implementation:function(t,e){var n=it(e);if(n.length){var r=st(t,n);return r.length?nt(r):nt(n)}}},{name:"b3",difficulty:"normal",description:"",implementation:function(t,e){var n=it(e);if(n.length){var r=st(t,n);return r.length?nt(r):nt(n)}var i=ot(t,e);if(i.length)return nt(i)}},{name:"b4",difficulty:"normal",description:"",implementation:function(t,e){var n=it(e);if(n.length){var r=st(t,n);if(r.length)return nt(r)}var i=at(t,e);if(i.length)return nt(i)}},{name:"b5",difficulty:"normal",description:"Agressive",implementation:function(t,e){var n=it(e);if(n.length){var r=st(t,n);if(r.length)return nt(r)}var i=ut(t,e);if(i.length)return rt(i)}},{name:"b6",difficulty:"normal",description:"dontPickBattles & agressive",implementation:function(t,e){var n=it(e);if(n.length){var r=st(t,n);if(r.length)return nt(r)}var i=ut(t,e);if(i.length){var a=ot(t,i);if(a.length)return rt(a)}}},{name:"b7",difficulty:"normal",description:"dontPickBattles & agressive",implementation:function(t,e){var n=it(e);if(n.length){var r=st(t,n);if(r.length)return nt(r)}var i=ut(t,e);if(i.length){var a=ot(t,i);if(a.length)return rt(a)}var o=at(t,e);if(o.length){var s=ot(t,o);if(s.length)return nt(s)}var u=ot(t,e);if(u.length)return rt(u)}},{name:"b7",difficulty:"normal",description:"dontPickBattles & agressive",implementation:function(t,e){var n=it(e);if(n.length){var r=st(t,n);if(r.length)return nt(r)}var i=ut(t,e);if(i.length){var a=ot(t,i);if(a.length)return rt(a)}var o=at(t,e);if(o.length){var s=ot(t,o);if(s.length)return nt(s)}var u=ot(t,e);if(u.length)return rt(u)}}]].flat();var ft={wrapper:"ChosePlayerButton_wrapper__QsK2n",up:"ChosePlayerButton_up__iq7E2 ChosePlayerButton_wrapper__QsK2n",down:"ChosePlayerButton_down__TievK ChosePlayerButton_wrapper__QsK2n",pointer:"ChosePlayerButton_pointer__N46hZ"},pt=function(t){var e=t.player,n=t.entity,r=t.changeEntity,i=t.position;return(0,f.jsx)("div",{className:ft[i],children:(0,f.jsx)("button",{className:n!==c.T.empty?(0,l.UB)(e):"",onClick:r,children:(0,l.pg)(n)})})},dt={content:"PlayersForm_content__x2Mu+",row:"PlayersForm_row__olA4+",button:"PlayersForm_button__Y45SO",switch:"PlayersForm_switch__EJD4U",leftSwitch:"PlayersForm_leftSwitch__xsLg7 PlayersForm_switch__EJD4U",rightSwitch:"PlayersForm_rightSwitch__FGOH2 PlayersForm_switch__EJD4U",startButton:"PlayersForm_startButton__aweGW",pulse:"PlayersForm_pulse__5I5QK"},mt=n(6948),ht=function(t){var e=t.onSubmit,n=t.templates,a=(0,i.useState)(0),o=(0,r.Z)(a,2),s=o[0],u=o[1],p=(0,i.useState)(x()),d=(0,r.Z)(p,2),m=d[0],h=d[1];(0,i.useEffect)((function(){h(x())}),[s]);var y=function(t){return t.filter((function(t){return t.entity.playerEntity!==c.T.empty}))};function g(t){var e=(s+t+n.length)%n.length;u(e)}function x(){return(0,l.FS)(s).map((function(t){return(0,mt.ED)(t)}))}function E(t){return function(){var e,n=(0,q.Z)(m);n[t].entity.playerEntity=(e=n[t].entity.playerEntity,"string"===typeof c.T[e+1]?e+1:c.T.empty),h(n)}}return(0,f.jsx)("div",{className:dt.wrapper,children:(0,f.jsxs)("div",{className:dt.content,children:[(0,f.jsxs)("div",{className:dt.row,children:[(0,f.jsx)(pt,{player:m[0].player,entity:m[0].entity.playerEntity,changeEntity:E(0),position:"up"},0),(0,f.jsx)(pt,{player:m[1].player,entity:m[1].entity.playerEntity,changeEntity:E(1),position:"up"},1)]}),(0,f.jsx)("button",{className:dt.leftSwitch,onClick:function(){return g(-1)},children:"<"}),(0,f.jsx)("button",{className:dt.rightSwitch,onClick:function(){return g(1)},children:">"}),(0,f.jsx)(v,{field:(0,mt.Op)((0,l.l3)(s))}),(0,f.jsxs)("div",{className:dt.row,children:[(0,f.jsx)(pt,{player:m[3].player,entity:m[3].entity.playerEntity,changeEntity:E(3),position:"down"},3),(0,f.jsx)(pt,{player:m[2].player,entity:m[2].entity.playerEntity,changeEntity:E(2),position:"down"},2)]}),(0,f.jsx)("button",{className:dt.startButton,onClick:function(){var t=y(m);t.length>1&&(t=function(t){return t.map((function(t){if(t.entity.playerEntity===c.T.android){var e=t;return e.entity.id=lt.getRandomBot("normal"),e}return t}))}(t),e({templateId:s,playersProfiles:t}))},children:y(m).length>1?"\u25b6":""})]})})},vt=n(1044),yt=n(6030),gt=n(3962),xt=n(8446);var Et="GamePlay_wrapper__TtJDG",_t="GamePlay_content__SUInP",St=function(t){t.type;var e=(0,a.i)((function(t){return t})),n=(0,i.useState)(!1),o=(0,r.Z)(n,2),s=o[0],u=o[1],p=(0,i.useState)(!1),d=(0,r.Z)(p,2),m=d[0],h=d[1],y=(0,i.useState)("User win"),g=(0,r.Z)(y,2),x=g[0],_=g[1],S=function(){var t=(0,a.i)((function(t){return t.settings})),e=(0,xt.B)().saveGame,n=(0,i.useState)(setTimeout((function(){return 0}),0)),o=(0,r.Z)(n,2),s=o[0],u=o[1],f=(0,i.useState)(setTimeout((function(){return 0}),0)),p=(0,r.Z)(f,2),d=p[0],m=p[1],h=(0,yt.I0)(),v=(0,a.i)((function(t){return t}));function y(t){t&&v.gameState.gameStarted&&!v.gameState.moveBlock&&v.gameState.mover===t.player?h(gt.sU(t)):console.error("Can't move")}return(0,i.useEffect)((function e(){if(v.gameState.gameStarted&&v.gameState.moveBlock){var n=(0,l.ju)(v.field);n?(h(gt.XQ(n)),m(setTimeout((function(){return e()}),t.cellCloningDelay))):h(gt.Vc(v.field))}return function(){return clearTimeout(d)}}),[v.gameState.gameStarted,v.gameState.moveBlock]),(0,i.useEffect)((function(){var e=v.gameState.players.find((function(t){return t.player===v.gameState.mover}));if((null===e||void 0===e?void 0:e.entity.playerEntity)===c.T.android&&!v.gameState.moveBlock&&v.gameState.gameStarted){var n=lt.getBotMoveById(e.entity.id,v);n?u(setTimeout((function(){return y(n)}),t.botMovingDelay)):console.error("Can't get bot moving")}return function(){return clearTimeout(s)}}),[v.gameState.moveNumber,v.gameState.gameStarted]),{playerMove:y,start:function(t){h(gt.t(t))},reset:function(){clearTimeout(s),clearTimeout(d),h(gt.BM())},save:function(){e(v)}}}();function b(){S.reset(),h(!1),u(!1)}(0,i.useEffect)((function(){e.gameState.endGame&&(_("".concat((0,l.gp)(c.J[e.gameState.players[0].player]),"\n                won in ").concat(e.gameState.moveNumber," moves")),h(!1),u(!0))}),[e.gameState.endGame]);var N={continue:function(){return h(!1)},reset:e.gameState.gameStarted?b:void 0,save:e.gameState.gameStarted?function(){S.save(),h(!1)}:void 0};return(0,f.jsxs)("div",{className:Et,children:[(0,f.jsx)(K,{show:s,title:x,buttonText:"Restart",callback:b}),(0,f.jsx)(H,{show:m,actions:N}),(0,f.jsx)(E,{showMenu:function(){return h(!m)}}),(0,f.jsx)("div",{className:_t,children:e.gameState.gameStarted?(0,f.jsx)(v,{field:e.field,move:S.playerMove}):(0,f.jsx)(ht,{onSubmit:function(t){S.start(t)},templates:vt.j})})]})}},3962:function(t,e,n){n.d(e,{wc:function(){return i},BM:function(){return a},t:function(){return o},XQ:function(){return s},Vc:function(){return u},sU:function(){return l},Sl:function(){return c},I2:function(){return f}});var r=n(6581),i=function(t){return{type:r.Z.LOAD_GAME,payload:t}},a=function(){return{type:r.Z.RESTART_GAME,payload:void 0}},o=function(t){return{type:r.Z.START_GAME,payload:t}},s=function(t){return{type:r.Z.CELL_CLONING,payload:t}},u=function(t){return{type:r.Z.NEW_MOVE,payload:t}},l=function(t){return{type:r.Z.PLAYER_MOVE,payload:t}},c=function(){return{type:r.X.RESET_TO_DEFAULT,payload:void 0}},f=function(t){return{type:r.X.SET_SETTING,payload:t}}},7477:function(t,e,n){var r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},r.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=n(2791);e.default=function(t,e,n){var a=i.useMemo((function(){return r({serializer:JSON.stringify,parser:JSON.parse,logger:console.log,syncData:!0},n)}),[n]),o=a.serializer,s=a.parser,u=a.logger,l=a.syncData,c=i.useState((function(){if("undefined"===typeof window)return e;try{var n=window.localStorage.getItem(t);return n?s(n):e}catch(r){return u(r),e}})),f=c[0],p=c[1];return i.useEffect((function(){if("undefined"!==typeof window){try{void 0!==f?window.localStorage.setItem(t,o(f)):window.localStorage.removeItem(t)}catch(e){u(e)}}}),[f]),i.useEffect((function(){if(l){var e=function(e){if(e.key===t&&e.storageArea===window.localStorage)try{p(e.newValue?s(e.newValue):void 0)}catch(e){u(e)}};if("undefined"!==typeof window)return window.addEventListener("storage",e),function(){return window.removeEventListener("storage",e)}}}),[t,l]),[f,p]}},9199:function(t,e,n){function r(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}n.d(e,{Z:function(){return r}})},3433:function(t,e,n){n.d(e,{Z:function(){return o}});var r=n(907);var i=n(9199),a=n(181);function o(t){return function(t){if(Array.isArray(t))return(0,r.Z)(t)}(t)||(0,i.Z)(t)||(0,a.Z)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}}]);
//# sourceMappingURL=377.8c9c27f5.chunk.js.map