<?php /* Start loop */
	$n = ($_GET['n'] > 0) ? $_GET['n'] : 1;
	$args = array(
		'post_type' => 'post',
		'orderby' => 'rand',
		'posts_per_page' => $n,
	);
?>
<?php include "api-common.php"; ?>
