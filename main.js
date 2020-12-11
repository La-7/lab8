let $swipeMenu = document.querySelector('.js-menu');
let $overlay = document.querySelector('.js-overlay');

let menuWidth = $swipeMenu.clientWidth;
let menuLastX = -menuWidth;
let menuDragZoneWidth = 300;

let action = false;

let mouseDownX = 0;
let moveDistance = -menuWidth;

window.addEventListener('mousedown', function(e) 
{ 
    if(e.clientX <= menuDragZoneWidth)
    {
        swipeMenuDragStart(e); 
    }
})

window.addEventListener('mouseup', swipeMenuDragFinish)

//handle swipe
window.addEventListener('mousemove', function(e)
{
    if(action)
    {
        swipeMenuDrag(e);
    }
})

$swipeMenu.addEventListener('mousedown', function(e) { swipeMenuDragStart(e); })

$overlay.addEventListener('mousedown', swipeMenuClose)

function swipeMenuDragStart(e)
{
    e.preventDefault();
    mouseDownX = e.clientX;
    action = true;
}

function swipeMenuDrag(e)
{
    moveDistance = Math.max(Math.min(e.clientX - mouseDownX + menuLastX, 0), -menuWidth);
    $swipeMenu.style.cssText = 'transform: translate(' + moveDistance + 'px, 0px)';
    if(moveDistance > -menuWidth)
    {
        let opacity = Math.min((moveDistance + menuWidth) / menuWidth, 1);
        $overlay.style.cssText = 'visibility: visible; opacity:' + opacity + '';
    }
    else
    {
        $overlay.style.cssText = 'visibility: hidden';
    }
}

function swipeMenuDragFinish()
{
    action = false;

    if(moveDistance + menuWidth > menuWidth/2)
    {
        swipeMenuOpen();
    }
    else
    {
        swipeMenuClose();
    }
}

function swipeMenuOpen()
{
    $swipeMenu.classList.add('active');
    $swipeMenu.style.cssText = 'transition: transform .15s linear';
    $overlay.classList.add('active');
    $overlay.style.cssText = 'transition: opacity .1s linear';
    moveDistance = 0;
    menuLastX = moveDistance;
}

function swipeMenuClose()
{
    $swipeMenu.classList.remove('active');
    $swipeMenu.style.cssText = 'transition: transform 0.15s linear';
    $overlay.classList.remove('active');
    $overlay.style.cssText = 'transition: opacity .15s linear, visibility .2s linear';
    moveDistance = -menuWidth;
    menuLastX = moveDistance;
}