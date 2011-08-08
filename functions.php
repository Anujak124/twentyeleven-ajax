<?php

function ajax_twentyeleven_init() {
        if (!is_admin()) {
    		wp_enqueue_script('jquery');
    		wp_register_script('ajax_twentyeleven', get_bloginfo('stylesheet_directory') . '/js/2011.js', array('jquery'), '1.0');
    		wp_enqueue_script('ajax_twentyeleven');
    	}
}

add_action('init','ajax_twentyeleven_init');

function ajax_twentyeleven_content_nav( $nav_id ) {
	global $wp_query;

	if ( $wp_query->max_num_pages > 1 ) : ?>
		<nav id="<?php echo $nav_id; ?>">
			<h3 class="assistive-text"><?php _e( 'Post navigation', 'twentyeleven' ); ?></h3>
			<div id="postPagination">
			<div class="nav-previous"><?php next_posts_link( __( '<span class="meta-nav">&larr;</span> Older posts', 'twentyeleven' ) ); ?></div>
			<div class="nav-next"><?php previous_posts_link( __( 'Newer posts <span class="meta-nav">&rarr;</span>', 'twentyeleven' ) ); ?></div>
			</div>
		</nav>
	<?php endif;
}

?>
