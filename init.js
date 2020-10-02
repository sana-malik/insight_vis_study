$(document).ready(function() {
	// initialize carousels
    $('.carousel').slick({
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        variableWidth: true,
        centerMode: false,
        slidesToScroll: 1
    });

    // INITIALIZATION & EVENT HANDLER FOR VARIABLE SELECTION
    $("#variable-select").chosen({
        no_results_text: "Variable not found:",
        width: "800px"
    });

    $("#variable-select").on("change", function(evt, field_change) {
        // get selected fields
        var selectedFields = []
        $("#variable-select option:selected").each(function() {
            selectedFields.push($(this).val());
        })

        // if nothing is selected, show all 
        if (!selectedFields.length) {
            $('.chart-card').removeClass('hidden');
            $('.carousel').slick('slickUnfilter');
        } else { // else show charts that contain any of the selected fields
            // hide everything first
            $('.chart-card').addClass('hidden');
            $('.carousel').slick('slickUnfilter');

            // bring back selected fields
            $('.chart-card').filter(function(i, el) {
                var fieldsUsed = $(el).attr('fields-used').split("|");
                return fieldsUsed.filter(value => selectedFields.includes(value)).length > 0;
            }).removeClass('hidden');
            $('.carousel').slick('slickFilter', ':not(.hidden)');
        }
    });

    // EVENT HANDLERS FOR STARRING
    $('.carousel').on('click', '.slick-slide', function(e) {
        $(this).toggleClass("starred")
        var starred = $(".starred .chart-div");
        var starredIDs = $.map(starred, s => $(s).attr("id")).join(", ");
        $("#starred-charts").val(starredIDs);
    });

    $('#star-switch').on('change', function(e) {
        var s = e.target;
        if (s.checked) {
            // remove any filters first
            $("#variable-select").val([]); 
            $('select').trigger("chosen:updated");
            $('.chart-card').removeClass('hidden');
            $('.carousel').slick('slickUnfilter');

            // then only show stars
            $(':not(.starred)').addClass('hidden');
            $('.carousel').slick('slickFilter', '.starred');
        } else {
            // show all
            $('.chart-card').removeClass('hidden');
            $('.carousel').slick('slickUnfilter');
        }
    });

    $('input.copiable').on("click", function() {
      var $this = $(this);
      var originalText = $this.val();

      if (originalText != "") {
        $this.select();
        document.execCommand("copy");
        
        // animate confirmation
        $this.val("Copied!");
        setTimeout(function() {
          $this.fadeTo('fast',0.5, function() {
            // revert to original
            $this.val(originalText);
            $this.fadeTo(0,1);
          });
        },1000);
      }
    })
});
