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
        if (!selectedFields.length) $('.chart-card').removeClass('hidden');
        else { // else show charts that contain any of the selected fields
            // hide everything first
            $('.chart-card').addClass('hidden');

            // bring back selected fields
            $('.chart-card').filter(function(i, el) {
                var fieldsUsed = $(el).attr('fields-used').split("|");
                return fieldsUsed.filter(value => selectedFields.includes(value)).length > 0;
            }).removeClass('hidden');
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
            // only show stars
            $(':not(.starred)').addClass('hidden');
        } else {
            // show all
            $('.chart-card').removeClass('hidden');
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
