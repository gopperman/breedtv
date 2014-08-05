<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>

	<link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon">
	<link rel="icon" type="image/png" href="/img/favicon.png" />
	<link rel="apple-touch-icon-precomposed" sizes="22x32" href="/img/favicon-32x32.png">

  <?php if (current_theme_supports('bootstrap-responsive')) { ?><meta name="viewport" content="width=device-width, initial-scale=1.0"><?php } ?>

  <script src="<?php echo get_template_directory_uri(); ?>/js/vendor/modernizr-2.5.3.min.js"></script>

  <link rel="stylesheet/less" type="text/css" href="/css/less/style.less" />
  <?php roots_head(); ?>
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<a id="open-sidebar">[info]</a>
	<h1>BreedTV <blink><a onclick="btv.next()" title="SKIP">&gt;&gt;</a></blink></h1>
	<header>
		<a id="close-sidebar">[x]</a>
		<div id="video-info">
			<p><img src="/img/favicon-84x84.png" alt="BreedTV" /></p>
			<h2 id="title"><a href="" class="permalink">Breed TV</a></h2>
			<p id="share"><a href="" class="permalink">link</a> &middot; 
			<a target="_blank" class="fbshare" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbreedtv.com.com">share</a> &middot; 
			<a target="_blank" class="tweet" href="https://twitter.com/intent/tweet?url=http%3a%2f%2fbreedtv.com&via=breedtv">tweet</a></p>
		</div>
		<div id="social">
			<p><img src="/img/favicon-32x32.png" alt="BreedTV" /></p>
			<iframe class="like" src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fbreedtv&amp;width&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:35px;" allowTransparency="true"></iframe>
			<iframe class="follow" allowtransparency="true" frameborder="0" scrolling="no"  src="//platform.twitter.com/widgets/follow_button.html?screen_name=breedtv&show_count=false&show_screen_name=false"></iframe>	
		</div>
		<div class="colophon">
			<p><a href="//gopperman.com">@gopperman</a> &middot; Danger</p>
			<p><a href="//thosebreeders.com">Breeders</a></p>
		</div>
	</header>
	<main>
	</main>
