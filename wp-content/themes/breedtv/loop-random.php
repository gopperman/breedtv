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
	$output['src'] = btv_source($url);
	$output['id'] = btv_clean_url($url);
	$output['title'] = get_the_title(); ?>
<?php endwhile; /* End loop */ ?>
<?= json_encode($output); ?>
