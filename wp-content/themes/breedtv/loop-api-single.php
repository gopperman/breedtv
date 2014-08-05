<?php /* Start loop */
	$args = array(
		'post_type' => 'post',
		'order_by' => 'rand',
		'name' => $_GET['slug']
	);
?>
<?php include "api-common.php"; ?>
