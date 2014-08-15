<?php 
header("Access-Control-Allow-Origin: *"); 

$wp_query = new WP_Query($args);
while (have_posts()) : the_post();
  $url = get_post_meta(get_the_ID(), 'URL', true);
  $output = array();
  $output['src'] = btv_source($url);
  $output['id'] = btv_clean_url($url);
  $output['title'] = get_the_title();
  $output['slug'] = $post->post_name;
	$tags = get_the_tags();
	$output['tags'] = array();
	if ($tags) {		
		foreach ($tags as $tag) {
			$output['tags'][] = array(
				name => $tag->name,
				slug => $tag->slug
			);
		}
	}
  $vids[] = $output;
endwhile; /* End loop */ ?>
<?= json_encode($vids); ?>
