/*  ---------------------------------------------------
    Template Name: Dreams
    Description: Dreams wedding template
    Author: Colorib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Portfolio filter
        --------------------*/
        $('.portfolio__filter li').on('click', function () {
            $('.portfolio__filter li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.portfolio__gallery').length > 0) {
            var containerEl = document.querySelector('.portfolio__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Masonary
    $('.work__gallery').masonry({
        itemSelector: '.work__item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
		Hero Slider
	--------------------*/
    $('.hero__slider').owlCarousel({
        loop: true,
        dots: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    var dot = $('.hero__slider .owl-dot');
    dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 10) {
            $(this).html('0').append(index);
        } else {
            $(this).html(index);
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".testimonial__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Latest Slider
    --------------------*/
    $(".latest__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Logo Slider
    --------------------*/
    $(".logo__carousel").owlCarousel({
        loop: true,
        margin: 100,
        items: 6,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 5
            },
            768: {
                items: 4
            },
            480: {
                items: 3
            },
            320: {
                items: 2
            }
        }
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Counter
    --------------------*/
    $('.counter_num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

})(jQuery);
/* ===== Filters & search ===== */
const deptSel = document.getElementById('dept');
const typeSel = document.getElementById('type');
const searchIn = document.getElementById('q');
const clearBtn = document.getElementById('clear');

function applyFilters(){
  const d = deptSel.value.trim().toLowerCase();
  const t = typeSel.value.trim().toLowerCase();
  const q = searchIn.value.trim().toLowerCase();

  const filtered = JOBS.filter(j=>{
    const okDept = !d || j.dept.toLowerCase() === d;
    const okType = !t || j.type.toLowerCase() === t;
    const text = [j.title, j.dept, j.type, j.location, j.desc, ...(j.tags||[])].join(" ").toLowerCase();
    const okQ = !q || text.includes(q);
    return okDept && okType && okQ;
  });

  renderJobs(filtered);
}
deptSel.addEventListener('change', applyFilters);
typeSel.addEventListener('change', applyFilters);
searchIn.addEventListener('input', applyFilters);
clearBtn.addEventListener('click', ()=>{
  deptSel.value=""; typeSel.value=""; searchIn.value=""; renderJobs(JOBS);
});

 const applyModal = document.getElementById('applyModal');
    applyModal.addEventListener('show.bs.modal', function (event) {
      const btn = event.relatedTarget;
      const jobTitle = btn?.getAttribute('data-job') || '—';
      document.getElementById('applyJobTitle').textContent = jobTitle;
      document.getElementById('applyPosition').value = jobTitle;
    });

    /* ====== Job Details Modal: */
   
    const jobModal = document.getElementById('jobModal');
    jobModal.addEventListener('show.bs.modal', function (event) {
      const btn = event.relatedTarget;
      const key = btn?.getAttribute('data-job') || '';
      const data = JOB_DB[key] || null;

      const titleEl = document.getElementById('jobTitle');
      const metaEl = document.getElementById('jobMeta');
      const introEl = document.getElementById('jobIntro');
      const respEl = document.getElementById('jobResp');
      const reqEl = document.getElementById('jobReq');

      titleEl.textContent = key || 'Job Details';
      if (data) {
        metaEl.textContent = `${data.dept} • ${data.type} • ${data.location} • ${data.salary}`;
        introEl.textContent = data.intro;
        respEl.innerHTML = data.resp.map(i => `<li>${i}</li>`).join('');
        reqEl.innerHTML = data.req.map(i => `<li>${i}</li>`).join('');
      } else {
        metaEl.textContent = '';
        introEl.textContent = 'Details will be updated soon.';
        respEl.innerHTML = '';
        reqEl.innerHTML = '';
      }

      // الزرار يفتح مودال التقديم ومعبّي المسمى
      const jobApplyBtn = document.getElementById('jobApplyBtn');
      jobApplyBtn.setAttribute('data-bs-toggle', 'modal');
      jobApplyBtn.setAttribute('data-bs-target', '#applyModal');
      jobApplyBtn.setAttribute('data-job', key);
    });

    /* إرسال فورم التقديم — استبدليه بإرسال فعلي لاحقًا */
    document.getElementById('applyForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const form = new FormData(this);
      // TODO: ابعتي الفورم للسيرفر أو لخدمة Forms
      alert('Thanks! Your application has been submitted.');
      const modal = bootstrap.Modal.getInstance(applyModal);
      modal.hide();
    });
    
document.querySelectorAll('.card[data-href]').forEach(card=>{
  card.addEventListener('click', ()=> {
    window.location.href = card.dataset.href;
  });
});