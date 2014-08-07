<?php 
	$n = ($_GET['n'] > 0) ? $_GET['n'] : 1;
	$args = array(
		'post_type' => 'post',
		'orderby' => 'rand',
		'posts_per_page' => $n,
	);
	if ($_GET['tag']) {$args['tag'] = $_GET['tag'];}
	if ($_GET['cat']) {$args['category_name'] = $_GET['tag'];}
?>
<?php include "api-common.php"; ?>
