<?php


//default
$title = "sitename";
$description = "description";
$keyword = "key1,key2";


if($pageid=="xxx"){

	$title = "xxx - sitename";
	$description = "xxx description";
	$keyword = "xxx,key1,key2";

}


?>
<title><?php echo $title; ?></title>
<meta name="description" content="<?php echo $description; ?>">
<meta name="keywords" content="<?php echo $keyword; ?>">
