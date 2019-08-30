/*!
 * andrej-goricar
 * Website design for andrejgoricar.com
 *
 * Url: https://github.com/DefaultSimon
 * Author: Simon Goričar
 * Copyright 2019-2019. Copyrighted licensed.
 */
(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    const owlCarouselOpts = {
      nav: true,
      navText: [
        "🡄",
        "🡆"
      ],
      navElement: "div",
      mouseDrag: false,
      pullDrag: false,
    };

    // Check which page is loaded
    const body = document.querySelector("body");
    const bodyClasses = Array.from(body.classList);

    if (bodyClasses.includes("events")) {
      const dogodki = $("body.events .owl-carousel");
      dogodki.owlCarousel(Object.assign({}, owlCarouselOpts, {
        margin: 5,
        dotsEach: 5,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          1500: {
            items: 3
          }
        }
      }));

    } else if (bodyClasses.includes("media")) {
      const media = $("body.media .owl-carousel");
      media.owlCarousel(Object.assign({}, owlCarouselOpts, {
        items: 1,
        dotsEach: 2,
        video: true,
        lazyLoad: true,
        center: true,
        stageClass: "owl-stage video-enabled",
        // Ratio -> 4:3
        responsive: {
          415: {
            videoHeight: 263,
            videoWidth: 350,
          },
          480: {
            videoHeight: 413,
            videoWidth: 550,
          },
          768: {
            videoHeight: 480,
            videoWidth: 640,
          }
        }
      }));

    } else if (bodyClasses.includes("images")) {
      // Find the root Photoswipe element and the actual gallery with images
      const pswpElement = $(".pswp")[0];
      const galleryImages = $("#gallery").children();

      const loadItems = function() {
        let itemArray = [];
        // Generate item list on runtime
        for (let i = 0; i < galleryImages.length; i++) {
          let el = $(galleryImages[i]);

          let image = el.attr("data-image"),
            size = el.attr("data-size").split("x");

          let thisItem = {
            src: image,
            w: parseInt(size[0]),
            h: parseInt(size[1])
          };

          itemArray.push(thisItem);
        }

        console.log(itemArray);

        return itemArray;
      };
      const items = loadItems();

      const openPhotoswipe = function(startIndex) {
        const opts = {
          tapToClose: true,
          index: parseInt(startIndex),
          indexIndicatorSep: " / ",
          preloaderEl: true,

          loadingIndicatorDelay: 500,
          shareButtons: [
            {id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
          ]
        };

        const pswpGallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, opts);
        pswpGallery.init();
      };

      const onGalleryImageClick = function(e) {
        e.preventDefault();

        let target = $(this);
        const targetId = target.attr("data-id");

        // Find children
        const elements = target.parent().children();
        let indexOfClicked;

        // Find which element was clicked based on its id
        for (let i = 0; i <= elements.length; i++) {
          if ($(elements[i]).attr("data-id") === targetId) {
            indexOfClicked = i;
          }
        }

        console.debug("Clicked element with index " + indexOfClicked);
        if (typeof indexOfClicked !== "undefined") {
          openPhotoswipe(indexOfClicked);
        }
      };

      // Set onClick callbacks
      for (let i = 0; i < galleryImages.length; i++) {
        galleryImages[i].onclick = onGalleryImageClick;
      }

    }

    // Bind hamburger click for mobile
    const ham = $(".hamburger");
    ham.click(function() {
      body.classList.toggle("nav-active");
    });
  });

})(jQuery, window, document);
