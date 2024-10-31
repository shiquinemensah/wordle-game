<?php
// Enqueue styles and scripts
function my_theme_enqueue_scripts() {
    // Enqueue the main stylesheet
    wp_enqueue_style('my-theme-style', get_stylesheet_uri());

    // Enqueue an additional stylesheet (ensure correct path with forward slashes)
    wp_enqueue_style('my-custom-style', get_template_directory_uri() . '/Counter/css/custom-style.css');

    // Enqueue a JavaScript file (in the 'js' folder)
    wp_enqueue_script('main-script', get_template_directory_uri() . '/js/main.js', array('jquery'), null, true);
}

// Hook the function into WordPress
add_action('wp_enqueue_scripts', 'my_theme_enqueue_scripts');
?>
