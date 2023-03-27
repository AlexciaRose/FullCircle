document.addEventListener("DOMContentLoaded", function(event) {
   
    const showNavbar = (toggle, nav, bodypd, headerpd) => {
        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
          toggle.addEventListener('click', () => {
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('fa-angle-left')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
          })
        }
      }
      
      const toggle = document.getElementById('toggleId')
      const nav = document.getElementById('navId')
      const bodypd = document.getElementById('bodyId')
      const headerpd = document.getElementById('headerId')
      
      showNavbar(toggle, nav, bodypd, headerpd)
      
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
     // Your code to run since DOM is loaded and ready
    });