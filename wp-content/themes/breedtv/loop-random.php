<?php /* Start loop */
	$n = ($_GET['n'] > 0) ? $_GET['n'] : 1;
	$args = array(
		'post_type' => 'post',
		'orderby' => 'rand',
		'posts_per_page' => $n,
	);
	$wp_query = new WP_Query($args);
?>
<?php while (have_posts()) : the_post(); ?>
<?php	$url = get_post_meta(get_the_ID(), 'URL', true); 
	$output = array();
	$output['src'] = btv_source($url);
	$output['id'] = btv_clean_url($url);
	$output['title'] = get_the_title(); 
	$output['slug'] = $post->post_name;
	$vids[] = $output;	
	?>
<?php endwhile; /* End loop */ ?>
<?= json_encode($vids); ?>
