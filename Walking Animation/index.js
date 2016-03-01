var xmlns = "http://www.w3.org/2000/svg",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  container = select('.container'),
  walkSVG = select('.walkSVG'),
  partsGroup = select('.partsGroup'),
    stage0 = select('.stage0'),
    stage0Path = stage0.getAttribute('d')


TweenMax.set(container, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  xPercent: -50,
  yPercent: -50
})
TweenMax.set('svg', {
  visibility:'visible'
})
TweenMax.set(['.signGroup'], {
   rotation:'-=3',
    transformOrigin:'50% 100%'
})
var headRot = 12;
TweenMax.set('.head', {
   rotation:headRot,
    transformOrigin:'0% 100%'
})

function getWalker(el, id, alpha){

  var partsClone = el.cloneNode(true);
  walkSVG.appendChild(partsClone);
  var tl = new TimelineMax({repeat:-1});
  TweenMax.set(partsClone.querySelector('.stage0'), {
    alpha:alpha

  })
  tl.to(partsClone.querySelector('.stage0'), 1, {
    morphSVG:{shape:'.stage1'},
    x:'+=6',
    ease:Linear.easeNone

  })
  .to(partsClone.querySelector('.bum'), 1, {
    attr:{
      cy:'+=10'
    },
    ease:Linear.easeNone

  },'-=1')
  .to(partsClone.querySelector('.signGroup'), 1, {
    y:'+=10',
     rotation:'+=6',
    transformOrigin:'50% 100%',
    ease:Linear.easeNone

  },'-=1')
 .to(partsClone.querySelector('.head'), 1, {
     rotation:'-=' + headRot,
    ease:Linear.easeNone

  },'-=1')

  .to(partsClone.querySelector('.stage0'), 1, {
    morphSVG:{shape:'.stage2'},
    x:'-=6',
    ease:Linear.easeNone

  })
  .to(partsClone.querySelector('.bum'), 1, {
    attr:{
      cy:'-=10'
    },
    ease:Linear.easeNone

  },'-=1')
  .to(partsClone.querySelector('.signGroup'), 1, {
    y:'-=10',
    rotation:'-=6',
    ease:Linear.easeNone
  },'-=1')
  .to(partsClone.querySelector('.head'), 1, {
    rotation:'+=' + headRot,
    ease:Linear.easeNone
  },'-=1')

  .to(partsClone.querySelector('.stage0'), 1, {
    morphSVG:{shape:'.stage3'},
    x:'+=6',
    ease:Back.easeOut.config(1.4)
  })
  .to(partsClone.querySelector('.bum'), 1, {
    attr:{
      cy:'+=10'
    },
    ease:Linear.easeNone

  },'-=1')

  .to(partsClone.querySelector('.signGroup'), 1, {
    y:'+=10',
    rotation:'+=6',
    transformOrigin:'50% 100%',
    ease:Linear.easeNone

  },'-=1')
  .to(partsClone.querySelector('.head'), 1, {
    rotation:'-=' + headRot,
    ease:Power1.easeOut

  },'-=1')

  .to(partsClone.querySelector('.stage0'), 1, {
    morphSVG:{shape:stage0Path},
    x:'-=6',
    ease:Linear.easeNone

  })
  .to(partsClone.querySelector('.bum'), 1, {
    attr:{
      cy:'-=10'
    },
    ease:Linear.easeNone

  },'-=1')
    .to(partsClone.querySelector('.signGroup'), 1, {
    y:'-=10',
    rotation:'-=6',
    ease:Linear.easeNone

  },'-=1')
      .to(partsClone.querySelector('.head'), 1, {
    rotation:'+=' + headRot,
    ease:Power1.easeIn

  },'-=1')

  if(id < 3){
    partsClone.querySelector('.bum').setAttribute('opacity', 0);    partsClone.querySelector('.signGroup').setAttribute('opacity', 0);
    partsClone.querySelector('.head').setAttribute('opacity', 0);
  }

  return tl;

}

function moveLine(){


}
var roadTl = new TimelineMax();
roadTl.to('.dotty', 2.8, {
    strokeDashoffset:160,
  ease:Linear.easeNone,
  repeat:-1

})

var mainTl = new TimelineMax({onUpdate:moveLine});
mainTl.add(getWalker(partsGroup, 0, 0.9), 0);
mainTl.add(getWalker(partsGroup, 1, 0.9), 0.7);
mainTl.add(getWalker(partsGroup, 2, 0.9), 1.9);
mainTl.add(getWalker(partsGroup, 3, 1), 2.8);
mainTl.add(roadTl, 0);
mainTl.seek(100);
mainTl.timeScale(3)

walkSVG.removeChild(select('.original'))
