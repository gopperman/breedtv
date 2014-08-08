  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="<?php echo get_template_directory_uri(); ?>/js/vendor/jquery-1.7.2.min.js"><\/script>')</script>
<?php wp_footer(); ?>
  <script charset="utf-8">
    $( "body" ).keypress(function( event ) {
      if (event.charCode == 107) {
        $('#next').click();
      }

    });
  </script>
</body>
</html>
