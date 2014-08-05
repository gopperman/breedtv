<?php /* Start loop */
	$args = array(
		'post_type' => 'post',
		'name' => $_GET['slug'],
		'posts_per_page' => 1,
	);
?>
<?php include "api-common.php"; ?>
