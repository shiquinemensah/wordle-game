<?php
// counter.php in template-parts directory

// Optional: Initialize or update the counter value (stored as a custom field, option, or transient).
$counter_value = get_option('my_custom_counter', 0); // Retrieves the current counter value

// Increase the counter value by 1 each time the template is loaded
$counter_value++;
update_option('my_custom_counter', $counter_value); // Updates the counter value

?>

<div class="counter-display">
    <p>Counter Value: <?php echo esc_html($counter_value); ?></p>
</div>


<?php get_template_part('template-parts/counter'); ?>
