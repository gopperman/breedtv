<?php /* Start loop */
	$args = array(
		'post_type' => 'post',
		'orderby' => 'rand',
		'posts_per_page' => 1
	);
	$wp_query = new WP_Query($args);
?>
<?php while (have_posts()) : the_post(); ?>
<?php	$url = get_post_meta(get_the_ID(), 'URL', true); 
	$output = array();
	if (strpos($url, "youtube")) {
		$output['src'] = "youtube";
		$strip = array("https", "http", "://www.youtube.com/watch?v=");
		$url = str_replace($strip, "", $url); ?>
	<?php } else { 
		$output['src'] = "vimeo";
		$strip = array("https", "http", "://vimeo.com/");
		$url = str_replace($strip, "", $url); ?>
	<?php }
	$output['id'] = $url;
	$output['title'] = get_the_title(); ?>
<?php endwhile; /* End loop */ ?>
<?= json_encode($output); ?>
