$(document).ready(function() {
    
    // starts as empty jQuery object
    var theOpenProject = $();
    

    /* ------------------------------------------
                Add/Remove Sticky Nav
    -------------------------------------------- */
    
    
     /* when scrolling past the trigger location,
        add or remove the sticky nav depending on direction */
    $('.js--sticky-nav-trigger').waypoint(function(direction) {
        if(direction == "down") {        
            $('nav').addClass('sticky');
            $('nav').slideDown(400);
        } else {
            $('nav').removeClass('sticky');
//            $('nav').slideUp(400);
        }      
    }, {
        offset: '31px'  /* do this 31px before the section begins */
    });
    
    
    
    
    /* ------------------------------------------
            Open Mobile Navigation on Click
    -------------------------------------------- */
    
    // animate mobile nav menu to close
    $.fn.setNavToUp = function() {
        var icon = $('.js--nav-icon i');

        // slide content up over 0.2 seconds
        $('.js--nav-top-right').slideUp(200); 
        
        // add menu icon, remove any X icon
        icon.addClass('ion-navicon-round');
        icon.removeClass('ion-close-round'); 
    }

    
    // animate mobile nav menu to open
    $.fn.setNavToDown = function() {
        var icon = $('.js--nav-icon i');

        // slide content down over 0.2 seconds
        $('.js--nav-top-right').slideDown(200);
        
        // add menu icon, remove any X icon
        icon.removeClass('ion-navicon-round');
        icon.addClass('ion-close-round'); 
    }
    
    
    // when the mobile nav icon is clicked, open or close accordingly
    $('.js--nav-icon').click(function() {
        var icon = $('.js--nav-icon i');
        
        if (icon.hasClass('ion-navicon-round')) {
            $.fn.setNavToDown();
        } else {
            $.fn.setNavToUp();
        }
    });
    
    
 
    /* --------------------------------------------
        Close Mobile Nav when a Link is clicked
    ---------------------------------------------- */
    
    
    $('.js--nav-top-left a, .js--nav-top-right a').click(function() {
        
        // the nav icon is only displayed when mobile nav is active
        if ($('.mobile-nav-icon').css("display") !== "none"){
            $.fn.setNavToUp(); 
        }
    });
    
    
    
    /* --------------------------------------------------
        Adjust Link Visibility on Screen Width Adjust
    ---------------------------------------------------- */  
    
    
    /*  In CSS, we tell the list of nav links NOT to display once the screen is narrow enough to use the mobile nav.  However, the jQuery functions slideUp and slideDown, which are called when the user opens/closes the mobile nav, also change the nav links' display property under the hood.  Because of this, we can't depend on CSS media queries to keep things in order.
    
    Without this function, switching from the mobile nav to the standard nav after the user has closed the mobile nav will result in a standard nav with undisplayed links.
    
    So, this function checks whether the mobile nav is in effect when the screen is resized, and then adjusts the visibility of the links accordingly.
    
    If the mobile nav is open, this function will close it regardless; hence the icon changes.
    */
    $(window).resize(function(){

        var icon = $('.js--nav-icon i');

        // the nav icon is only displayed when mobile nav is active
        if ($('.mobile-nav-icon').css("display") !== "none"){
            
            $('.js--nav-top-right').css("display", "none");
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');           
        } else {
            
            $('.js--nav-top-right').css("display", "block");
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        }
    });

    
    
    /* ------------------------------------------
           Scroll to Section After Nav Click 
    -------------------------------------------- */
    
    
    
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') 
            && 
            location.hostname === this.hostname) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    // Checking if the target was focused
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
  
    
    
    
    
    
    /* ------------------------------------------
            Open Project Information on Click
    -------------------------------------------- */
    
    // animate project info to close
    $.fn.setProjectToUp = function(icon, project) {

        var info = $('.js--project-prose', $(project));    
        $(info).slideUp(400); 
        
        icon.addClass('ion-chevron-down');
        icon.removeClass('ion-chevron-up'); 
        
        theOpenProject = $();
    }

    
    // animate project info to open
    $.fn.setProjectToDown = function(icon, project) {

        // if another project is open, close it
        if(theOpenProject !== $()) {
            var oldIcon = $('i', theOpenProject);
            $.fn.setProjectToUp(oldIcon, theOpenProject);
        }
        
        var info = $('.js--project-prose', $(project));
        $(info).slideDown(400);

        icon.removeClass('ion-chevron-down');
        icon.addClass('ion-chevron-up'); 
        
        theOpenProject = project;
    }
    
    
    
    // when the project arrow is clicked, open or close project info accordingly
    $('.js--project-arrow').click(function() {

        var icon = $('i', $(this));
        var project = $(this).closest('.project-item');
        
        if (icon.hasClass('ion-chevron-down')) {
            $.fn.setProjectToDown(icon, project);
        } else {
            $.fn.setProjectToUp(icon, project);
        }
    });
    
});