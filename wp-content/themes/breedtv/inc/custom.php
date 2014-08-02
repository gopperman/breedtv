<?php

// Takes in a url and returns just the video id
function btv_clean_url($url) {
  $strip = array("https", "http", "://vimeo.com/", "://www.youtube.com/watch?v=");
  return str_replace($strip, "", $url);
}
function btv_source($url) {
  if (strpos($url, "youtube")) {
    return "youtube";
  } else {
    return "vimeo";
  }
}
