function loco()
{
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}

loco();

var tl = gsap.timeline();

tl.from("#nav h1, a",{
    opacity: 0,
    y:"-100px",
    stagger:0.05,
    delay:0.3,
    // duration:0.6
})

tl.from("#page1 #upper h1",{
    opacity:0,
    y:"100%",
    duration:0.6,
    stagger:0.1,
})

tl.from("#page1 #lower, #page2, #page3, #page4",{
    opacity:0,
    y:"100%",
    duration:0.6,
    stagger:0.1,
})



gsap.to("#nav",{
    y:"-40%",
    opacity:0,
    scrollTrigger:{
        trigger: "#nav",
        scroller:"#main",
        start: "top 0%",
        // end: "bottom top",
        scrub:3,

    }
})


gsap.to("#upper h1",{
    y:"-1px",
    // stagger:0.2,
    // opacity:0,
    scrollTrigger:{
        trigger: "#nav",
        scroller:"#main",
        start: "top 0%",
        // end: "bottom top",
        scrub:3,

    }
})



gsap.from("#lower img",{
    y:"10%",
    // opacity:0,
    stagger:0.1,
    // opacity:0.4,
    scrollTrigger:
    {
        trigger:"#lower img",
        scroller:"#main",
        start:"top 80%",
        end: "top 10%",
        // markers:true,
        scrub:5
    }
})
gsap.from("#page2 h1,#page2 p,#page2 img",{
    y:"10%",
    // opacity:0,
    stagger:0.1,
    // opacity:0.4,
    scrollTrigger:
    {
        trigger:"#lower img",
        scroller:"#main",
        start:"top 80%",
        end: "top 10%",
        // markers:true,
        scrub:5
    }
})

gsap.from("#page3 h1,#page3 p,#page3 #right img",{
    y:"-60%",
    opacity:0,
    stagger:0.1,
    // opacity:0.4,
    scrollTrigger:
    {
        trigger:"#page2  ",
        scroller:"#main",
        start:"top 80%",
        end: "top 10%",
        // markers:true,
        scrub:5
    }
})



gsap.from("#below h1",{
    y:"1000px",
    scrollTrigger:{
        trigger:"#below h1",
        scroller:"#main",
        start: "top -20%",
        scrub:5
    }
})

Shery.mouseFollower({

});

Shery.makeMagnet("#nav a, #nav h1");


// Shery.imageMasker("#right");

Shery.imageMasker(".images, #right, #lower",{
    mouseFollower:true,
    color: "black",
});
